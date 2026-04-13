import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useAppStore } from '../../app/store'
import { buildDashboardMetrics } from '../../features/analytics/metrics'
import { formatCurrency } from '../../utils/format'

function KpiCard({ title, value, helper, tone = 'primary' }) {
  return (
    <Card sx={{ borderRadius: 5, height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography color="text.secondary" variant="body2">
          {title}
        </Typography>
        <Typography variant="h4" sx={{ mt: 1.2, color: `${tone}.main` }}>
          {value}
        </Typography>
        <Typography color="text.secondary" variant="body2" sx={{ mt: 1 }}>
          {helper}
        </Typography>
      </CardContent>
    </Card>
  )
}

function ChartCard({ title, children }) {
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

function DashboardOverviewPage() {
  const products = useAppStore((state) => state.products)
  const customers = useAppStore((state) => state.customers)
  const reservations = useAppStore((state) => state.reservations)
  const analytics = useAppStore((state) => state.analytics)
  const metrics = buildDashboardMetrics(products, customers, reservations)
  const latestReservations = reservations.slice(0, 4)
  const topProducts = [...products].sort((a, b) => b.views - a.views).slice(0, 4)

  return (
    <Stack spacing={3}>
      <Card sx={{ borderRadius: 6 }} className="dashboard-accent">
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, lg: 8 }}>
              <Stack spacing={2}>
                <Chip
                  label="Executive Snapshot"
                  color="primary"
                  variant="outlined"
                  sx={{ alignSelf: 'flex-start' }}
                />
                <Typography variant="h3">Dashboard Overview</Typography>
                <Typography color="text.secondary" maxWidth={760}>
                  Vista ejecutiva del prototipo: catálogo activo, flujo de reservas, salud
                  del inventario y señales comerciales para una operación de hardware premium.
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }}>
              <Card sx={{ borderRadius: 5 }}>
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={1.5}>
                    <Typography fontWeight={700}>Pulse comercial</Typography>
                    <Typography color="text.secondary" variant="body2">
                      Categoría líder: {metrics.topCategory}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      Producto más visto: {metrics.mostViewed}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(100, metrics.confirmedReservations * 10 + 24)}
                      color="secondary"
                      sx={{ height: 8, borderRadius: 999 }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
          <KpiCard title="Total productos" value={metrics.totalProducts} helper="Catálogo activo del prototipo" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
          <KpiCard title="Bajo stock" value={metrics.lowStock} helper="Equipos que requieren atención" tone="warning" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
          <KpiCard title="Clientes" value={metrics.totalCustomers} helper="Base mock persistida localmente" tone="secondary" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
          <KpiCard title="Reservas pendientes" value={metrics.pendingReservations} helper="Oportunidades por gestionar" tone="warning" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
          <KpiCard title="Confirmadas" value={metrics.confirmedReservations} helper="Solicitudes listas para coordinar" tone="success" />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <ChartCard title="Reservas por mes">
            <ResponsiveContainer>
              <LineChart data={analytics.reservationsByMonth}>
                <CartesianGrid stroke="rgba(220,231,255,0.08)" />
                <XAxis dataKey="month" stroke="#9db0cc" />
                <YAxis stroke="#9db0cc" />
                <Tooltip />
                <Line type="monotone" dataKey="reservas" stroke="#4cc9f0" strokeWidth={3} />
                <Line type="monotone" dataKey="confirmadas" stroke="#7b61ff" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <ChartCard title="Stock por categoría">
            <ResponsiveContainer>
              <BarChart data={analytics.stockByCategory}>
                <CartesianGrid stroke="rgba(220,231,255,0.08)" />
                <XAxis dataKey="category" stroke="#9db0cc" />
                <YAxis stroke="#9db0cc" />
                <Tooltip />
                <Bar dataKey="stock" fill="#4cc9f0" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card sx={{ borderRadius: 5, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Reservas recientes
              </Typography>
              <Stack spacing={1.5}>
                {latestReservations.map((reservation) => (
                  <Box
                    key={reservation.id}
                    sx={{
                      p: 2,
                      borderRadius: 4,
                      border: '1px solid rgba(243, 239, 230, 0.08)',
                      bgcolor: 'rgba(255,255,255,0.02)',
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" spacing={2}>
                      <Box>
                        <Typography fontWeight={700}>{reservation.number}</Typography>
                        <Typography color="text.secondary" variant="body2">
                          {reservation.customerName}
                        </Typography>
                      </Box>
                      <Chip label={reservation.status} size="small" color="primary" variant="outlined" />
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card sx={{ borderRadius: 5, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Productos con mayor tracción
              </Typography>
              <Stack spacing={2}>
                {topProducts.map((product) => (
                  <Box key={product.id}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <Box>
                        <Typography fontWeight={700}>{product.name}</Typography>
                        <Typography color="text.secondary" variant="body2">
                          {product.brand} · {product.category} · {formatCurrency(product.promoPrice || product.price)}
                        </Typography>
                      </Box>
                      <Chip label={`${product.views} vistas`} size="small" variant="outlined" />
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(100, product.views / 20)}
                      color="secondary"
                      sx={{ mt: 1.25, height: 8, borderRadius: 999 }}
                    />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default DashboardOverviewPage
