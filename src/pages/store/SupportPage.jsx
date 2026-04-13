import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded'
import {
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { useAppStore } from '../../app/store'
import AppBreadcrumbs from '../../components/common/AppBreadcrumbs'
import SectionHeading from '../../components/common/SectionHeading'

function SupportPage() {
  const faqItems = useAppStore((state) => state.faqItems)

  return (
    <Container maxWidth="xl" className="section-padding">
      <AppBreadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Soporte' }]} />
      <SectionHeading
        eyebrow="Soporte"
        title="Soporte y preguntas frecuentes"
        description="Espacio pensado para transmitir seguridad y claridad en un e-commerce de computadoras orientado a reserva."
      />
      <Grid container spacing={3}>
        {faqItems.map((item) => (
          <Grid key={item.question} size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 5, height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={1.5}>
                  <SupportAgentRoundedIcon color="primary" />
                  <Typography variant="h6">{item.question}</Typography>
                  <Typography color="text.secondary">{item.answer}</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default SupportPage
