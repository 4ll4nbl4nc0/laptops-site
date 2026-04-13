import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import AppBreadcrumbs from '../../components/common/AppBreadcrumbs'
import SectionHeading from '../../components/common/SectionHeading'
import { useAppSnackbar } from '../../context/useAppSnackbar'

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const { notify } = useAppSnackbar()

  return (
    <Container maxWidth="xl" className="section-padding">
      <AppBreadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Contacto' }]} />
      <SectionHeading
        eyebrow="Contacto"
        title="Asesoría comercial para setups premium"
        description="Pantalla pensada para propuesta de valor: cercana, profesional y lista para captar leads."
      />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card sx={{ borderRadius: 6, height: '100%' }}>
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={2}>
                <Typography variant="h5">Canales disponibles</Typography>
                <Typography color="text.secondary">Email: hola@astracompute.com</Typography>
                <Typography color="text.secondary">Teléfono: +506 4001-9000</Typography>
                <Typography color="text.secondary">Atención: Lun - Sáb, 8:00am - 6:00pm</Typography>
                <Typography color="text.secondary">
                  También gestionamos reservas corporativas, bundles y pedidos especiales.
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card sx={{ borderRadius: 6 }}>
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={5}
                    label="Cuéntanos qué equipo buscas"
                    value={form.message}
                    onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button
                    variant="contained"
                    onClick={() => notify('Mensaje mock enviado. Un asesor te contactará.', 'success')}
                  >
                    Enviar mensaje
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ContactPage
