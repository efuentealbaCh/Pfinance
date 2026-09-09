import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import api from '../api/axios';

interface User {
  /** UUID, no un entero: las tablas del esquema usan `@db.Uuid`. */
  id: string;
  name: string;
  email: string;
  rut?: string | null;
  /** Si el usuario ya confirmó su correo con el enlace que le llegó al registrarse. */
  email_verified?: boolean;
  /** Si tiene activa la verificación en dos pasos. */
  totp_enabled?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  /** @param code código TOTP de 6 dígitos, solo necesario si la cuenta tiene 2FA activo */
  login: (email: string, password: string, code?: string) => Promise<void>;
  /**
   * La confirmación de contraseña no viaja al servidor: se valida en el formulario, que es el
   * único lugar donde significa algo (que la persona escribió lo mismo dos veces).
   */
  register: (name: string, email: string, rut: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  /** Vuelve a leer el usuario del backend, sin cerrar sesión. */
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));
  const [loading, setLoading] = useState(true);

  // Al montar, si hay token guardado, obtener datos del usuario
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await api.get('/auth/me');
          setUser(response.data.user);
        } catch {
          // Token inválido o expirado
          localStorage.removeItem('auth_token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [token]);

  /**
   * Inicia sesión. Si la cuenta tiene 2FA activo y no se manda `code`, el backend responde
   * 401 con `requires2fa: true` en el cuerpo; el error se propaga tal cual para que la
   * pantalla de login pueda distinguir ese caso de una credencial equivocada.
   */
  const login = async (email: string, password: string, code?: string) => {
    const response = await api.post('/auth/login', code ? { email, password, code } : { email, password });
    const { token: newToken, user: userData } = response.data;
    localStorage.setItem('auth_token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  /**
   * Registra al usuario y deja la sesión iniciada.
   *
   * El cuerpo lleva exactamente los campos que declara `RegisterDto` y ni uno más: el
   * `ValidationPipe` global corre con `forbidNonWhitelisted`, así que cualquier propiedad
   * extra hace que el registro entero falle con 400. Es lo que pasaba al mandar
   * `password_confirmation`, un campo que quedó de la API anterior en Laravel.
   */
  const register = async (name: string, email: string, rut: string, password: string) => {
    const response = await api.post('/auth/register', {
      name,
      email,
      rut,
      password,
    });
    const { token: newToken, user: userData } = response.data;
    localStorage.setItem('auth_token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignorar error si el token ya expiró
    }
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
  };

  /**
   * Relee el usuario desde el backend.
   *
   * Hace falta porque hay acciones que cambian el estado de la cuenta sin pasar por el login:
   * activar 2FA o verificar el correo dejan al `user` en memoria desactualizado, y sin esto
   * la única forma de reflejarlo sería cerrar sesión y volver a entrar.
   */
  const refreshUser = async () => {
    if (!token) return;
    const response = await api.get('/auth/me');
    setUser(response.data.user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
