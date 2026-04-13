import {
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useMemo, useState } from 'react'
import { useAppStore } from '../../app/store'
import { getStockStatus } from '../../features/products/selectors'

function InventoryPage() {
  const products = useAppStore((state) => state.products)
  const inventoryMovements = useAppStore((state) => state.inventoryMovements)
  const updateStock = useAppStore((state) => state.updateStock)
  const [form, setForm] = useState({
    productId: products[0]?.id || '',
    quantity: 1,
    type: 'Entrada',
    reason: 'Ajuste manual',
  })

  const rows = useMemo(
    () =>
      products.map((product) => ({
        id: product.id,
        name: product.name,
        stock: product.stock,
        minStock: product.minStock,
        status: getStockStatus(product.stock, product.minStock),
      })),
    [products],
  )

  const movementRows = inventoryMovements.map((movement) => ({
    id: movement.id,
    product: products.find((product) => product.id === movement.productId)?.name || movement.productId,
    type: movement.type,
    quantity: movement.quantity,
    reason: movement.reason,
    date: new Date(movement.date).toLocaleString(),
  }))

  return (
    <Stack spacing={3}>
      <Typography variant="h3">Inventario / stock</Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ borderRadius: 5 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Stock actual
              </Typography>
              <div className="dashboard-grid" style={{ height: 420 }}>
                <DataGrid
                  rows={rows}
                  columns={[
                    { field: 'name', headerName: 'Producto', flex: 1.2, minWidth: 220 },
                    { field: 'stock', headerName: 'Stock', flex: 0.5, minWidth: 110 },
                    { field: 'minStock', headerName: 'Stock mínimo', flex: 0.6, minWidth: 130 },
                    { field: 'status', headerName: 'Estado', flex: 0.6, minWidth: 130 },
                  ]}
                  pageSizeOptions={[8, 12]}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ borderRadius: 5 }}>
            <CardContent sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Typography variant="h6">Movimiento manual</Typography>
                <TextField
                  select
                  label="Producto"
                  value={form.productId}
                  onChange={(event) => setForm((current) => ({ ...current, productId: event.target.value }))}
                >
                  {products.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      {product.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  label="Tipo"
                  value={form.type}
                  onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))}
                >
                  <MenuItem value="Entrada">Entrada</MenuItem>
                  <MenuItem value="Salida">Salida</MenuItem>
                </TextField>
                <TextField
                  label="Cantidad"
                  type="number"
                  value={form.quantity}
                  onChange={(event) => setForm((current) => ({ ...current, quantity: Number(event.target.value) }))}
                />
                <TextField
                  label="Motivo"
                  value={form.reason}
                  onChange={(event) => setForm((current) => ({ ...current, reason: event.target.value }))}
                />
                <Button
                  variant="contained"
                  onClick={() => updateStock(form.productId, form.quantity, form.type, form.reason)}
                >
                  Registrar movimiento
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Card sx={{ borderRadius: 5 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Historial mock de movimientos
          </Typography>
          <div className="dashboard-grid" style={{ height: 320 }}>
            <DataGrid
              rows={movementRows}
              columns={[
                { field: 'product', headerName: 'Producto', flex: 1.1, minWidth: 220 },
                { field: 'type', headerName: 'Tipo', flex: 0.5, minWidth: 110 },
                { field: 'quantity', headerName: 'Cantidad', flex: 0.5, minWidth: 110 },
                { field: 'reason', headerName: 'Motivo', flex: 0.9, minWidth: 180 },
                { field: 'date', headerName: 'Fecha', flex: 0.9, minWidth: 180 },
              ]}
              pageSizeOptions={[6, 10]}
            />
          </div>
        </CardContent>
      </Card>
    </Stack>
  )
}

export default InventoryPage
