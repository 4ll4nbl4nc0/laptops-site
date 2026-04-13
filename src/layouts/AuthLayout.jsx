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
          'radial-gradient(circle at top, rgba(76,201,240,0.18), transparent 28%), radial-gradient(circle at bottom right, rgba(123,97,255,0.2), transparent 24%), #07111f',
      }}
    >
      <Container maxWidth="sm">
        <Outlet />
      </Container>
    </Box>
  )
}

export default AuthLayout
