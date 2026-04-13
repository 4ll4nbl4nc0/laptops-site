import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded'
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useAppStore } from '../../app/store'
import AppBreadcrumbs from '../../components/common/AppBreadcrumbs'
import EmptyState from '../../components/common/EmptyState'
import { formatCurrency } from '../../utils/format'

const compareFields = [
  ['Precio', (product) => formatCurrency(product.promoPrice || product.price)],
  ['Procesador', (product) => product.technicalSpecs.processor],
  ['RAM', (product) => product.technicalSpecs.ram],
  ['Almacenamiento', (product) => product.technicalSpecs.storage],
  ['GPU', (product) => product.technicalSpecs.gpu],
  ['Pantalla', (product) => product.technicalSpecs.display],
  ['Resolución', (product) => product.technicalSpecs.resolution],
  ['Conectividad', (product) => product.technicalSpecs.connectivity],
  ['Puertos', (product) => product.technicalSpecs.ports],
  ['Batería', (product) => product.technicalSpecs.battery],
  ['Peso', (product) => product.technicalSpecs.weight],
  ['Garantía', (product) => product.technicalSpecs.warranty],
]

function ComparePage() {
  const compare = useAppStore((state) => state.compare)
  const products = useAppStore((state) => state.products)
  const removeFromCompare = useAppStore((state) => state.removeFromCompare)
  const addToReservationCart = useAppStore((state) => state.addToReservationCart)

  const comparedProducts = useMemo(
    () => compare.map((id) => products.find((product) => product.id === id)).filter(Boolean),
    [compare, products],
  )

  if (comparedProducts.length === 0) {
    return (
      <Container maxWidth="lg" className="section-padding">
        <EmptyState
          title="Aún no has agregado productos al comparador"
          description="Desde el catálogo o el detalle puedes comparar hasta cuatro equipos para evaluar hardware, precio y disponibilidad."
          actionLabel="Ir al catálogo"
          onAction={() => (window.location.href = '/catalogo')}
        />
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" className="section-padding">
      <AppBreadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Comparador' }]} />
      <Typography variant="h3" sx={{ mb: 3 }}>
        Comparador de hardware
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {comparedProducts.map((product) => (
          <Grid key={product.id} size={{ xs: 12, md: 6, lg: 3 }}>
            <Card sx={{ borderRadius: 5, height: '100%' }}>
              <Box component="img" src={product.visuals[0]} alt={product.name} sx={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover' }} />
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography color="text.secondary">{formatCurrency(product.promoPrice || product.price)}</Typography>
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<Inventory2RoundedIcon />}
                      onClick={() => addToReservationCart(product.id)}
                    >
                      Reservar
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<DeleteOutlineRoundedIcon />}
                      onClick={() => removeFromCompare(product.id)}
                    >
                      Remover
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ borderRadius: 5, overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Especificación</TableCell>
              {comparedProducts.map((product) => (
                <TableCell key={product.id}>{product.shortName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {compareFields.map(([label, getter]) => (
              <TableRow key={label}>
                <TableCell sx={{ fontWeight: 700 }}>{label}</TableCell>
                {comparedProducts.map((product) => (
                  <TableCell key={`${product.id}-${label}`}>{getter(product)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Container>
  )
}

export default ComparePage
