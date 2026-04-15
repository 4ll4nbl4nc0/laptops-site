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
  CardMedia,
  Chip,
  Container,
  Grid,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppStore } from '../../app/store'
import MotionReveal from '../../components/common/MotionReveal'
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
  const heroProducts = featuredProducts.slice(0, 3)

  return (
    <Box>
      <Container maxWidth="xl" className="section-padding">
        <MotionReveal>
          <Card
            className="soft-light-card elevated-border"
            sx={{ borderRadius: { xs: 5, md: 8 }, overflow: 'hidden' }}
          >
            <Grid container spacing={0}>
              <Grid size={{ xs: 12, lg: 6.5 }}>
                <Box sx={{ p: { xs: 2.5, sm: 3.5, md: 5, lg: 6 } }}>
                  <Stack spacing={{ xs: 2.4, md: 3.2 }}>
                    <Chip
                      label="Showroom premium"
                      color="primary"
                      sx={{ alignSelf: 'flex-start' }}
                    />
                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: { xs: '2.45rem', sm: '3rem', md: '4.15rem', lg: '4.8rem' },
                        lineHeight: { xs: 1.05, md: 0.98 },
                        maxWidth: 760,
                      }}
                    >
                      Tecnología de alto nivel presentada con una experiencia más
                      <span className="text-gradient"> profesional, clara y atractiva.</span>
                    </Typography>
                    <Typography
                      color="text.secondary"
                      maxWidth={620}
                      fontSize={{ xs: '0.98rem', md: '1.08rem' }}
                    >
                      Una portada pensada para que laptops, workstations, monitores y accesorios
                      se vean mejor acomodados, más premium y listos para convertirse en una
                      propuesta comercial seria.
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <Button
                        component={Link}
                        to="/catalogo"
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForwardRoundedIcon />}
                      >
                        Explorar catálogo
                      </Button>
                      <Button component={Link} to="/contacto" variant="outlined" size="large">
                        Solicitar asesoría
                      </Button>
                    </Stack>
                    <Grid container spacing={1.4}>
                      {[
                        ['+40', 'equipos curados'],
                        ['24h', 'respuesta comercial'],
                        ['B2B', 'atención corporativa'],
                      ].map(([value, label]) => (
                        <Grid key={label} size={{ xs: 4 }}>
                          <Card
                            sx={{
                              borderRadius: 4,
                              background: 'rgba(255,255,255,0.7)',
                              minHeight: '100%',
                            }}
                          >
                            <CardContent sx={{ p: { xs: 1.6, sm: 2.2 } }}>
                              <Typography variant="h4" sx={{ fontSize: { xs: '1.4rem', sm: '2rem' } }}>
                                {value}
                              </Typography>
                              <Typography
                                color="text.secondary"
                                variant="body2"
                                sx={{ lineHeight: 1.3 }}
                              >
                                {label}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Stack>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, lg: 5.5 }}>
                <Box
                  sx={{
                    p: { xs: 2, sm: 2.5, md: 3.5 },
                    height: '100%',
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02))',
                  }}
                >
                  <Grid container spacing={2} sx={{ height: '100%' }}>
                    <Grid size={{ xs: 12 }}>
                      <Card
                        sx={{
                          borderRadius: 5,
                          overflow: 'hidden',
                          height: { xs: 220, sm: 280, md: 320 },
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={heroProducts[0]?.visuals?.[0]}
                          alt={heroProducts[0]?.name || 'Producto destacado'}
                          sx={{ height: '100%', objectFit: 'cover' }}
                        />
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Card
                        sx={{
                          borderRadius: 5,
                          overflow: 'hidden',
                          height: { xs: 180, sm: 220 },
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={heroProducts[1]?.visuals?.[0] || heroProducts[0]?.visuals?.[0]}
                          alt={heroProducts[1]?.name || 'Producto destacado'}
                          sx={{ height: '100%', objectFit: 'cover' }}
                        />
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Card
                        sx={{
                          borderRadius: 5,
                          height: { xs: 'auto', sm: 220 },
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          background:
                            'linear-gradient(180deg, rgba(47,127,121,0.1), rgba(234,122,90,0.08))',
                        }}
                      >
                        <CardContent sx={{ p: { xs: 2.2, sm: 3 } }}>
                          <Typography variant="overline" color="secondary.main">
                            Selección curada
                          </Typography>
                          <Typography variant="h5" sx={{ mt: 1, fontSize: { xs: '1.2rem', md: '1.45rem' } }}>
                            Equipos listos para propuesta comercial
                          </Typography>
                          <Typography color="text.secondary" sx={{ mt: 1.2 }}>
                            Una composición más ordenada ayuda a que el sitio se vea más serio y
                            mucho más presentable frente a cliente.
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </MotionReveal>
      </Container>

      <Container maxWidth="xl" className="section-padding">
        <Grid container spacing={{ xs: 3, md: 5 }} alignItems="start">
          <Grid size={{ xs: 12, lg: 6 }}>
            <MotionReveal>
              <SectionHeading
                eyebrow="Categorías clave"
                title="Una home mejor organizada vende mejor la propuesta"
                description="La experiencia de inicio ahora prioriza jerarquía, aire visual y una estructura más profesional para desktop y móvil."
              />
            </MotionReveal>
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <MotionReveal delay={0.08}>
              <Card className="dashboard-accent elevated-border" sx={{ borderRadius: 6 }}>
                <CardContent sx={{ p: 3.5 }}>
                  <Stack spacing={2.2}>
                    <Typography variant="h5">Qué mejora en esta portada</Typography>
                    <Divider />
                    {[
                      'Hero con mejor balance entre mensaje, CTA y producto',
                      'Composición responsive más limpia para móvil y desktop',
                      'Secciones con un ritmo visual más profesional',
                    ].map((item) => (
                      <Typography key={item} color="text.secondary">
                        {item}
                      </Typography>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </MotionReveal>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="xl" className="section-padding">
        <Grid container spacing={{ xs: 2, md: 2.5 }}>
          {categories.map((category) => (
            <Grid key={category.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <MotionReveal delay={0.04}>
                <Card
                  sx={{
                    borderRadius: 5,
                    height: '100%',
                    overflow: 'hidden',
                    transition: 'transform 220ms ease',
                    position: 'relative',
                    '&:hover': { transform: 'translateY(-4px)' },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={category.image}
                    alt={category.label}
                    sx={{ aspectRatio: { xs: '16 / 9', md: '16 / 10' }, objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(251,246,239,0.92) 100%)',
                    }}
                  />
                  <CardContent sx={{ p: { xs: 2.4, md: 3.2 } }}>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="h5">{category.label}</Typography>
                        <Typography variant="body2" color="primary.main" sx={{ mt: 0.6 }}>
                          Curado para ventas consultivas
                        </Typography>
                      </Box>
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
              </MotionReveal>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="xl" className="section-padding">
        <SectionHeading
          eyebrow="Productos destacados"
          title="Selección destacada con mejor presencia comercial"
          description="Los productos se presentan con más claridad, mejor lectura y una estructura más propia de un e-commerce profesional."
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
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {[
            ['Garantía y respaldo', 'Cobertura clara por producto y soporte consultivo.', <ShieldRoundedIcon key="shield" color="primary" />],
            ['Reserva sin pago en línea', 'Flujo profesional para cotizar o apartar sin fricción.', <BoltRoundedIcon key="bolt" color="primary" />],
            ['Atención corporativa', 'Acompañamiento para compras empresariales y setups completos.', <BusinessCenterRoundedIcon key="biz" color="primary" />],
            ['Soporte humano', 'Seguimiento multicanal con atención personalizada.', <HeadsetMicRoundedIcon key="headset" color="primary" />],
          ].map(([title, text, icon]) => (
            <Grid key={title} size={{ xs: 12, sm: 6, lg: 3 }}>
              <MotionReveal delay={0.05}>
                <Card className="soft-light-card elevated-border" sx={{ borderRadius: 5, height: '100%' }}>
                  <CardContent sx={{ p: { xs: 2.4, md: 3 } }}>
                    <Stack spacing={2}>
                      {icon}
                      <Typography variant="h6">{title}</Typography>
                      <Typography color="text.secondary">{text}</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </MotionReveal>
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
              <Card className="elevated-border" sx={{ borderRadius: 5, overflow: 'hidden' }}>
                <CardMedia
                  component="img"
                  image={brand.image}
                  alt={brand.name}
                  sx={{ aspectRatio: '16 / 10', objectFit: 'cover' }}
                />
                <CardContent sx={{ py: 3, textAlign: 'center' }}>
                  <Typography variant="h6">{brand.name}</Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      <Container maxWidth="xl" className="section-padding">
        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <SectionHeading eyebrow="Testimonios" title="Percepción premium que vende la propuesta" />
            <Stack spacing={2}>
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="elevated-border" sx={{ borderRadius: 5 }}>
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
              className="elevated-border"
              sx={{
                borderRadius: 6,
                minHeight: '100%',
                overflow: 'hidden',
                background:
                  'radial-gradient(circle at top right, rgba(234,122,90,0.16), transparent 28%), linear-gradient(180deg, #fffaf4, #f5ede2)',
              }}
            >
              <Grid container sx={{ minHeight: '100%' }}>
                <Grid size={{ xs: 12, md: 5 }}>
                  <CardMedia
                    component="img"
                    image={settings.promoVisual}
                    alt="Bundles premium"
                    sx={{
                      height: '100%',
                      minHeight: { xs: 220, md: '100%' },
                      objectFit: 'cover',
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 7 }}>
                  <Stack
                    spacing={3}
                    sx={{ p: { xs: 3, md: 4 }, height: '100%', justifyContent: 'center' }}
                  >
                    <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: 2 }}>
                      Promoción destacada
                    </Typography>
                    <Typography variant="h3">Bundles premium para setup completo</Typography>
                    <Typography color="text.secondary">
                      Combina laptop o desktop con monitor, teclado y mouse en una sola
                      solicitud de reserva. Perfecto para propuestas B2B o clientes que valoran
                      acompañamiento.
                    </Typography>
                    <Button
                      component={Link}
                      to="/catalogo"
                      variant="contained"
                      sx={{ alignSelf: 'flex-start' }}
                    >
                      Ver bundles sugeridos
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="xl" className="section-padding">
        <SectionHeading eyebrow="FAQ" title="Preguntas frecuentes del flujo de reserva" />
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {faqItems.map((item) => (
            <Grid key={item.question} size={{ xs: 12, md: 4 }}>
              <Card sx={{ borderRadius: 5, height: '100%' }}>
                <CardContent sx={{ p: { xs: 2.4, md: 3 } }}>
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
        <Card className="soft-light-card elevated-border" sx={{ borderRadius: 7 }}>
          <CardContent sx={{ p: { xs: 3, md: 6 } }}>
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
