import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import CallRoundedIcon from '@mui/icons-material/CallRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useAppStore } from '../../app/store'
import AppBreadcrumbs from '../../components/common/AppBreadcrumbs'
import MotionReveal from '../../components/common/MotionReveal'
import SectionHeading from '../../components/common/SectionHeading'
import { useAppSnackbar } from '../../context/useAppSnackbar'

const contactFeatures = [
  ['Respuesta comercial ágil', 'Normalmente atendemos solicitudes el mismo día hábil.'],
  ['Asesoría para empresa', 'Ayudamos con compras por volumen, setups y bundles completos.'],
  ['Acompañamiento técnico', 'Te orientamos por uso real, no solo por ficha técnica.'],
]

function ContactInfoCard({ icon, title, value, helper }) {
  return (
    <Card className="soft-light-card elevated-border" sx={{ borderRadius: 5, height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={1.5}>
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: 3,
              display: 'grid',
              placeItems: 'center',
              bgcolor: 'rgba(47, 127, 121, 0.1)',
              color: 'secondary.main',
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6">{title}</Typography>
          <Typography>{value}</Typography>
          {helper ? <Typography color="text.secondary">{helper}</Typography> : null}
        </Stack>
      </CardContent>
    </Card>
  )
}

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const { notify } = useAppSnackbar()
  const settings = useAppStore((state) => state.settings)

  return (
    <Container maxWidth="xl" className="section-padding">
      <AppBreadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Contacto' }]} />

      <MotionReveal>
        <Card
          className="soft-light-card elevated-border"
          sx={{ borderRadius: 8, overflow: 'hidden', mb: 5 }}
        >
          <Grid container>
            <Grid size={{ xs: 12, lg: 7 }}>
              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                <Stack spacing={3}>
                  <Chip label="Contacto premium" color="primary" sx={{ alignSelf: 'flex-start' }} />
                  <SectionHeading
                    eyebrow="Asesoría comercial"
                    title="Hablemos de tu siguiente setup con una experiencia más moderna y consultiva"
                    description="Rediseñamos esta sección para que funcione como una landing real de captación: más elegante, clara y lista para convertir visitas en conversaciones."
                  />
                  <Stack direction="row" spacing={1.2} flexWrap="wrap" useFlexGap>
                    {['Laptops premium', 'Compras empresariales', 'Workstations', 'Bundles'].map((item) => (
                      <Chip key={item} label={item} variant="outlined" />
                    ))}
                  </Stack>
                </Stack>
              </CardContent>
            </Grid>
            <Grid size={{ xs: 12, lg: 5 }}>
              <Box
                sx={{
                  height: '100%',
                  minHeight: 320,
                  backgroundImage: `linear-gradient(180deg, rgba(255,250,244,0.18), rgba(245,237,226,0.72)), url(${settings.promoVisual})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              />
            </Grid>
          </Grid>
        </Card>
      </MotionReveal>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <MotionReveal delay={0.05}>
            <ContactInfoCard
              icon={<MailOutlineRoundedIcon />}
              title="Email"
              value={settings.supportEmail}
              helper="Ideal para cotizaciones, seguimiento y consultas previas."
            />
          </MotionReveal>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <MotionReveal delay={0.1}>
            <ContactInfoCard
              icon={<CallRoundedIcon />}
              title="Teléfono"
              value={settings.supportPhone}
              helper="Atención comercial y coordinación rápida de reservas."
            />
          </MotionReveal>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <MotionReveal delay={0.15}>
            <ContactInfoCard
              icon={<AccessTimeRoundedIcon />}
              title="Horario"
              value={settings.businessHours}
              helper="Te acompañamos en compras personales y corporativas."
            />
          </MotionReveal>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <MotionReveal>
            <Card className="elevated-border" sx={{ borderRadius: 7 }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      Cuéntanos qué estás buscando
                    </Typography>
                    <Typography color="text.secondary">
                      Completa el formulario y un asesor te contactará para armar la mejor
                      propuesta según presupuesto, uso y disponibilidad.
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="Nombre"
                        value={form.name}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, name: event.target.value }))
                        }
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="Email"
                        value={form.email}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, email: event.target.value }))
                        }
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Empresa u organización"
                        value={form.company}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, company: event.target.value }))
                        }
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        multiline
                        minRows={6}
                        label="Cuéntanos qué equipo buscas"
                        placeholder="Ejemplo: necesito 8 laptops para oficina, 2 workstations para diseño y un bundle con monitores."
                        value={form.message}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, message: event.target.value }))
                        }
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={1.5}
                        justifyContent="space-between"
                        alignItems={{ xs: 'stretch', sm: 'center' }}
                      >
                        <Typography color="text.secondary" maxWidth={420}>
                          Esta solicitud no realiza pago en línea. Primero validamos inventario,
                          opciones y tiempos de entrega.
                        </Typography>
                        <Button
                          variant="contained"
                          endIcon={<SendRoundedIcon />}
                          onClick={() =>
                            notify('Mensaje mock enviado. Un asesor te contactará pronto.', 'success')
                          }
                        >
                          Enviar mensaje
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </CardContent>
            </Card>
          </MotionReveal>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <Stack spacing={3}>
            <MotionReveal delay={0.08}>
              <Card className="soft-light-card elevated-border" sx={{ borderRadius: 7 }}>
                <CardContent sx={{ p: 3.5 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1.2} alignItems="center">
                      <LocationOnRoundedIcon color="secondary" />
                      <Typography variant="h5">Ubicación</Typography>
                    </Stack>
                    <Typography>{settings.supportAddress}</Typography>
                    <Typography color="text.secondary">
                      Mapa integrado con Google Maps para que la sección de contacto se sienta más
                      real y útil.
                    </Typography>
                    <Box
                      sx={{
                        borderRadius: 5,
                        overflow: 'hidden',
                        border: '1px solid rgba(31,42,51,0.08)',
                        minHeight: 320,
                      }}
                    >
                      <Box
                        component="iframe"
                        src={settings.mapEmbedUrl}
                        title="Google Maps - AstraCompute"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        sx={{ border: 0, width: '100%', height: 320 }}
                      />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.14}>
              <Card className="elevated-border" sx={{ borderRadius: 7 }}>
                <CardContent sx={{ p: 3.5 }}>
                  <Stack spacing={2}>
                    <Typography variant="h5">Por qué esta experiencia se ve más actual</Typography>
                    {contactFeatures.map(([title, text]) => (
                      <Box key={title}>
                        <Typography fontWeight={700}>{title}</Typography>
                        <Typography color="text.secondary">{text}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </MotionReveal>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ContactPage
