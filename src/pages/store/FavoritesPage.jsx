import { Container, Grid, Typography } from '@mui/material'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../app/store'
import AppBreadcrumbs from '../../components/common/AppBreadcrumbs'
import EmptyState from '../../components/common/EmptyState'
import ProductCard from '../../components/ecommerce/ProductCard'

function FavoritesPage() {
  const favorites = useAppStore((state) => state.favorites)
  const products = useAppStore((state) => state.products)
  const navigate = useNavigate()

  const favoriteProducts = useMemo(
    () => products.filter((product) => favorites.includes(product.id)),
    [favorites, products],
  )

  return (
    <Container maxWidth="xl" className="section-padding">
      <AppBreadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Favoritos' }]} />
      <Typography variant="h3" sx={{ mb: 3 }}>
        Favoritos
      </Typography>
      {favoriteProducts.length === 0 ? (
        <EmptyState
          title="No hay productos guardados"
          description="Guarda laptops, monitores o accesorios para revisarlos después o moverlos al carrito de reserva."
          actionLabel="Descubrir productos"
          onAction={() => navigate('/catalogo')}
        />
      ) : (
        <Grid container spacing={3}>
          {favoriteProducts.map((product) => (
            <Grid key={product.id} size={{ xs: 12, md: 6, xl: 4 }}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default FavoritesPage
