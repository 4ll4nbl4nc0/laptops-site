import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from '../context/AppSnackbarProvider'
import { appTheme } from '../theme'

export function AppProviders({ children }) {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <SnackbarProvider>{children}</SnackbarProvider>
    </ThemeProvider>
  )
}
