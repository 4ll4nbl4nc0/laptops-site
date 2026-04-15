import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'
import SortRoundedIcon from '@mui/icons-material/SortRounded'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Drawer,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCatalogProducts } from '../../app/store'
import AppBreadcrumbs from '../../components/common/AppBreadcrumbs'
import MotionReveal from '../../components/common/MotionReveal'
import SectionHeading from '../../components/common/SectionHeading'
import FiltersPanel from '../../components/ecommerce/FiltersPanel'
import ProductCard from '../../components/ecommerce/ProductCard'

const useCaseLabelMap = {
  gaming: 'Gaming',
  office: 'Oficina',
  creator: 'Diseño y edición',
  business: 'Empresarial',
}

const initialFilters = {
  category: [],
  brand: [],
  os: [],
  useCase: [],
  ram: [],
  storage: [],
  processor: [],
  gpu: [],
  screen: [],
  resolution: [],
  condition: [],
  availability: false,
  price: [0, 4000],
  view: 'grid',
}

function CatalogPage() {
  const products = useCatalogProducts()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [searchParams] = useSearchParams()
  const preselectedCategory = searchParams.get('categoria')
  const [openFilters, setOpenFilters] = useState(false)
  const [sort, setSort] = useState('popular')
  const [visibleCount, setVisibleCount] = useState(12)
  const [filters, setFilters] = useState(() => ({
    ...initialFilters,
    category: preselectedCategory ? [preselectedCategory] : [],
  }))

  const availableFilters = useMemo(
    () => ({
      category: [...new Set(products.map((product) => product.category))],
      brand: [...new Set(products.map((product) => product.brand))],
      os: [...new Set(products.map((product) => product.technicalSpecs.os).filter(Boolean))],
      useCase: [...new Set(products.map((product) => product.useCase).filter(Boolean))],
      ram: [...new Set(products.map((product) => product.technicalSpecs.ram).filter(Boolean))],
      storage: [...new Set(products.map((product) => product.technicalSpecs.storage).filter(Boolean))],
      processor: [...new Set(products.map((product) => product.technicalSpecs.processor).filter(Boolean))].slice(0, 10),
      gpu: [...new Set(products.map((product) => product.technicalSpecs.gpu).filter(Boolean))].slice(0, 10),
      screen: [...new Set(products.map((product) => product.technicalSpecs.display).filter(Boolean))].slice(0, 10),
      resolution: [...new Set(products.map((product) => product.technicalSpecs.resolution).filter(Boolean))].slice(0, 10),
      condition: [...new Set(products.map((product) => product.condition))],
    }),
    [products],
  )

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const price = product.promoPrice || product.price
      const conditions = [
        filters.category.length === 0 || filters.category.includes(product.category),
        filters.brand.length === 0 || filters.brand.includes(product.brand),
        filters.os.length === 0 || filters.os.includes(product.technicalSpecs.os),
        filters.useCase.length === 0 || filters.useCase.includes(product.useCase),
        filters.ram.length === 0 || filters.ram.includes(product.technicalSpecs.ram),
        filters.storage.length === 0 || filters.storage.includes(product.technicalSpecs.storage),
        filters.processor.length === 0 || filters.processor.includes(product.technicalSpecs.processor),
        filters.gpu.length === 0 || filters.gpu.includes(product.technicalSpecs.gpu),
        filters.screen.length === 0 || filters.screen.includes(product.technicalSpecs.display),
        filters.resolution.length === 0 || filters.resolution.includes(product.technicalSpecs.resolution),
        filters.condition.length === 0 || filters.condition.includes(product.condition),
        price >= filters.price[0] && price <= filters.price[1],
        !filters.availability || product.stock > 0,
      ]

      return conditions.every(Boolean)
    })

    const sorters = {
      priceAsc: (a, b) => (a.promoPrice || a.price) - (b.promoPrice || b.price),
      priceDesc: (a, b) => (b.promoPrice || b.price) - (a.promoPrice || a.price),
      rating: (a, b) => b.rating - a.rating,
      newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      popular: (a, b) => b.views - a.views,
    }

    return [...result].sort(sorters[sort])
  }, [filters, products, sort])

  const appliedFilters = [
    ...filters.category.map((value) => ({ key: 'category', value })),
    ...filters.brand.map((value) => ({ key: 'brand', value })),
    ...filters.os.map((value) => ({ key: 'os', value })),
    ...filters.useCase.map((value) => ({ key: 'useCase', value })),
    ...filters.ram.map((value) => ({ key: 'ram', value })),
    ...filters.storage.map((value) => ({ key: 'storage', value })),
    ...filters.processor.map((value) => ({ key: 'processor', value })),
    ...filters.gpu.map((value) => ({ key: 'gpu', value })),
    ...filters.screen.map((value) => ({ key: 'screen', value })),
    ...filters.resolution.map((value) => ({ key: 'resolution', value })),
    ...filters.condition.map((value) => ({ key: 'condition', value })),
    ...(filters.availability ? [{ key: 'availability', value: 'Disponibilidad inmediata' }] : []),
  ]

  const removeAppliedFilter = (key, value) => {
    setFilters((current) => {
      if (key === 'availability') {
        return { ...current, availability: false }
      }

      return {
        ...current,
        [key]: current[key].filter((item) => item !== value),
      }
    })
  }

  const panel = <FiltersPanel filters={filters} setFilters={setFilters} availableFilters={availableFilters} />

  return (
    <Container maxWidth="xl" className="section-padding">
      <AppBreadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Catálogo' }]} />
      <MotionReveal>
        <Card className="soft-light-card elevated-border" sx={{ borderRadius: '28px', mb: 4 }}>
          <CardContent sx={{ p: { xs: 3, md: 4.5 } }}>
            <Grid container spacing={3} alignItems="end">
              <Grid size={{ xs: 12, lg: 8 }}>
                <SectionHeading
                  eyebrow="Storefront"
                  title="Catálogo premium de computadoras y setups"
                  description="Más ordenado, más editorial y más vendible: una experiencia de catálogo pensada para presentar producto con mejor percepción de valor."
                />

                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Typography color="text.secondary">{filteredProducts.length} resultados</Typography>
                  {appliedFilters.slice(0, 6).map((item) => (
                    <Chip
                      key={`${item.key}-${item.value}`}
                      size="small"
                      label={item.key === 'useCase' ? useCaseLabelMap[item.value] || item.value : item.value}
                      color="primary"
                      variant="outlined"
                      onDelete={() => removeAppliedFilter(item.key, item.value)}
                    />
                  ))}
                  {appliedFilters.length > 6 ? (
                    <Chip size="small" label={`+${appliedFilters.length - 6} filtros`} variant="outlined" />
                  ) : null}
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, lg: 4 }}>
                <Stack direction="row" spacing={1.5} justifyContent={{ xs: 'flex-start', lg: 'flex-end' }}>
                  {isMobile && (
                    <Button variant="outlined" startIcon={<FilterListRoundedIcon />} onClick={() => setOpenFilters(true)}>
                      Filtros
                    </Button>
                  )}
                  <FormControl size="small" sx={{ minWidth: 220 }}>
                    <InputLabel>Ordenar</InputLabel>
                    <Select
                      value={sort}
                      label="Ordenar"
                      onChange={(event) => setSort(event.target.value)}
                      startAdornment={<SortRoundedIcon sx={{ mr: 1 }} />}
                    >
                      <MenuItem value="popular">Más populares</MenuItem>
                      <MenuItem value="rating">Mejor valorados</MenuItem>
                      <MenuItem value="newest">Más nuevos</MenuItem>
                      <MenuItem value="priceAsc">Precio ascendente</MenuItem>
                      <MenuItem value="priceDesc">Precio descendente</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </MotionReveal>

      <Grid container spacing={3}>
        {!isMobile && (
          <Grid size={{ md: 4, lg: 3 }}>
            <Card sx={{ borderRadius: '24px', position: 'sticky', top: 116, background: 'rgba(255,253,249,0.9)' }}>
              <CardContent sx={{ p: 3 }}>{panel}</CardContent>
            </Card>
          </Grid>
        )}
        <Grid size={{ xs: 12, md: 8, lg: 9 }}>
          <Grid container spacing={3}>
            {filteredProducts.slice(0, visibleCount).map((product) => (
              <Grid
                key={product.id}
                size={{
                  xs: 12,
                  sm: filters.view === 'list' ? 12 : 6,
                  xl: filters.view === 'list' ? 12 : 4,
                }}
              >
                <ProductCard product={product} view={filters.view} />
              </Grid>
            ))}
          </Grid>

          <Card sx={{ borderRadius: '24px', mt: 4 }} className="dashboard-accent">
            <CardContent sx={{ p: 3 }}>
              <Stack spacing={1.5}>
                <Typography variant="h6">Catálogo más ordenado y presentable</Typography>
                <Typography color="text.secondary">
                  La estructura visual ahora da más aire al producto, mejora la lectura de precio
                  y hace que la navegación entre filtros, resultados y acciones se sienta más
                  propia de un e-commerce comercial.
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          {visibleCount < filteredProducts.length ? (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button variant="contained" onClick={() => setVisibleCount((current) => current + 6)}>
                Cargar más equipos
              </Button>
            </Box>
          ) : null}
        </Grid>
      </Grid>

      <Drawer anchor="left" open={openFilters} onClose={() => setOpenFilters(false)}>
        <Box sx={{ width: 320, p: 3 }}>{panel}</Box>
      </Drawer>
    </Container>
  )
}

export default CatalogPage
