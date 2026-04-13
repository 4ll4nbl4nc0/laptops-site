import {
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useMemo, useState } from 'react'
import { useAppStore } from '../../app/store'

function CustomersPage() {
  const customers = useAppStore((state) => state.customers)
  const reservations = useAppStore((state) => state.reservations)
  const [selectedId, setSelectedId] = useState(customers[0]?.id || '')

  const rows = useMemo(
    () =>
      customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        status: customer.status,
        company: customer.company || 'Consumidor final',
      })),
    [customers],
  )

  const selected = customers.find((customer) => customer.id === selectedId) || customers[0]
  const customerReservations = reservations.filter((reservation) =>
    selected?.reservations.includes(reservation.id),
  )

  return (
    <Stack spacing={3}>
      <Typography variant="h3">Gestión de clientes</Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card sx={{ borderRadius: 5 }}>
            <CardContent sx={{ p: 3 }}>
              <div className="dashboard-grid" style={{ height: 520 }}>
                <DataGrid
                  rows={rows}
                  columns={[
                    { field: 'name', headerName: 'Cliente', flex: 1, minWidth: 180 },
                    { field: 'email', headerName: 'Email', flex: 1.1, minWidth: 220 },
                    { field: 'phone', headerName: 'Teléfono', flex: 0.8, minWidth: 140 },
                    { field: 'company', headerName: 'Empresa', flex: 0.9, minWidth: 160 },
                    { field: 'status', headerName: 'Estado', flex: 0.7, minWidth: 140 },
                  ]}
                  onRowClick={(params) => setSelectedId(params.row.id)}
                  pageSizeOptions={[8, 12]}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card sx={{ borderRadius: 5, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Typography variant="h5">{selected?.name}</Typography>
                <Typography color="text.secondary">{selected?.email}</Typography>
                <Typography color="text.secondary">{selected?.phone}</Typography>
                <Typography color="text.secondary">
                  {selected?.company || 'Consumidor final'} · {selected?.location}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {selected?.tags.map((tag) => (
                    <Chip key={tag} label={tag} color="primary" variant="outlined" />
                  ))}
                </Stack>
                <Typography variant="h6" sx={{ pt: 1 }}>
                  Historial de reservas
                </Typography>
                {customerReservations.map((reservation) => (
                  <Card key={reservation.id} sx={{ borderRadius: 4 }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Typography fontWeight={700}>{reservation.number}</Typography>
                      <Typography color="text.secondary" variant="body2">
                        {reservation.status} · {new Date(reservation.createdAt).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default CustomersPage
