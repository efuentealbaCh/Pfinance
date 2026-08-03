import { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Group, Text, Container, Center, Loader } from '@mantine/core';

/* ─── Scroll-triggered animation hook ─────────────────── */
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    const targets = el.querySelectorAll('.landing-animate');
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ─── Style constants ─────────────────────────────────── */
const GRADIENT_BG = 'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0f766e 100%)';
const GLASS = {
  background: 'rgba(255, 255, 255, 0.06)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
} as const;

const FEATURES = [
  {
    icon: '📊',
    title: 'Dashboard inteligente',
    desc: 'Visualiza tu balance total, analíticas de gastos y tendencias en tiempo real con gráficos interactivos.',
  },
  {
    icon: '💳',
    title: 'Múltiples cuentas y tarjetas',
    desc: 'Administra todas tus cuentas bancarias y tarjetas en un solo lugar, con soporte para los principales bancos de Chile.',
  },
  {
    icon: '📈',
    title: 'Presupuestos por categoría',
    desc: 'Establece límites mensuales por categoría y recibe alertas cuando estés cerca de excederlos.',
  },
  {
    icon: '🎯',
    title: 'Metas de ahorro',
    desc: 'Define objetivos financieros, registra depósitos y observa tu progreso con barras visuales.',
  },
  {
    icon: '📋',
    title: 'Copiado rápido de datos',
    desc: 'Comparte tus datos de transferencia al instante. Copia tu nombre, RUT, banco y número de cuenta con un solo clic.',
  },
  {
    icon: '👥',
    title: 'Gastos compartidos',
    desc: 'Crea grupos, divide gastos con amigos o familia y mantén el control de quién debe qué.',
  },
];

const STEPS = [
  {
    num: '01',
    icon: '✍️',
    title: 'Crea tu cuenta',
    desc: 'Regístrate en segundos con tu correo y RUT. Tus datos se almacenan de forma encriptada.',
  },
  {
    num: '02',
    icon: '🏦',
    title: 'Conecta tus cuentas',
    desc: 'Agrega tus cuentas bancarias y tarjetas. Selecciona tu banco y el sistema carga los tipos de cuenta disponibles.',
  },
  {
    num: '03',
    icon: '🚀',
    title: 'Controla tus finanzas',
    desc: 'Registra transacciones, establece presupuestos, fija metas de ahorro y comparte gastos con tu grupo.',
  },
];

/* ─── Component ───────────────────────────────────────── */
export default function LandingPage() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const containerRef = useScrollAnimation();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <Center h="100vh" style={{ background: '#0f172a' }}>
        <Loader size="lg" color="teal" />
      </Center>
    );
  }

  return (
    <div ref={containerRef} style={{ background: '#0f172a', color: '#e2e8f0', overflowX: 'hidden' }}>
      {/* ════════════════════════════════════════════════════
          NAVBAR
         ════════════════════════════════════════════════════ */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '1rem 2rem',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text
          component="a"
          href="#hero"
          fw={900}
          size="xl"
          style={{
            color: '#fff',
            textDecoration: 'none',
            letterSpacing: '-0.5px',
          }}
        >
          💰 Pfinance
        </Text>

        <Group gap="xs" visibleFrom="xs">
          <Button
            component={Link}
            to="/login"
            variant="subtle"
            color="gray"
            radius="xl"
            style={{ color: '#cbd5e1', fontWeight: 500 }}
          >
            Iniciar sesión
          </Button>
          <Button
            component={Link}
            to="/register"
            variant="gradient"
            gradient={{ from: '#0f766e', to: '#2dd4bf', deg: 135 }}
            radius="xl"
            style={{ fontWeight: 600 }}
          >
            Registrarse gratis
          </Button>
        </Group>
      </nav>

      {/* ════════════════════════════════════════════════════
          HERO
         ════════════════════════════════════════════════════ */}
      <section
        id="hero"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: GRADIENT_BG,
          backgroundSize: '200% 200%',
          animation: 'gradientShift 12s ease infinite',
          position: 'relative',
          paddingTop: '80px',
        }}
      >
        {/* Decorative orbs */}
        <div
          style={{
            position: 'absolute',
            top: '15%',
            left: '10%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(45, 212, 191, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'float 6s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '8%',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(15, 118, 110, 0.2) 0%, transparent 70%)',
            filter: 'blur(50px)',
            animation: 'float 8s ease-in-out infinite reverse',
            pointerEvents: 'none',
          }}
        />

        <Container size="lg" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ animation: 'fadeInUp 0.8s ease-out' }}>
            <Text
              component="span"
              style={{
                display: 'inline-block',
                fontSize: '4.5rem',
                marginBottom: '0.5rem',
                animation: 'float 4s ease-in-out infinite',
              }}
            >
              💰
            </Text>

            <h1
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.15,
                marginBottom: '1.2rem',
                letterSpacing: '-1px',
              }}
            >
              Toma el control total
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #2dd4bf, #0f766e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                de tus finanzas personales
              </span>
            </h1>

            <Text
              size="lg"
              style={{
                color: '#94a3b8',
                maxWidth: '600px',
                margin: '0 auto 2.5rem',
                lineHeight: 1.7,
                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              }}
            >
              Administra tus cuentas, controla tus gastos, fija metas de ahorro y comparte
              gastos con tu grupo — todo desde una sola plataforma diseñada para ti.
            </Text>

            <Group justify="center" gap="md" style={{ flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to="/register"
                size="lg"
                radius="xl"
                variant="gradient"
                gradient={{ from: '#0f766e', to: '#2dd4bf', deg: 135 }}
                style={{
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  padding: '0 2.5rem',
                  boxShadow: '0 8px 32px rgba(45, 212, 191, 0.3)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(45, 212, 191, 0.45)';
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(45, 212, 191, 0.3)';
                }}
              >
                Comenzar gratis
              </Button>
              <Button
                component={Link}
                to="/login"
                size="lg"
                radius="xl"
                variant="outline"
                color="gray"
                style={{
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  padding: '0 2.5rem',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#e2e8f0',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.borderColor = 'rgba(45, 212, 191, 0.5)';
                  e.currentTarget.style.color = '#2dd4bf';
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.color = '#e2e8f0';
                }}
              >
                Ya tengo cuenta
              </Button>
            </Group>
          </div>
        </Container>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        >
          <Text size="sm" c="dimmed" ta="center">
            ↓ Descubre más
          </Text>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FEATURES
         ════════════════════════════════════════════════════ */}
      <section
        id="features"
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) 0',
          background: '#0f172a',
          position: 'relative',
        }}
      >
        {/* Top gradient divider */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(45, 212, 191, 0.3), transparent)',
          }}
        />

        <Container size="lg">
          <div className="landing-animate" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <Text
              size="sm"
              fw={700}
              style={{
                color: '#2dd4bf',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '0.75rem',
              }}
            >
              Funcionalidades
            </Text>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                fontWeight: 800,
                color: '#fff',
                marginBottom: '1rem',
              }}
            >
              Todo lo que necesitas en un solo lugar
            </h2>
            <Text size="md" style={{ color: '#94a3b8', maxWidth: '550px', margin: '0 auto' }}>
              Herramientas potentes y fáciles de usar para manejar cada aspecto de tus finanzas personales.
            </Text>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className={`landing-animate landing-animate-delay-${i + 1}`}
                style={{
                  ...GLASS,
                  padding: '2rem',
                  cursor: 'default',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(45, 212, 191, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(45, 212, 191, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <div
                  style={{
                    fontSize: '2.4rem',
                    marginBottom: '1rem',
                    display: 'inline-block',
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '0.65rem',
                  }}
                >
                  {f.title}
                </h3>
                <Text size="sm" style={{ color: '#94a3b8', lineHeight: 1.65 }}>
                  {f.desc}
                </Text>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════
          HOW IT WORKS
         ════════════════════════════════════════════════════ */}
      <section
        id="how-it-works"
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) 0',
          background: 'linear-gradient(180deg, #0f172a 0%, #1a2332 100%)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(45, 212, 191, 0.3), transparent)',
          }}
        />

        <Container size="lg">
          <div className="landing-animate" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <Text
              size="sm"
              fw={700}
              style={{
                color: '#2dd4bf',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '0.75rem',
              }}
            >
              ¿Cómo funciona?
            </Text>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                fontWeight: 800,
                color: '#fff',
                marginBottom: '1rem',
              }}
            >
              Empieza en 3 simples pasos
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem',
              maxWidth: '960px',
              margin: '0 auto',
            }}
          >
            {STEPS.map((step, i) => (
              <div
                key={i}
                className={`landing-animate landing-animate-delay-${i + 1}`}
                style={{
                  textAlign: 'center',
                  position: 'relative',
                  padding: '2rem 1.5rem',
                }}
              >
                {/* Step number badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0f766e, #2dd4bf)',
                    marginBottom: '1.2rem',
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    color: '#fff',
                    boxShadow: '0 8px 24px rgba(45, 212, 191, 0.25)',
                  }}
                >
                  {step.num}
                </div>

                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{step.icon}</div>

                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '0.65rem',
                  }}
                >
                  {step.title}
                </h3>
                <Text size="sm" style={{ color: '#94a3b8', lineHeight: 1.65 }}>
                  {step.desc}
                </Text>

                {/* Connector line (not on last) */}
                {i < STEPS.length - 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '72px',
                      right: '-1rem',
                      width: '2rem',
                      height: '2px',
                      background: 'linear-gradient(90deg, rgba(45, 212, 191, 0.4), transparent)',
                      display: 'none', // Hidden on mobile, shown via media query alternative below
                    }}
                    className="step-connector"
                  />
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════
          STATS / TRUST
         ════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(3rem, 6vw, 5rem) 0',
          background: '#0f172a',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(45, 212, 191, 0.3), transparent)',
          }}
        />

        <Container size="lg">
          <div
            className="landing-animate"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '2rem',
              textAlign: 'center',
            }}
          >
            {[
              { value: '🔒', label: 'Encriptación AES-256', sub: 'Tus datos siempre seguros' },
              { value: '🏦', label: 'Bancos de Chile', sub: 'Soporte para los principales bancos' },
              { value: '📱', label: 'App Progresiva (PWA)', sub: 'Instálala en tu celular' },
              { value: '⚡', label: '100% Gratuito', sub: 'Sin cargos ocultos' },
            ].map((stat, i) => (
              <div
                key={i}
                className={`landing-animate landing-animate-delay-${i + 1}`}
                style={{ padding: '1.5rem' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{stat.value}</div>
                <Text fw={700} size="md" style={{ color: '#fff', marginBottom: '0.3rem' }}>
                  {stat.label}
                </Text>
                <Text size="xs" style={{ color: '#64748b' }}>
                  {stat.sub}
                </Text>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════
          CTA FINAL
         ════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) 0',
          background: 'linear-gradient(135deg, #0f766e 0%, #1e293b 50%, #0f172a 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 15s ease infinite',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(45, 212, 191, 0.4), transparent)',
          }}
        />

        <Container size="sm" style={{ textAlign: 'center' }}>
          <div className="landing-animate">
            <Text
              component="span"
              style={{
                display: 'inline-block',
                fontSize: '3rem',
                marginBottom: '1rem',
                animation: 'float 5s ease-in-out infinite',
              }}
            >
              🚀
            </Text>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                fontWeight: 800,
                color: '#fff',
                marginBottom: '1rem',
              }}
            >
              ¿Listo para tomar el control?
            </h2>
            <Text
              size="md"
              style={{
                color: '#cbd5e1',
                maxWidth: '480px',
                margin: '0 auto 2rem',
                lineHeight: 1.7,
              }}
            >
              Únete a Pfinance y comienza a administrar tus finanzas de manera inteligente.
              Es gratis, seguro y está diseñado para ti.
            </Text>

            <Group justify="center" gap="md" style={{ flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to="/register"
                size="lg"
                radius="xl"
                style={{
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  padding: '0 2.5rem',
                  background: '#fff',
                  color: '#0f172a',
                  boxShadow: '0 8px 32px rgba(255, 255, 255, 0.15)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 255, 255, 0.25)';
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 255, 255, 0.15)';
                }}
              >
                Crear mi cuenta gratis
              </Button>
              <Button
                component={Link}
                to="/login"
                size="lg"
                radius="xl"
                variant="outline"
                style={{
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  padding: '0 2.5rem',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: '#fff',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.borderColor = '#fff';
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
              >
                Iniciar sesión
              </Button>
            </Group>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════
          FOOTER
         ════════════════════════════════════════════════════ */}
      <footer
        style={{
          padding: '2rem 0',
          background: '#0a0f1a',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <Container size="lg">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            <Text size="sm" fw={600} style={{ color: '#64748b' }}>
              💰 Pfinance — Finanzas personales inteligentes
            </Text>
            <Text size="xs" style={{ color: '#475569' }}>
              © {new Date().getFullYear()} Pfinance. Todos los derechos reservados.
            </Text>
          </div>
        </Container>
      </footer>
    </div>
  );
}
