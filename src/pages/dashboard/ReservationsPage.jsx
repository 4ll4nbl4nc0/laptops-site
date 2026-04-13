import {
  Box,
  Button,
  Card,
  CardContent,
  Drawer,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useMemo, useState } from 'react'
import { useAppStore } from '../../app/store'

const statusOptions = ['Pendiente', 'Contactado', 'Confirmado', 'Cancelado', 'Completado']

function ReservationsPage() {
  const reservations = useAppStore((state) => state.reservations)
  const updateReservationStatus = useAppStore((state) => state.updateReservationStatus)
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedId, setSelectedId] = useState(null)

  const rows = useMemo(
    () =>
      reservations
        .filter((reservation) => !statusFilter || reservation.status === statusFilter)
        .map((reservation) => ({
          id: reservation.id,
          number: reservation.number,
          customer: reservation.customerName,
          status: reservation.status,
          total: reservation.total,
          province: reservation.province,
          createdAt: new Date(reservation.createdAt).toLocaleDateString(),
          raw: reservation,
        })),
    [reservations, statusFilter],
  )

  const selected = reservations.find((reservation) => reservation.id === selectedId)

  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
        <Box>
          <Typography variant="h3">Reservas / solicitudes</Typography>
          <Typography color="text.secondary">
            Módulo central del prototipo para seguimiento comercial.
          </Typography>
        </Box>
        <TextField
          select
          sx={{ minWidth: 240 }}
          label="Filtrar por estado"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <MenuItem value="">Todos</MenuItem>
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Card sx={{ borderRadius: 5 }}>
        <CardContent sx={{ p: 3 }}>
          <div className="dashboard-grid" style={{ height: 580 }}>
            <DataGrid
              rows={rows}
              columns={[
                { field: 'number', headerName: 'Reserva', flex: 0.9, minWidth: 160 },
                { field: 'customer', headerName: 'Cliente', flex: 1, minWidth: 180 },
                { field: 'status', headerName: 'Estado', flex: 0.7, minWidth: 130 },
                { field: 'province', headerName: 'Provincia', flex: 0.7, minWidth: 130 },
                { field: 'createdAt', headerName: 'Fecha', flex: 0.7, minWidth: 130 },
                {
                  field: 'actions',
                  headerName: 'Detalle',
                  minWidth: 120,
                  renderCell: (params) => (
                    <Button size="small" onClick={() => setSelectedId(params.row.id)}>
                      Abrir
                    </Button>
                  ),
                },
              ]}
              pageSizeOptions={[8, 12]}
            />
          </div>
        </CardContent>
      </Card>

      <Drawer anchor="right" open={Boolean(selected)} onClose={() => setSelectedId(null)}>
        <Stack spacing={2} sx={{ width: 380, p: 3 }}>
          <Typography variant="h5">{selected?.number}</Typography>
          <Typography color="text.secondary">{selected?.customerName}</Typography>
          <TextField
            select
            label="Estado"
            value={selected?.status || ''}
            onChange={(event) =>
              updateReservationStatus(selected.id, event.target.value, selected.notes)
            }
          >
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
          <Typography variant="subtitle1">Timeline mock</Typography>
          {selected?.timeline.map((item, index) => (
            <Card key={`${item}-${index}`} sx={{ borderRadius: 4 }}>
              <CardContent sx={{ p: 2 }}>
                <Typography>{item}</Typography>
              </CardContent>
            </Card>
          ))}
          <TextField
            label="Notas internas"
            multiline
            minRows={4}
            value={selected?.notes || ''}
            onChange={(event) =>
              updateReservationStatus(selected.id, selected.status, event.target.value)
            }
          />
        </Stack>
      </Drawer>
    </Stack>
  )
}

export default ReservationsPage
