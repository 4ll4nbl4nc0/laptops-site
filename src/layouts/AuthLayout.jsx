import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background:
          'radial-gradient(circle at top, rgba(234,122,90,0.14), transparent 28%), radial-gradient(circle at bottom right, rgba(47,127,121,0.12), transparent 24%), #fbf6ef',
      }}
    >
      <Container maxWidth="sm">
        <Outlet />
      </Container>
    </Box>
  )
}

export default AuthLayout
