import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function AppFooter() {
  return (
    <Box sx={{ py: 5 }}>
      <Divider sx={{ mb: 4 }} />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            AstraCompute
          </Typography>
          <Typography color="text.secondary" maxWidth={460}>
            Prototipo comercial premium para tienda de computadoras enfocada en reserva,
            cotización y atención personalizada.
          </Typography>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Stack spacing={1}>
            <Typography fontWeight={700}>Storefront</Typography>
            <Typography component={Link} to="/catalogo" color="text.secondary">
              Catálogo
            </Typography>
            <Typography component={Link} to="/comparar" color="text.secondary">
              Comparador
            </Typography>
            <Typography component={Link} to="/reserva" color="text.secondary">
              Carrito de reserva
            </Typography>
          </Stack>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Stack spacing={1}>
            <Typography fontWeight={700}>Ayuda</Typography>
            <Typography component={Link} to="/soporte" color="text.secondary">
              FAQ & soporte
            </Typography>
            <Typography component={Link} to="/contacto" color="text.secondary">
              Contacto
            </Typography>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <Typography color="text.secondary" variant="body2">
            © 2026 AstraCompute. Demo frontend con persistencia local.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AppFooter
