import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import MotionReveal from './MotionReveal'

function AppFooter() {
  return (
    <MotionReveal sx={{ py: 6 }}>
      <Divider sx={{ mb: 4 }} />
      <Box className="soft-light-card elevated-border" sx={{ borderRadius: 6, p: { xs: 3, md: 4 } }}>
        <Grid container spacing={3} alignItems="start">
          <Grid size={{ xs: 12, md: 5.5 }}>
            <Stack spacing={2}>
              <Typography variant="h4">AstraCompute</Typography>
              <Typography color="text.secondary" maxWidth={460}>
                Showroom digital con mejor presencia visual para laptops, setups de alto rendimiento
                y una experiencia comercial más cuidada.
              </Typography>
              <Button
                component={Link}
                to="/contacto"
                variant="outlined"
                endIcon={<ArrowOutwardRoundedIcon />}
                sx={{ alignSelf: 'flex-start' }}
              >
                Solicitar asesoría
              </Button>
            </Stack>
          </Grid>
          <Grid size={{ xs: 6, md: 2.5 }}>
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
          <Grid size={{ xs: 6, md: 2.5 }}>
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
          <Grid size={{ xs: 12, md: 1.5 }}>
            <Typography color="text.secondary" variant="body2">
              © 2026 AstraCompute
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </MotionReveal>
  )
}

export default AppFooter
