import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../app/store'
import AppBreadcrumbs from '../../components/common/AppBreadcrumbs'
import EmptyState from '../../components/common/EmptyState'
import ReservationSummary from '../../components/ecommerce/ReservationSummary'
import { useAppSnackbar } from '../../context/useAppSnackbar'

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  province: '',
  preferredContact: 'WhatsApp',
  comment: '',
  deliveryMode: 'Coordinación',
  acceptedTerms: false,
}

function ReservationCheckoutPage() {
  const cart = useAppStore((state) => state.reservationCart)
  const products = useAppStore((state) => state.products)
  const submitReservation = useAppStore((state) => state.submitReservation)
  const navigate = useNavigate()
  const { notify } = useAppSnackbar()
  const [form, setForm] = useState(initialForm)

  const total = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const product = products.find((entry) => entry.id === item.productId)
        if (!product) return sum
        return sum + (product.promoPrice || product.price) * item.quantity
      }, 0),
    [cart, products],
  )

  if (cart.length === 0) {
    return (
      <Container maxWidth="lg" className="section-padding">
        <EmptyState
          title="No hay productos para solicitar"
          description="Agrega equipos al carrito de reserva antes de completar el formulario."
          actionLabel="Ver catálogo"
          onAction={() => navigate('/catalogo')}
        />
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" className="section-padding">
      <AppBreadcrumbs
        items={[
          { label: 'Inicio', to: '/' },
          { label: 'Carrito de reserva', to: '/reserva' },
          { label: 'Checkout de reserva' },
        ]}
      />
      <Typography variant="h3" sx={{ mb: 3 }}>
        Solicitud de reserva / cotización
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ borderRadius: 6 }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Grid container spacing={2}>
                {[
                  ['Nombre', 'firstName'],
                  ['Apellidos', 'lastName'],
                  ['Email', 'email'],
                  ['Teléfono', 'phone'],
                  ['Empresa (opcional)', 'company'],
                  ['Provincia / ubicación', 'province'],
                ].map(([label, key]) => (
                  <Grid key={key} size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label={label}
                      value={form[key]}
                      onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                    />
                  </Grid>
                ))}
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Método de contacto preferido</InputLabel>
                    <Select
                      label="Método de contacto preferido"
                      value={form.preferredContact}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          preferredContact: event.target.value,
                        }))
                      }
                    >
                      <MenuItem value="WhatsApp">WhatsApp</MenuItem>
                      <MenuItem value="Email">Email</MenuItem>
                      <MenuItem value="Llamada">Llamada</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Modalidad</InputLabel>
                    <Select
                      label="Modalidad"
                      value={form.deliveryMode}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          deliveryMode: event.target.value,
                        }))
                      }
                    >
                      <MenuItem value="Pickup">Pickup</MenuItem>
                      <MenuItem value="Entrega">Entrega</MenuItem>
                      <MenuItem value="Coordinación">Coordinación</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={4}
                    label="Comentario adicional"
                    value={form.comment}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, comment: event.target.value }))
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 4,
                      border: '1px solid rgba(220, 231, 255, 0.08)',
                      bgcolor: 'rgba(76, 201, 240, 0.05)',
                    }}
                  >
                    <Typography color="text.secondary">
                      Esta solicitud no realiza un cobro en línea. Nuestro equipo te contactará
                      para confirmar disponibilidad y coordinar la reserva o cotización.
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.acceptedTerms}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            acceptedTerms: event.target.checked,
                          }))
                        }
                      />
                    }
                    label="Acepto que esta solicitud es de reserva/cotización y no un pago en línea."
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={2}>
            <ReservationSummary />
            <Button
              size="large"
              variant="contained"
              onClick={() => {
                if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.acceptedTerms) {
                  notify('Completa los campos obligatorios y acepta los términos.', 'warning')
                  return
                }
                submitReservation({ ...form, total })
                notify('Solicitud enviada correctamente', 'success')
                navigate('/confirmacion')
              }}
            >
              Enviar solicitud
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ReservationCheckoutPage
