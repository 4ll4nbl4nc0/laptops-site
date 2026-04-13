import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppStore } from '../../app/store'
import EmptyState from '../../components/common/EmptyState'
import { formatDate } from '../../utils/format'

function ReservationConfirmationPage() {
  const reservation = useAppStore((state) => state.ui.lastReservation)
  const products = useAppStore((state) => state.products)

  if (!reservation) {
    return (
      <Container maxWidth="lg" className="section-padding">
        <EmptyState
          title="No hay una reserva reciente para mostrar"
          description="Completa una solicitud de reserva para ver la pantalla de confirmación."
          actionLabel="Ir al catálogo"
          onAction={() => (window.location.href = '/catalogo')}
        />
      </Container>
    )
  }

  return (
    <Container maxWidth="md" className="section-padding">
      <Card sx={{ borderRadius: 6 }}>
        <CardContent sx={{ p: { xs: 4, md: 6 } }}>
          <Stack spacing={2.5}>
            <CheckCircleRoundedIcon color="success" sx={{ fontSize: 56 }} />
            <Typography variant="h3">Solicitud registrada</Typography>
            <Typography color="text.secondary">
              Número de reserva: <strong>{reservation.number}</strong>
            </Typography>
            <Typography color="text.secondary">
              Estado inicial: <strong>{reservation.status}</strong>
            </Typography>
            <Typography color="text.secondary">
              Fecha: {formatDate(reservation.createdAt)}
            </Typography>
            <Divider />
            <Typography variant="h6">Datos del solicitante</Typography>
            <Typography color="text.secondary">
              {reservation.customerName} · {reservation.details.email} · {reservation.details.phone}
            </Typography>
            <Typography color="text.secondary">
              Provincia: {reservation.province} · Contacto preferido: {reservation.preferredContact}
            </Typography>
            <Divider />
            <Typography variant="h6">Productos solicitados</Typography>
            {reservation.items.map((item) => {
              const product = products.find((entry) => entry.id === item.productId)
              if (!product) return null
              return (
                <Typography key={item.productId} color="text.secondary">
                  {product.name} · x{item.quantity}
                </Typography>
              )
            })}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 2 }}>
              <Button component={Link} to="/catalogo" variant="contained">
                Seguir navegando
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  )
}

export default ReservationConfirmationPage
