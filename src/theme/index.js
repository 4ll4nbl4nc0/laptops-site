import { alpha, createTheme } from '@mui/material/styles'

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ea7a5a',
      light: '#f2a085',
      dark: '#c95d3f',
    },
    secondary: {
      main: '#2f7f79',
      light: '#63a7a2',
      dark: '#235f5a',
    },
    background: {
      default: '#fbf6ef',
      paper: '#fffdf9',
    },
    success: {
      main: '#4d8b63',
    },
    warning: {
      main: '#d5924a',
    },
    error: {
      main: '#d46b71',
    },
    info: {
      main: '#6086a5',
    },
    text: {
      primary: '#1f2a33',
      secondary: '#6f7b84',
    },
    divider: alpha('#1f2a33', 0.08),
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: '"Manrope", "Segoe UI", sans-serif',
    h1: {
      fontFamily: '"Plus Jakarta Sans", "Manrope", sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.04em',
    },
    h2: {
      fontFamily: '"Plus Jakarta Sans", "Manrope", sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.03em',
    },
    h3: {
      fontFamily: '"Plus Jakarta Sans", "Manrope", sans-serif',
      fontWeight: 800,
    },
    h4: {
      fontFamily: '"Plus Jakarta Sans", "Manrope", sans-serif',
      fontWeight: 800,
    },
    h5: {
      fontFamily: '"Plus Jakarta Sans", "Manrope", sans-serif',
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    overline: {
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          paddingInline: 20,
          minHeight: 46,
          boxShadow: 'none',
        },
        contained: {
          backgroundImage: 'linear-gradient(135deg, #ea7a5a 0%, #f29a71 100%)',
          color: '#fffdf9',
        },
        outlined: {
          borderColor: alpha('#1f2a33', 0.12),
          backgroundColor: alpha('#fffdf9', 0.72),
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage:
            'linear-gradient(180deg, rgba(255,253,249,0.96), rgba(250,245,238,0.98))',
          border: `1px solid ${alpha('#1f2a33', 0.06)}`,
          boxShadow: '0 20px 54px rgba(163, 123, 87, 0.12)',
          backdropFilter: 'blur(12px)',
          borderRadius: 24,
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
          backgroundImage: 'linear-gradient(180deg, rgba(255,253,249,0.98), rgba(250,245,238,0.98))',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundColor: alpha('#ffffff', 0.72),
          transition: 'all 180ms ease',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha('#ea7a5a', 0.3),
          },
          '&.Mui-focused': {
            backgroundColor: alpha('#ffffff', 0.88),
            boxShadow: `0 0 0 4px ${alpha('#ea7a5a', 0.1)}`,
          },
        },
        notchedOutline: {
          borderColor: alpha('#1f2a33', 0.08),
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#fffaf3',
          borderRight: `1px solid ${alpha('#1f2a33', 0.08)}`,
        },
      },
    },
  },
})
