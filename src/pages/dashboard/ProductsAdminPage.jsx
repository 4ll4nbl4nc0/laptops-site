import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppStore } from '../../app/store'
import { useAppSnackbar } from '../../context/useAppSnackbar'
import { formatCurrency, slugify } from '../../utils/format'
import { createProductVisual } from '../../utils/productVisuals'

const emptyProduct = {
  name: '',
  brand: '',
  category: '',
  subcategory: '',
  price: '',
  promoPrice: '',
  stock: '',
  description: '',
  processor: '',
  ram: '',
  storage: '',
  gpu: '',
  display: '',
  resolution: '',
  os: 'Windows 11 Pro',
  connectivity: '',
  ports: '',
  battery: '',
  weight: '',
  color: '',
  warranty: '1 año',
}

function ProductFormDialog({ open, onClose, initialData, onSubmit }) {
  const [form, setForm] = useState(initialData || emptyProduct)

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{initialData?.id ? 'Editar producto' : 'Crear producto'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ pt: 1 }}>
          {Object.entries(emptyProduct).map(([key, value]) => (
            <Grid key={key} size={{ xs: 12, md: ['description'].includes(key) ? 12 : 6 }}>
              <TextField
                fullWidth
                multiline={key === 'description'}
                minRows={key === 'description' ? 4 : 1}
                label={key}
                value={form[key] ?? value}
                onChange={(event) =>
                  setForm((current) => ({ ...current, [key]: event.target.value }))
                }
              />
            </Grid>
          ))}
          <Grid size={{ xs: 12 }}>
            <Button
              variant="contained"
              onClick={() =>
                onSubmit({
                  ...initialData,
                  ...form,
                  slug: slugify(form.name),
                  sku: initialData?.sku || `AST-${Date.now()}`,
                  rating: initialData?.rating || 4.6,
                  featured: initialData?.featured || false,
                  status: initialData?.status || 'active',
                  minStock: initialData?.minStock || 3,
                  condition: initialData?.condition || 'Nuevo',
                  tags: initialData?.tags || [form.category],
                  badges: initialData?.badges || [form.brand],
                  useCase: initialData?.useCase || 'business',
                  highlights: initialData?.highlights || ['Premium', 'Reserva'],
                  views: initialData?.views || 120,
                  reservationCount: initialData?.reservationCount || 0,
                  visuals: initialData?.visuals || [
                    createProductVisual(form.name, form.category || 'Nuevo Producto', 'gaming'),
                  ],
                  specsSummary: [form.processor, form.ram, form.storage, form.gpu, form.display],
                  technicalSpecs: {
                    processor: form.processor,
                    ram: form.ram,
                    storage: form.storage,
                    gpu: form.gpu,
                    display: form.display,
                    resolution: form.resolution,
                    os: form.os,
                    connectivity: form.connectivity,
                    ports: form.ports,
                    battery: form.battery,
                    weight: form.weight,
                    color: form.color,
                    warranty: form.warranty,
                  },
                  createdAt: initialData?.createdAt || new Date().toISOString(),
                })
              }
            >
              Guardar producto
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

function ProductsAdminPage() {
  const products = useAppStore((state) => state.products)
  const upsertProduct = useAppStore((state) => state.upsertProduct)
  const deleteProduct = useAppStore((state) => state.deleteProduct)
  const { notify } = useAppSnackbar()
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState(null)
  const [open, setOpen] = useState(false)

  const rows = useMemo(
    () =>
      products
        .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
        .map((product) => ({
          id: product.id,
          name: product.name,
          brand: product.brand,
          category: product.category,
          stock: product.stock,
          status: product.status,
          price: formatCurrency(product.promoPrice || product.price),
          raw: product,
        })),
    [products, search],
  )

  const columns = [
    { field: 'name', headerName: 'Nombre', flex: 1.3, minWidth: 220 },
    { field: 'brand', headerName: 'Marca', flex: 0.8, minWidth: 120 },
    { field: 'category', headerName: 'Categoría', flex: 0.8, minWidth: 140 },
    { field: 'price', headerName: 'Precio', flex: 0.7, minWidth: 120 },
    { field: 'stock', headerName: 'Stock', flex: 0.5, minWidth: 100 },
    { field: 'status', headerName: 'Estado', flex: 0.6, minWidth: 110 },
    {
      field: 'actions',
      headerName: 'Acciones',
      minWidth: 220,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            component={Link}
            to={`/producto/${params.row.raw.slug}`}
            startIcon={<VisibilityRoundedIcon />}
          >
            Ver
          </Button>
          <Button
            size="small"
            startIcon={<EditRoundedIcon />}
            onClick={() => {
              setEditing(params.row.raw)
              setOpen(true)
            }}
          >
            Editar
          </Button>
          <Button
            size="small"
            color="error"
            startIcon={<DeleteOutlineRoundedIcon />}
            onClick={() => {
              deleteProduct(params.row.id)
              notify('Producto eliminado del catálogo mock', 'info')
            }}
          >
            Eliminar
          </Button>
        </Stack>
      ),
    },
  ]

  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
        <Box>
          <Typography variant="h3">Gestión de productos</Typography>
          <Typography color="text.secondary">
            Administración del catálogo con persistencia local y foco en operación comercial.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() => {
            setEditing(null)
            setOpen(true)
          }}
        >
          Crear producto
        </Button>
      </Stack>
      <Card className="dashboard-panel" sx={{ borderRadius: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Stack spacing={2}>
            <TextField
              label="Buscar producto"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <Box className="dashboard-grid" sx={{ height: 620 }}>
              <DataGrid rows={rows} columns={columns} pageSizeOptions={[10, 20]} />
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {open ? (
        <ProductFormDialog
          key={editing?.id || 'new-product'}
          open={open}
          initialData={editing}
          onClose={() => setOpen(false)}
          onSubmit={(product) => {
            upsertProduct(product)
            notify('Producto guardado correctamente', 'success')
            setOpen(false)
          }}
        />
      ) : null}
    </Stack>
  )
}

export default ProductsAdminPage
