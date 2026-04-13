import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <Container maxWidth="md" sx={{ py: 16 }}>
      <Box className="glass-panel noise-overlay" sx={{ p: { xs: 4, md: 7 }, borderRadius: 6, position: 'relative' }}>
        <Stack spacing={3} alignItems="flex-start">
          <Typography variant="overline" sx={{ letterSpacing: 2, color: 'primary.main' }}>
            Error 404
          </Typography>
          <Typography variant="h2">
            La ruta que buscas no forma parte de esta experiencia premium.
          </Typography>
          <Typography color="text.secondary" maxWidth={640}>
            Volvamos al showroom principal o entra directamente al catálogo para retomar
            la navegación.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button component={Link} to="/" variant="contained">
              Ir al Home
            </Button>
            <Button component={Link} to="/catalogo" variant="outlined">
              Ver catálogo
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  )
}

export default NotFoundPage
