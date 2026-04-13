import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded'
import RequestQuoteRoundedIcon from '@mui/icons-material/RequestQuoteRounded'
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { useAppStore } from '../../app/store'
import AppBreadcrumbs from '../../components/common/AppBreadcrumbs'
import ProductSpecsTable from '../../components/ecommerce/ProductSpecsTable'
import ProductCard from '../../components/ecommerce/ProductCard'
import { useAppSnackbar } from '../../context/useAppSnackbar'
import { formatCurrency } from '../../utils/format'

function ProductDetailPage() {
  const { slug } = useParams()
  const products = useAppStore((state) => state.products)
  const addToReservationCart = useAppStore((state) => state.addToReservationCart)
  const addToCompare = useAppStore((state) => state.addToCompare)
  const toggleFavorite = useAppStore((state) => state.toggleFavorite)
  const { notify } = useAppSnackbar()
  const [tab, setTab] = useState(0)

  const product = products.find((item) => item.slug === slug) || products[0]
  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 3)
  const accessories = products
    .filter((item) => item.category === 'accessories')
    .slice(0, 2)

  return (
    <Container maxWidth="xl" className="section-padding">
      <AppBreadcrumbs
        items={[
          { label: 'Inicio', to: '/' },
          { label: 'Catálogo', to: '/catalogo' },
          { label: product.name },
        ]}
      />

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card sx={{ borderRadius: 6, overflow: 'hidden' }}>
            <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 2400 }} pagination>
              {product.visuals.map((visual, index) => (
                <SwiperSlide key={`${product.id}-${index}`}>
                  <Box component="img" src={visual} alt={product.name} sx={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover' }} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Stack spacing={2.2}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {product.badges.map((badge) => (
                <Chip key={badge} label={badge} color="primary" variant="outlined" />
              ))}
            </Stack>
            <Typography color="text.secondary">
              {product.brand} · SKU {product.sku}
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.3rem', md: '3.25rem' } }}>
              {product.name}
            </Typography>
            <Typography color="text.secondary">{product.description}</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h3">
                {formatCurrency(product.promoPrice || product.price)}
              </Typography>
              {product.promoPrice ? (
                <Typography color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                  {formatCurrency(product.price)}
                </Typography>
              ) : null}
            </Stack>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {product.highlights.map((item) => (
                <Chip key={item} label={item} />
              ))}
            </Stack>
            <ProductSpecsTable specs={product.technicalSpecs} />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Inventory2RoundedIcon />}
                onClick={() => {
                  addToReservationCart(product.id)
                  notify('Equipo agregado a la solicitud de reserva', 'success')
                }}
              >
                Reservar equipo
              </Button>
              <Button component={Link} to="/checkout-reserva" variant="outlined" size="large" startIcon={<RequestQuoteRoundedIcon />}>
                Solicitar cotización
              </Button>
              <Button
                variant="text"
                startIcon={<FavoriteBorderRoundedIcon />}
                onClick={() => {
                  toggleFavorite(product.id)
                  notify('Favoritos actualizados', 'info')
                }}
              >
                Favorito
              </Button>
              <Button
                variant="text"
                startIcon={<CompareArrowsRoundedIcon />}
                onClick={() => {
                  addToCompare(product.id)
                  notify('Producto agregado al comparador', 'info')
                }}
              >
                Comparar
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: 6, mt: 5 }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="scrollable">
            <Tab label="Descripción" />
            <Tab label="Especificaciones" />
            <Tab label="Reseñas" />
            <Tab label="Garantía" />
          </Tabs>
          <Box sx={{ pt: 3 }}>
            {tab === 0 && <Typography color="text.secondary">{product.description}</Typography>}
            {tab === 1 && <ProductSpecsTable specs={product.technicalSpecs} />}
            {tab === 2 && (
              <Stack spacing={2}>
                {product.reviews.map((review) => (
                  <Card key={review.author} sx={{ borderRadius: 4 }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Typography fontWeight={700}>{review.author}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {review.role} · {review.rating}/5
                      </Typography>
                      <Typography>{review.comment}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            )}
            {tab === 3 && (
              <Stack direction="row" spacing={1.5} alignItems="center">
                <VerifiedRoundedIcon color="primary" />
                <Typography color="text.secondary">
                  {product.technicalSpecs.warranty} de garantía. Atención personalizada para
                  disponibilidad, entrega, configuración y soporte.
                </Typography>
              </Stack>
            )}
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Productos relacionados
        </Typography>
        <Grid container spacing={3}>
          {relatedProducts.map((item) => (
            <Grid key={item.id} size={{ xs: 12, md: 4 }}>
              <ProductCard product={item} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Accesorios sugeridos
        </Typography>
        <Grid container spacing={3}>
          {accessories.map((item) => (
            <Grid key={item.id} size={{ xs: 12, md: 6 }}>
              <ProductCard product={item} view="list" />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default ProductDetailPage
