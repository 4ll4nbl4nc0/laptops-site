import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from 'recharts'
import { useAppStore } from '../../app/store'

function ChartShell({ title, children }) {
  return (
    <Card sx={{ borderRadius: 5, height: '100%' }}>
      <CardContent sx={{ p: 3, height: '100%' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <div style={{ width: '100%', height: 320 }}>{children}</div>
      </CardContent>
    </Card>
  )
}

function AnalyticsPage() {
  const analytics = useAppStore((state) => state.analytics)

  return (
    <Stack spacing={3}>
      <Typography variant="h3">Analytics</Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartShell title="Categorías más visitadas">
            <ResponsiveContainer>
              <BarChart data={analytics.visitsByCategory}>
                <CartesianGrid stroke="rgba(220,231,255,0.08)" />
                <XAxis dataKey="category" stroke="#9db0cc" />
                <YAxis stroke="#9db0cc" />
                <Tooltip />
                <Bar dataKey="visits" fill="#4cc9f0" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartShell>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartShell title="Clientes nuevos vs recurrentes">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={analytics.customerMix}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={72}
                  outerRadius={110}
                  paddingAngle={4}
                >
                  {analytics.customerMix.map((entry, index) => (
                    <Cell key={entry.name} fill={index === 0 ? '#4cc9f0' : '#7b61ff'} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartShell>
        </Grid>
      </Grid>
      <Card sx={{ borderRadius: 5 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Métricas demo
          </Typography>
          <Typography color="text.secondary">
            Estas visualizaciones son mock data orientadas a propuesta comercial. Simulan
            comportamiento de reservas, visitas y composición de clientes sin depender de backend.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  )
}

export default AnalyticsPage
