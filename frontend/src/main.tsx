import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { AuthProvider } from './context/AuthContext';
import App from './App';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dropzone/styles.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const theme = createTheme({
  // ─── Identidad visual ───────────────────────────────────────────────────────
  primaryColor: 'teal',
  defaultRadius: 'md',

  // ─── Tipografía ─────────────────────────────────────────────────────────────
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontFamilyMonospace: '"JetBrains Mono", "Fira Code", monospace',

  headings: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontWeight: '700',
    sizes: {
      h1: { fontSize: '2rem',    lineHeight: '1.2' },
      h2: { fontSize: '1.5rem',  lineHeight: '1.25' },
      h3: { fontSize: '1.25rem', lineHeight: '1.3' },
      h4: { fontSize: '1.05rem', lineHeight: '1.35' },
      h5: { fontSize: '0.9rem',  lineHeight: '1.4' },
      h6: { fontSize: '0.8rem',  lineHeight: '1.4' },
    },
  },

  fontSizes: {
    xs:  '0.725rem',
    sm:  '0.855rem',
    md:  '0.95rem',
    lg:  '1.05rem',
    xl:  '1.2rem',
  },

  lineHeights: {
    xs:  '1.4',
    sm:  '1.45',
    md:  '1.55',
    lg:  '1.6',
    xl:  '1.65',
  },

  // ─── Espaciado ──────────────────────────────────────────────────────────────
  spacing: {
    xs:  '0.5rem',
    sm:  '0.75rem',
    md:  '1rem',
    lg:  '1.5rem',
    xl:  '2rem',
  },

  // ─── Sombras ────────────────────────────────────────────────────────────────
  shadows: {
    xs:   '0 1px 2px rgba(0,0,0,0.06)',
    sm:   '0 1px 4px rgba(0,0,0,0.10)',
    md:   '0 4px 12px rgba(0,0,0,0.12)',
    lg:   '0 8px 24px rgba(0,0,0,0.14)',
    xl:   '0 16px 40px rgba(0,0,0,0.18)',
    card: '0 2px 8px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.06)',
  },

  // ─── Overrides de componentes ───────────────────────────────────────────────
  components: {
    Paper: {
      defaultProps: {
        shadow: 'card',
      },
      styles: {
        root: {
          transition: 'box-shadow 0.2s ease, transform 0.15s ease',
        },
      },
    },
    Badge: {
      defaultProps: {
        radius: 'xl',
      },
    },
    Button: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        root: {
          fontWeight: 600,
          letterSpacing: '0.01em',
          transition: 'all 0.15s ease',
        },
      },
    },
    Progress: {
      defaultProps: {
        radius: 'xl',
      },
    },
    ActionIcon: {
      defaultProps: {
        radius: 'md',
      },
    },
    TextInput: {
      styles: {
        input: {
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
        },
      },
    },
    NumberInput: {
      styles: {
        input: {
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
        },
      },
    },
    Modal: {
      defaultProps: {
        shadow: 'xl',
        radius: 'lg',
      },
    },
    Tooltip: {
      defaultProps: {
        withArrow: true,
        arrowSize: 6,
      },
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <Notifications position="top-right" />
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
);
