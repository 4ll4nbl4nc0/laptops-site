import { alpha, createTheme } from '@mui/material/styles'

export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d6b06b',
      light: '#ead1a3',
      dark: '#a78442',
    },
    secondary: {
      main: '#6aa7ad',
      light: '#8fc7cc',
      dark: '#3d767c',
    },
    background: {
      default: '#0a0f14',
      paper: '#121922',
    },
    success: {
      main: '#68c08b',
    },
    warning: {
      main: '#d39a4d',
    },
    error: {
      main: '#d96b79',
    },
    info: {
      main: '#78a9d4',
    },
    text: {
      primary: '#f3efe6',
      secondary: '#a9b0b8',
    },
    divider: alpha('#f3efe6', 0.1),
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: '"Manrope", "Segoe UI", sans-serif',
    h1: {
      fontFamily: '"Space Grotesk", "Manrope", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.04em',
    },
    h2: {
      fontFamily: '"Space Grotesk", "Manrope", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
    h3: {
      fontFamily: '"Space Grotesk", "Manrope", sans-serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: '"Space Grotesk", "Manrope", sans-serif',
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 18,
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage:
            'linear-gradient(180deg, rgba(20,27,36,0.96), rgba(12,17,23,0.98))',
          border: `1px solid ${alpha('#f3efe6', 0.07)}`,
          boxShadow: '0 24px 60px rgba(2, 4, 8, 0.4)',
          backdropFilter: 'blur(20px)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 700,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage:
            'linear-gradient(180deg, rgba(18,25,34,0.95), rgba(11,15,21,0.98))',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#0f151d',
          borderRight: `1px solid ${alpha('#f3efe6', 0.08)}`,
        },
      },
    },
  },
})
