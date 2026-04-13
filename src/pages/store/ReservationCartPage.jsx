import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded'
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useAppStore } from '../../app/store'
import AppBreadcrumbs from '../../components/common/AppBreadcrumbs'
import EmptyState from '../../components/common/EmptyState'
import ReservationSummary from '../../components/ecommerce/ReservationSummary'
import { formatCurrency } from '../../utils/format'

function ReservationCartPage() {
  const cart = useAppStore((state) => state.reservationCart)
  const products = useAppStore((state) => state.products)
  const updateCartQty = useAppStore((state) => state.updateCartQty)
  const removeFromReservationCart = useAppStore((state) => state.removeFromReservationCart)

  const items = useMemo(
    () =>
      cart
        .map((item) => ({
          ...item,
          product: products.find((product) => product.id === item.productId),
        }))
        .filter((item) => item.product),
    [cart, products],
  )

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" className="section-padding">
        <EmptyState
          title="Tu carrito de reserva está vacío"
          description="Agrega equipos para apartar interés, solicitar cotización o coordinar disponibilidad con un asesor."
          actionLabel="Ir al catálogo"
          onAction={() => (window.location.href = '/catalogo')}
        />
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" className="section-padding">
      <AppBreadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Carrito de reserva' }]} />
      <Typography variant="h3" sx={{ mb: 3 }}>
        Carrito de reserva / interés
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={2}>
            {items.map((item) => (
              <Card key={item.productId} sx={{ borderRadius: 5 }}>
                <CardContent sx={{ p: 3 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, md: 3 }}>
                      <Box component="img" src={item.product.visuals[0]} alt={item.product.name} sx={{ width: '100%', borderRadius: 4 }} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography variant="h6">{item.product.name}</Typography>
                      <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                        {item.product.brand} · {item.product.technicalSpecs.processor}
                      </Typography>
                      <Typography sx={{ mt: 1.5 }}>
                        {formatCurrency(item.product.promoPrice || item.product.price)}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <Stack direction="row" spacing={1} alignItems="center" justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
                        <IconButton onClick={() => updateCartQty(item.productId, item.quantity - 1)}>
                          <RemoveRoundedIcon />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton onClick={() => updateCartQty(item.productId, item.quantity + 1)}>
                          <AddRoundedIcon />
                        </IconButton>
                        <IconButton onClick={() => removeFromReservationCart(item.productId)}>
                          <DeleteOutlineRoundedIcon />
                        </IconButton>
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={2}>
            <ReservationSummary />
            <Card sx={{ borderRadius: 5 }}>
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Typography color="text.secondary">
                    Este flujo no realiza cobros online. Tu solicitud será revisada por el equipo
                    comercial para confirmar disponibilidad y coordinar la reserva.
                  </Typography>
                  <Divider />
                  <Button
                    component={Link}
                    to="/checkout-reserva"
                    variant="contained"
                    startIcon={<ShoppingBagRoundedIcon />}
                  >
                    Completar solicitud
                  </Button>
                  <Button component={Link} to="/catalogo" variant="outlined">
                    Seguir explorando
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ReservationCartPage
