import { Alert, Snackbar } from '@mui/material'
import { useMemo, useState } from 'react'
import { SnackbarContext } from './snackbarContext'

export function SnackbarProvider({ children }) {
  const [state, setState] = useState({
    open: false,
    message: '',
    severity: 'info',
  })

  const value = useMemo(
    () => ({
      notify: (message, severity = 'info') =>
        setState({
          open: true,
          message,
          severity,
        }),
    }),
    [],
  )

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        autoHideDuration={3200}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={state.open}
        onClose={() => setState((current) => ({ ...current, open: false }))}
      >
        <Alert
          severity={state.severity}
          variant="filled"
          onClose={() => setState((current) => ({ ...current, open: false }))}
          sx={{ width: '100%' }}
        >
          {state.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}
