import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded'
import HeadsetMicRoundedIcon from '@mui/icons-material/HeadsetMicRounded'
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppStore } from '../../app/store'
import TechShowcaseCanvas from '../../components/3d/TechShowcaseCanvas'
import SectionHeading from '../../components/common/SectionHeading'
import ProductCard from '../../components/ecommerce/ProductCard'

function HomePage() {
  const products = useAppStore((state) => state.products)
  const categories = useAppStore((state) => state.categories)
  const testimonials = useAppStore((state) => state.testimonials)
  const faqItems = useAppStore((state) => state.faqItems)
  const featuredBrands = useAppStore((state) => state.featuredBrands)
  const settings = useAppStore((state) => state.settings)

  const featuredProducts = products.filter((product) => product.featured).slice(0, 4)

  return (
    <Box>
      <Container maxWidth="xl" className="section-padding">
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, lg: 6 }}>
            <Stack spacing={3}>
              <Chip label="Retail tecnológico premium" color="primary" sx={{ alignSelf: 'flex-start' }} />
              <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '4.8rem' } }}>
                Computadoras de alto valor que se <span className="text-gradient">reservan con confianza.</span>
              </Typography>
              <Typography color="text.secondary" maxWidth={620} fontSize="1.08rem">
                Showroom digital para laptops, workstations, desktops y monitores con
                especificaciones claras, comparador técnico y flujo profesional de reserva o
                cotización sin pago en línea.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button component={Link} to="/catalogo" variant="contained" size="large" endIcon={<ArrowForwardRoundedIcon />}>
                  Explorar catálogo
                </Button>
                <Button component={Link} to="/contacto" variant="outlined" size="large">
                  Solicitar asesoría
                </Button>
              </Stack>
              <Stack direction="row" spacing={1.2} flexWrap="wrap" useFlexGap>
                {['Gaming', 'Workstations', 'Empresa', 'Monitores premium'].map((item) => (
                  <Chip key={item} label={item} variant="outlined" />
                ))}
              </Stack>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TechShowcaseCanvas />
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="xl" className="section-padding">
        <SectionHeading
          eyebrow="Categorías clave"
          title="Explora por necesidad real, no por catálogo genérico"
          description="Cada bloque está pensado para mostrar intención comercial: rendimiento, movilidad, productividad, gaming y setups premium."
        />
        <Grid container spacing={2.5}>
          {categories.map((category) => (
            <Grid key={category.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card sx={{ borderRadius: 5, height: '100%' }}>
                <CardContent sx={{ p: 3.2 }}>
                  <Stack spacing={2}>
                    <Typography variant="h5">{category.label}</Typography>
                    <Typography color="text.secondary">{category.description}</Typography>
                    <Button
                      component={Link}
                      to={`/catalogo?categoria=${category.id}`}
                      variant="text"
                      endIcon={<ArrowForwardRoundedIcon />}
                      sx={{ alignSelf: 'flex-start', px: 0 }}
                    >
                      Ver equipos
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="xl" className="section-padding">
        <SectionHeading
          eyebrow="Productos destacados"
          title="Selección curada para cerrar ventas más rápido"
          description="Equipos con alto valor percibido, fichas técnicas fuertes y una estética lista para propuesta comercial."
        />
        <Grid container spacing={3}>
          {featuredProducts.map((product) => (
            <Grid key={product.id} size={{ xs: 12, md: 6 }}>
              <ProductCard product={product} view="list" />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="xl" className="section-padding">
        <Grid container spacing={3}>
          {[
            ['Garantía y respaldo', 'Cobertura clara por producto y soporte consultivo.', <ShieldRoundedIcon key="shield" color="primary" />],
            ['Reserva sin pago en línea', 'Flujo profesional para cotizar o apartar sin fricción.', <BoltRoundedIcon key="bolt" color="primary" />],
            ['Atención corporativa', 'Acompañamiento para compras empresariales y setups completos.', <BusinessCenterRoundedIcon key="biz" color="primary" />],
            ['Soporte humano', 'Seguimiento multicanal con atención personalizada.', <HeadsetMicRoundedIcon key="headset" color="primary" />],
          ].map(([title, text, icon]) => (
            <Grid key={title} size={{ xs: 12, sm: 6, lg: 3 }}>
              <Card sx={{ borderRadius: 5, height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    {icon}
                    <Typography variant="h6">{title}</Typography>
                    <Typography color="text.secondary">{text}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="xl" className="section-padding">
        <SectionHeading eyebrow="Marcas" title="Partners y marcas destacadas" />
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 1800 }}
          loop
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 2.2 },
            768: { slidesPerView: 4.2 },
            1200: { slidesPerView: 6.2 },
          }}
        >
          {featuredBrands.map((brand) => (
            <SwiperSlide key={brand.id}>
              <Card sx={{ borderRadius: 5 }}>
                <CardContent sx={{ py: 4, textAlign: 'center' }}>
                  <Typography variant="h5">{brand.name}</Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      <Container maxWidth="xl" className="section-padding">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <SectionHeading eyebrow="Testimonios" title="Percepción premium que vende la propuesta" />
            <Stack spacing={2}>
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} sx={{ borderRadius: 5 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="body1">“{testimonial.quote}”</Typography>
                    <Typography sx={{ mt: 2 }} fontWeight={700}>
                      {testimonial.name}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {testimonial.company}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card
              sx={{
                borderRadius: 6,
                minHeight: '100%',
                p: { xs: 3, md: 4 },
                background:
                  'radial-gradient(circle at top right, rgba(123,97,255,0.24), transparent 26%), linear-gradient(180deg, #0f1c31, #09111e)',
              }}
            >
              <Stack spacing={3}>
                <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: 2 }}>
                  Promoción destacada
                </Typography>
                <Typography variant="h3">Bundles premium para setup completo</Typography>
                <Typography color="text.secondary">
                  Combina laptop o desktop con monitor, teclado y mouse en una sola solicitud
                  de reserva. Perfecto para propuestas B2B o clientes que valoran acompañamiento.
                </Typography>
                <Button component={Link} to="/catalogo" variant="contained" sx={{ alignSelf: 'flex-start' }}>
                  Ver bundles sugeridos
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="xl" className="section-padding">
        <SectionHeading eyebrow="FAQ" title="Preguntas frecuentes del flujo de reserva" />
        <Grid container spacing={3}>
          {faqItems.map((item) => (
            <Grid key={item.question} size={{ xs: 12, md: 4 }}>
              <Card sx={{ borderRadius: 5, height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 1.5 }}>
                    {item.question}
                  </Typography>
                  <Typography color="text.secondary">{item.answer}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="xl" sx={{ pb: 10 }}>
        <Card sx={{ borderRadius: 6 }}>
          <CardContent sx={{ p: { xs: 4, md: 6 } }}>
            <Grid container spacing={3} alignItems="center">
              <Grid size={{ xs: 12, md: 8 }}>
                <Typography variant="h3" sx={{ mb: 1.5 }}>
                  {settings.ctaLabel}
                </Typography>
                <Typography color="text.secondary" maxWidth={700}>
                  {settings.brandStory}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Stack direction={{ xs: 'column', sm: 'row', md: 'column' }} spacing={2}>
                  <Button component={Link} to="/checkout-reserva" variant="contained" size="large">
                    Iniciar solicitud
                  </Button>
                  <Button component={Link} to="/contacto" variant="outlined" size="large">
                    Hablar con asesor
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default HomePage
