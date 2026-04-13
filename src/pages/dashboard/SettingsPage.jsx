import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useAppStore } from '../../app/store'
import { useAppSnackbar } from '../../context/useAppSnackbar'

function SettingsPage() {
  const settings = useAppStore((state) => state.settings)
  const updateSettings = useAppStore((state) => state.updateSettings)
  const { notify } = useAppSnackbar()
  const [form, setForm] = useState(settings)

  return (
    <Stack spacing={3}>
      <Typography variant="h3">Configuración básica</Typography>
      <Card sx={{ borderRadius: 5 }}>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={2}>
            {[
              ['storeName', 'Nombre de tienda'],
              ['ctaLabel', 'Texto principal CTA'],
              ['supportEmail', 'Email soporte'],
              ['supportPhone', 'Teléfono soporte'],
              ['primaryColor', 'Color primario'],
              ['secondaryColor', 'Color secundario'],
            ].map(([key, label]) => (
              <Grid key={key} size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label={label}
                  value={form[key]}
                  onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                />
              </Grid>
            ))}
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Mensaje del flujo de reserva"
                value={form.reserveFlowMessage}
                onChange={(event) =>
                  setForm((current) => ({ ...current, reserveFlowMessage: event.target.value }))
                }
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Historia de marca"
                value={form.brandStory}
                onChange={(event) =>
                  setForm((current) => ({ ...current, brandStory: event.target.value }))
                }
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button
                variant="contained"
                onClick={() => {
                  updateSettings(form)
                  notify('Configuración guardada en localStorage', 'success')
                }}
              >
                Guardar configuración
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  )
}

export default SettingsPage
