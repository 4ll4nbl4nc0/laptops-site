import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded'
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded'
import RequestQuoteRoundedIcon from '@mui/icons-material/RequestQuoteRounded'
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded'
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
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
import MotionReveal from '../../components/common/MotionReveal'
import ProductSpecsTable from '../../components/ecommerce/ProductSpecsTable'
import ProductCard from '../../components/ecommerce/ProductCard'
import { useAppSnackbar } from '../../context/useAppSnackbar'
import { formatCurrency } from '../../utils/format'

const trustHighlights = [
  ['Curado por asesores', 'Selección pensada para rendimiento, imagen y propuesta de valor.'],
  ['Reserva asistida', 'Un asesor confirma disponibilidad, tiempos y opciones recomendadas.'],
  ['Entrega coordinada', 'Atención personalizada para empresas, setups completos y clientes premium.'],
]

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

      <MotionReveal>
        <Card className="soft-light-card elevated-border" sx={{ borderRadius: 8, overflow: 'hidden' }}>
          <Grid container spacing={0}>
            <Grid size={{ xs: 12, lg: 7 }}>
              <Box sx={{ p: { xs: 3, md: 4 } }}>
                <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 2600 }} pagination>
                  {product.visuals.map((visual, index) => (
                    <SwiperSlide key={`${product.id}-${index}`}>
                      <Box
                        component="img"
                        src={visual}
                        alt={product.name}
                        sx={{
                          width: '100%',
                          aspectRatio: '16 / 11',
                          objectFit: 'cover',
                          borderRadius: 6,
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, lg: 5 }}>
              <Box
                sx={{
                  p: { xs: 3, md: 4 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.26), rgba(255,255,255,0.04))',
                }}
              >
                <Stack spacing={2.4}>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {product.badges.map((badge) => (
                      <Chip key={badge} label={badge} color="primary" variant="outlined" />
                    ))}
                  </Stack>

                  <Box>
                    <Typography color="text.secondary">
                      {product.brand} · SKU {product.sku}
                    </Typography>
                    <Typography variant="h2" sx={{ mt: 1, fontSize: { xs: '2.2rem', md: '3rem' } }}>
                      {product.name}
                    </Typography>
                  </Box>

                  <Typography color="text.secondary">{product.description}</Typography>

                  <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
                    <Typography variant="h3">
                      {formatCurrency(product.promoPrice || product.price)}
                    </Typography>
                    {product.promoPrice ? (
                      <Typography color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                        {formatCurrency(product.price)}
                      </Typography>
                    ) : null}
                    <Chip label={`${product.rating}/5`} color="secondary" variant="outlined" />
                  </Stack>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {product.highlights.map((item) => (
                      <Chip key={item} label={item} />
                    ))}
                  </Stack>

                  <Grid container spacing={1.5}>
                    {[
                      ['Vistas', product.views],
                      ['Reservas', product.reservationCount],
                      ['Stock', product.stock],
                    ].map(([label, value]) => (
                      <Grid key={label} size={{ xs: 4 }}>
                        <Card sx={{ borderRadius: 4, background: 'rgba(255,255,255,0.66)' }}>
                          <CardContent sx={{ p: 2 }}>
                            <Typography variant="caption" color="text.secondary">
                              {label}
                            </Typography>
                            <Typography variant="h5" sx={{ mt: 0.5 }}>
                              {value}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  <Divider />

                  <Stack spacing={1.2}>
                    <Stack direction="row" spacing={1.2} alignItems="center">
                      <WorkspacePremiumRoundedIcon color="primary" />
                      <Typography color="text.secondary">
                        Garantía {product.technicalSpecs.warranty} y acompañamiento consultivo.
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1.2} alignItems="center">
                      <LocalShippingRoundedIcon color="secondary" />
                      <Typography color="text.secondary">
                        Coordinación personalizada para entrega, retiro o propuesta empresarial.
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ pt: 1 }}>
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
                    <Button
                      component={Link}
                      to="/checkout-reserva"
                      variant="outlined"
                      size="large"
                      startIcon={<RequestQuoteRoundedIcon />}
                    >
                      Solicitar cotización
                    </Button>
                  </Stack>

                  <Stack direction="row" spacing={1}>
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
              </Box>
            </Grid>
          </Grid>
        </Card>
      </MotionReveal>

      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        {trustHighlights.map(([title, text], index) => (
          <Grid key={title} size={{ xs: 12, md: 4 }}>
            <MotionReveal delay={index * 0.06}>
              <Card sx={{ borderRadius: 5, height: '100%', background: 'rgba(255,255,255,0.72)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={1.2}>
                    <Typography variant="h6">{title}</Typography>
                    <Typography color="text.secondary">{text}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </MotionReveal>
          </Grid>
        ))}
      </Grid>

      <Card className="soft-light-card elevated-border" sx={{ borderRadius: 6, mt: 5 }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="scrollable">
            <Tab label="Descripción" />
            <Tab label="Especificaciones" />
            <Tab label="Reseñas" />
            <Tab label="Garantía" />
          </Tabs>
          <Box sx={{ pt: 3 }}>
            {tab === 0 && (
              <Stack spacing={2}>
                <Typography color="text.secondary">{product.description}</Typography>
                <Typography color="text.secondary">
                  Este equipo está pensado para clientes que valoran tanto la ficha técnica como la
                  percepción general del producto: materiales, presencia visual, rendimiento y una
                  experiencia de compra más acompañada.
                </Typography>
              </Stack>
            )}
            {tab === 1 && <ProductSpecsTable specs={product.technicalSpecs} />}
            {tab === 2 && (
              <Stack spacing={2}>
                {product.reviews.map((review) => (
                  <Card key={review.author} sx={{ borderRadius: 4, background: 'rgba(255,255,255,0.72)' }}>
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
                  {product.technicalSpecs.warranty} de garantía con atención personalizada para
                  disponibilidad, configuración, propuesta comercial y soporte posterior.
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
