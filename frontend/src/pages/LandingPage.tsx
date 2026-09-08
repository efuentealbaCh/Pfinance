import { useEffect, useRef } from "react";
import type { ComponentType } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button, Group, Text, Container, Center, Loader } from "@mantine/core";
import {
  IconChartBar,
  IconCreditCard,
  IconTarget,
  IconClipboardList,
  IconUsers,
  IconPencil,
  IconBuildingBank,
  IconRocket,
  IconArrowDown,
  IconLock,
  IconDeviceMobile,
  IconBolt,
  IconShieldCheck,
  IconRepeat,
  IconFileImport,
  IconCurrencyDollar,
  IconBell,
  IconCalendarStats,
  IconCheck,
  IconMail,
  IconKey,
  IconWallet,
  IconRefresh,
} from "@tabler/icons-react";

type TablerIconComponent = ComponentType<{ size?: number | string; color?: string; stroke?: number | string }>;

function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }); },
      { threshold: 0.12 }
    );
    el.querySelectorAll(".landing-animate").forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
  return ref;
}

const GRADIENT_BG = "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0f766e 100%)";
const GLASS = {
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255, 255, 255, 0.09)",
  borderRadius: "16px",
} as const;

const FEATURES: { icon: TablerIconComponent; title: string; desc: string; badge?: string }[] = [
  { icon: IconChartBar, title: "Dashboard analítico", desc: "Balance total, gráficos de evolución, ingresos vs. egresos por mes y dona de categorías — filtrable por cuenta y período." },
  { icon: IconCurrencyDollar, badge: "Nuevo", title: "Multimoneda CLP/USD", desc: "Cuentas en pesos o dólares. Los totales se convierten con cotización histórica del Banco Central — lo de agosto no cambia cuando el dólar sube hoy." },
  { icon: IconFileImport, badge: "Nuevo", title: "Importar cartola bancaria", desc: "Sube tu CSV o XLSX de Santander (y cualquier banco). Detección automática de columnas, previsualización y deduplicación — el mismo archivo puede importarse dos veces sin duplicados." },
  { icon: IconRepeat, badge: "Nuevo", title: "Transacciones recurrentes", desc: "Suscripciones indefinidas y créditos con \"cuota 8 de 36\". Las vencidas aparecen solas cuando abrís la app — sin cron obligatorio." },
  { icon: IconTarget, badge: "Nuevo", title: "Metas de ahorro con proyección", desc: "Define objetivos, registra depósitos y obtén una fecha de cumplimiento basada en tu ritmo de ahorro real de los últimos 6 meses." },
  { icon: IconClipboardList, badge: "Nuevo", title: "Presupuestos con alertas", desc: "Límites por categoría y período. Recibís push o email al 80% y al 100% — anti-repetición garantizado." },
  { icon: IconCalendarStats, badge: "Nuevo", title: "Resumen mensual", desc: "El día 1 de cada mes llega un resumen del mes cerrado: ingresos, gastos, balance y comparación intermensual. Disponible también bajo demanda." },
  { icon: IconUsers, badge: "Nuevo", title: "Gastos compartidos (flujo real)", desc: "El deudor declara el pago; el acreedor confirma o rechaza con motivo. Sin confirmación, sin saldo." },
  { icon: IconCreditCard, title: "Cuentas y tarjetas", desc: "Cuentas corrientes, vistas, de ahorro y tarjetas. Copiá datos de transferencia al instante con un clic." },
];

const SECURITY_ITEMS: { icon: TablerIconComponent; title: string; desc: string }[] = [
  { icon: IconMail, title: "Verificación de email", desc: "Link de verificación al registrarte. La cuenta queda activa; el banner desaparece al verificar." },
  { icon: IconKey, title: "Recuperación de contraseña", desc: "Link seguro con expiración de 30 minutos. Un token, un uso." },
  { icon: IconShieldCheck, title: "2FA con TOTP", desc: "Compatible con Google Authenticator y Authy. Activación desde el perfil." },
  { icon: IconBell, title: "Alertas de seguridad", desc: "Aviso por email al cambiar la contraseña, activar 2FA o detectar un login desde un nuevo dispositivo." },
  { icon: IconLock, title: "Rate limiting por ruta", desc: "5 intentos de login/min, 3 recuperaciones de contraseña/hora. Cada ruta con su propio límite." },
  { icon: IconRefresh, title: "Historial de seguridad", desc: "Log de los últimos 50 eventos: logins, cambios de contraseña, 2FA — visible desde tu perfil." },
];

const CHANGELOG: { label: string; color: string; items: string[] }[] = [
  { label: "Seguridad", color: "#f472b6", items: ["Verificación de email y recuperación de contraseña", "2FA (TOTP) activable desde el perfil", "Historial de seguridad y alertas por email", "Rate limiting por ruta con anti-spam"] },
  { label: "Importación", color: "#fb923c", items: ["Cartola CSV/XLSX (Santander y más)", "Detección automática de columnas por banco", "Deduplicación por huella digital", "Verificado con cartola real: 128 mov., cuadratura exacta"] },
  { label: "Multimoneda", color: "#60a5fa", items: ["Cuentas en CLP y USD", "Cotización histórica del Banco Central", "Totales del dashboard convertidos por fecha", "Exportación con columna Moneda"] },
  { label: "Funcional", color: "#34d399", items: ["Recurrentes: suscripciones y créditos", "Proyección de metas con fecha real", "Resumen mensual automático por email", "Alertas de presupuesto por push o email", "Gastos compartidos con confirmación de pago"] },
];

const STEPS: { num: string; icon: TablerIconComponent; title: string; desc: string }[] = [
  { num: "01", icon: IconPencil, title: "Crea tu cuenta", desc: "Regístrate en segundos con tu correo y RUT. Tus datos se almacenan encriptados." },
  { num: "02", icon: IconBuildingBank, title: "Conecta tus cuentas", desc: "Agrega cuentas en CLP o USD e importa tu cartola bancaria para arrancar con el historial completo." },
  { num: "03", icon: IconRocket, title: "Toma el control", desc: "Registra transacciones, fija presupuestos, sigue metas, configura recurrentes y comparte gastos." },
];

export default function LandingPage() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const containerRef = useScrollAnimation();

  useEffect(() => {
    if (!loading && isAuthenticated) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, loading, navigate]);

  if (loading) return <Center h="100vh" style={{ background: "#0f172a" }}><Loader size="lg" color="teal" /></Center>;

  return (
    <div ref={containerRef} style={{ background: "#0f172a", color: "#e2e8f0", overflowX: "hidden" }}>

      {/* ── NAVBAR ───────────────────────────────────────── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "1rem 2rem", background: "rgba(15,23,42,0.88)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Text component="a" href="#hero" fw={900} size="xl" style={{ color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
          <IconWallet size={22} stroke={2} /> Pfinance
        </Text>
        <Group gap="xs">
          <Text component="a" href="#novedades" size="sm" visibleFrom="sm" style={{ color: "#94a3b8", textDecoration: "none", cursor: "pointer" }}
            onMouseEnter={(e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.color = "#2dd4bf"; }}
            onMouseLeave={(e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.color = "#94a3b8"; }}>
            Novedades
          </Text>
          <Button component={Link} to="/login" variant="subtle" color="gray" radius="xl" style={{ color: "#cbd5e1" }}>Iniciar sesión</Button>
          <Button component={Link} to="/register" variant="gradient" gradient={{ from: "#0f766e", to: "#2dd4bf", deg: 135 }} radius="xl" style={{ fontWeight: 600 }}>Registrarse gratis</Button>
        </Group>
      </nav>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: GRADIENT_BG, backgroundSize: "200% 200%", animation: "gradientShift 12s ease infinite", position: "relative", paddingTop: "80px" }}>
        <div style={{ position: "absolute", top: "15%", left: "10%", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle, rgba(45,212,191,0.15) 0%, transparent 70%)", filter: "blur(60px)", animation: "float 6s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "8%", width: "260px", height: "260px", borderRadius: "50%", background: "radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)", filter: "blur(50px)", animation: "float 8s ease-in-out infinite reverse", pointerEvents: "none" }} />

        <Container size="lg" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ animation: "fadeInUp 0.8s ease-out" }}>
            <Text component="span" style={{ display: "inline-flex", justifyContent: "center", marginBottom: "0.5rem", animation: "float 4s ease-in-out infinite", color: "#2dd4bf" }}>
              <IconWallet size={72} stroke={1.5} />
            </Text>

            <div style={{ marginBottom: "1rem" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.28)", borderRadius: "999px", padding: "0.3rem 1rem", fontSize: "0.78rem", fontWeight: 600, color: "#2dd4bf", letterSpacing: "0.03em" }}>
                <IconBolt size={13} /> Importación de cartola · Multimoneda · Recurrentes · 2FA
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: "1.2rem", letterSpacing: "-1px" }}>
              Toma el control total<br />
              <span style={{ background: "linear-gradient(135deg, #2dd4bf, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                de tus finanzas personales
              </span>
            </h1>

            <Text size="lg" style={{ color: "#94a3b8", maxWidth: "620px", margin: "0 auto 2.5rem", lineHeight: 1.7, fontSize: "clamp(1rem, 2vw, 1.15rem)" }}>
              Cuentas en CLP y USD, importación de cartola, recurrentes automáticos, metas con proyección y seguridad de dos factores — todo en una sola app.
            </Text>

            <Group justify="center" gap="md" style={{ flexWrap: "wrap" }}>
              <Button component={Link} to="/register" size="lg" radius="xl" variant="gradient" gradient={{ from: "#0f766e", to: "#2dd4bf", deg: 135 }}
                style={{ fontWeight: 700, fontSize: "1.05rem", padding: "0 2.5rem", boxShadow: "0 8px 32px rgba(45,212,191,0.3)", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(45,212,191,0.45)"; }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(45,212,191,0.3)"; }}>
                Comenzar gratis
              </Button>
              <Button component={Link} to="/login" size="lg" radius="xl" variant="outline" color="gray"
                style={{ fontWeight: 600, fontSize: "1.05rem", padding: "0 2.5rem", borderColor: "rgba(255,255,255,0.2)", color: "#e2e8f0", transition: "all 0.2s" }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = "rgba(45,212,191,0.5)"; e.currentTarget.style.color = "#2dd4bf"; }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#e2e8f0"; }}>
                Ya tengo cuenta
              </Button>
            </Group>
          </div>
        </Container>

        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", animation: "pulse 2s ease-in-out infinite" }}>
          <Text size="sm" c="dimmed" ta="center" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}><IconArrowDown size={14} /> Descubre más</Text>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────── */}
      <section id="features" style={{ padding: "clamp(4rem, 8vw, 7rem) 0", background: "#0f172a", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(45,212,191,0.3), transparent)" }} />
        <Container size="lg">
          <div className="landing-animate" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <Text size="sm" fw={700} style={{ color: "#2dd4bf", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "0.75rem" }}>Funcionalidades</Text>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#fff", marginBottom: "1rem" }}>Todo lo que necesitas en un solo lugar</h2>
            <Text size="md" style={{ color: "#94a3b8", maxWidth: "560px", margin: "0 auto" }}>
              Desde el registro diario hasta la importación de tu cartola completa — con multimoneda y alertas incluidas.
            </Text>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {FEATURES.map((f, i) => (
              <div key={i} className={`landing-animate landing-animate-delay-${Math.min(i + 1, 6)}`}
                style={{ ...GLASS, padding: "2rem", cursor: "default", transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s", position: "relative" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(45,212,191,0.1)"; e.currentTarget.style.borderColor = "rgba(45,212,191,0.25)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; }}>
                {f.badge && (
                  <span style={{ position: "absolute", top: "1rem", right: "1rem", background: "linear-gradient(135deg, #0f766e, #2dd4bf)", borderRadius: "999px", padding: "0.15rem 0.6rem", fontSize: "0.68rem", fontWeight: 700, color: "#fff" }}>{f.badge}</span>
                )}
                <div style={{ marginBottom: "1rem", display: "inline-flex", padding: "0.6rem", borderRadius: "10px", background: "rgba(45,212,191,0.1)", color: "#2dd4bf" }}>
                  <f.icon size={32} stroke={1.5} />
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "0.65rem" }}>{f.title}</h3>
                <Text size="sm" style={{ color: "#94a3b8", lineHeight: 1.65 }}>{f.desc}</Text>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── SECURITY ─────────────────────────────────────── */}
      <section style={{ padding: "clamp(4rem, 8vw, 7rem) 0", background: "linear-gradient(180deg, #0f172a 0%, #0d1a2e 100%)", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(244,114,182,0.3), transparent)" }} />
        <div style={{ position: "absolute", top: "30%", right: "5%", width: "280px", height: "280px", borderRadius: "50%", background: "radial-gradient(circle, rgba(244,114,182,0.06) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

        <Container size="lg">
          <div className="landing-animate" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <Text size="sm" fw={700} style={{ color: "#f472b6", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "0.75rem" }}>Seguridad</Text>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#fff", marginBottom: "1rem" }}>Tu plata, bien protegida</h2>
            <Text size="md" style={{ color: "#94a3b8", maxWidth: "520px", margin: "0 auto" }}>
              Cada feature de seguridad está verificada de punta a punta con escenarios reales, no solo checkeada en papel.
            </Text>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {SECURITY_ITEMS.map((f, i) => (
              <div key={i} className={`landing-animate landing-animate-delay-${Math.min(i + 1, 6)}`}
                style={{ ...GLASS, padding: "1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start", transition: "transform 0.25s, border-color 0.25s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(244,114,182,0.25)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; }}>
                <div style={{ flexShrink: 0, padding: "0.5rem", borderRadius: "8px", background: "rgba(244,114,182,0.1)", color: "#f472b6" }}>
                  <f.icon size={22} stroke={1.5} />
                </div>
                <div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff", marginBottom: "0.35rem" }}>{f.title}</h3>
                  <Text size="xs" style={{ color: "#94a3b8", lineHeight: 1.6 }}>{f.desc}</Text>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── NOVEDADES ────────────────────────────────────── */}
      <section id="novedades" style={{ padding: "clamp(4rem, 8vw, 7rem) 0", background: "#0f172a", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.3), transparent)" }} />

        <Container size="lg">
          <div className="landing-animate" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <Text size="sm" fw={700} style={{ color: "#60a5fa", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "0.75rem" }}>Novedades</Text>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#fff", marginBottom: "1rem" }}>Lo que viene incluido</h2>
            <Text size="md" style={{ color: "#94a3b8", maxWidth: "500px", margin: "0 auto" }}>
              Pfinance no es un MVP vacío. Cada feature fue construida, probada de punta a punta y documentada.
            </Text>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "1.5rem" }}>
            {CHANGELOG.map((section, si) => (
              <div key={si} className={`landing-animate landing-animate-delay-${si + 1}`}
                style={{ ...GLASS, padding: "1.75rem", transition: "transform 0.25s, border-color 0.25s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = `${section.color}44`; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; }}>
                <div style={{ marginBottom: "1rem" }}>
                  <span style={{ display: "inline-block", background: `${section.color}20`, border: `1px solid ${section.color}40`, borderRadius: "999px", padding: "0.2rem 0.75rem", fontSize: "0.75rem", fontWeight: 700, color: section.color, letterSpacing: "0.04em" }}>
                    {section.label}
                  </span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {section.items.map((item, ii) => (
                    <li key={ii} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", marginBottom: "0.65rem" }}>
                      <span style={{ color: section.color, flexShrink: 0, marginTop: "2px" }}><IconCheck size={14} stroke={2.5} /></span>
                      <Text size="sm" style={{ color: "#94a3b8", lineHeight: 1.55 }}>{item}</Text>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section id="how-it-works" style={{ padding: "clamp(4rem, 8vw, 7rem) 0", background: "linear-gradient(180deg, #0f172a 0%, #1a2332 100%)", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(45,212,191,0.3), transparent)" }} />
        <Container size="lg">
          <div className="landing-animate" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <Text size="sm" fw={700} style={{ color: "#2dd4bf", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "0.75rem" }}>¿Cómo funciona?</Text>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#fff", marginBottom: "1rem" }}>Empieza en 3 simples pasos</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem", maxWidth: "960px", margin: "0 auto" }}>
            {STEPS.map((step, i) => (
              <div key={i} className={`landing-animate landing-animate-delay-${i + 1}`} style={{ textAlign: "center", position: "relative", padding: "2rem 1.5rem" }}>
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "52px", height: "52px", borderRadius: "50%", background: "linear-gradient(135deg, #0f766e, #2dd4bf)", marginBottom: "1.2rem", fontSize: "1.1rem", fontWeight: 800, color: "#fff", boxShadow: "0 8px 24px rgba(45,212,191,0.25)" }}>{step.num}</div>
                <div style={{ display: "inline-flex", justifyContent: "center", marginBottom: "0.75rem", color: "#2dd4bf" }}><step.icon size={32} stroke={1.5} /></div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fff", marginBottom: "0.65rem" }}>{step.title}</h3>
                <Text size="sm" style={{ color: "#94a3b8", lineHeight: 1.65 }}>{step.desc}</Text>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── TRUST STATS ──────────────────────────────────── */}
      <section style={{ padding: "clamp(3rem, 6vw, 5rem) 0", background: "#0f172a", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(45,212,191,0.3), transparent)" }} />
        <Container size="lg">
          <div className="landing-animate" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "2rem", textAlign: "center" }}>
            {[
              { icon: IconShieldCheck, label: "2FA + Rate Limiting", sub: "Seguridad real, verificada" },
              { icon: IconBuildingBank, label: "Bancos de Chile", sub: "Importación de cartola real" },
              { icon: IconDeviceMobile, label: "App Progresiva (PWA)", sub: "Instálala en tu celular" },
              { icon: IconBolt, label: "100% Gratuito", sub: "Sin cargos ocultos" },
            ].map((stat, i) => (
              <div key={i} className={`landing-animate landing-animate-delay-${i + 1}`} style={{ padding: "1.5rem" }}>
                <div style={{ display: "inline-flex", justifyContent: "center", marginBottom: "0.5rem", color: "#2dd4bf" }}><stat.icon size={40} stroke={1.5} /></div>
                <Text fw={700} size="md" style={{ color: "#fff", marginBottom: "0.3rem" }}>{stat.label}</Text>
                <Text size="xs" style={{ color: "#64748b" }}>{stat.sub}</Text>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────── */}
      <section style={{ padding: "clamp(4rem, 8vw, 7rem) 0", background: "linear-gradient(135deg, #0f766e 0%, #1e293b 50%, #0f172a 100%)", backgroundSize: "200% 200%", animation: "gradientShift 15s ease infinite", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(45,212,191,0.4), transparent)" }} />
        <Container size="sm" style={{ textAlign: "center" }}>
          <div className="landing-animate">
            <Text component="span" style={{ display: "inline-flex", justifyContent: "center", marginBottom: "1rem", animation: "float 5s ease-in-out infinite", color: "#fff" }}>
              <IconRocket size={48} stroke={1.5} />
            </Text>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#fff", marginBottom: "1rem" }}>¿Listo para tomar el control?</h2>
            <Text size="md" style={{ color: "#cbd5e1", maxWidth: "480px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
              Únete a Pfinance y empieza a administrar tus finanzas de manera inteligente. Es gratis, seguro y diseñado para ti.
            </Text>
            <Group justify="center" gap="md" style={{ flexWrap: "wrap" }}>
              <Button component={Link} to="/register" size="lg" radius="xl"
                style={{ fontWeight: 700, fontSize: "1.05rem", padding: "0 2.5rem", background: "#fff", color: "#0f172a", boxShadow: "0 8px 32px rgba(255,255,255,0.15)", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(255,255,255,0.25)"; }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,255,255,0.15)"; }}>
                Crear mi cuenta gratis
              </Button>
              <Button component={Link} to="/login" size="lg" radius="xl" variant="outline"
                style={{ fontWeight: 600, fontSize: "1.05rem", padding: "0 2.5rem", borderColor: "rgba(255,255,255,0.3)", color: "#fff", transition: "all 0.2s" }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = "#fff"; }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}>
                Iniciar sesión
              </Button>
            </Group>
          </div>
        </Container>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer style={{ padding: "2rem 0", background: "#0a0f1a", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <Container size="lg">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <Text size="sm" fw={600} style={{ color: "#64748b", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
              <IconWallet size={16} /> Pfinance — Finanzas personales inteligentes
            </Text>
            <Text size="xs" style={{ color: "#475569" }}>© {new Date().getFullYear()} Pfinance. Todos los derechos reservados.</Text>
          </div>
        </Container>
      </footer>
    </div>
  );
}
