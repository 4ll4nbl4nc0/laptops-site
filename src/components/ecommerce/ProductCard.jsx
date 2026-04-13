import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded'
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppStore } from '../../app/store'
import { useAppSnackbar } from '../../context/useAppSnackbar'
import { getStockStatus } from '../../features/products/selectors'
import { formatCurrency } from '../../utils/format'

function ProductCard({ product, view = 'grid' }) {
  const favorites = useAppStore((state) => state.favorites)
  const toggleFavorite = useAppStore((state) => state.toggleFavorite)
  const addToReservationCart = useAppStore((state) => state.addToReservationCart)
  const addToCompare = useAppStore((state) => state.addToCompare)
  const { notify } = useAppSnackbar()
  const isFavorite = favorites.includes(product.id)

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 5,
        display: 'flex',
        flexDirection: view === 'list' ? { xs: 'column', md: 'row' } : 'column',
      }}
    >
      <CardMedia
        component="img"
        image={product.visuals[0]}
        alt={product.name}
        sx={{
          width: view === 'list' ? { xs: '100%', md: 340 } : '100%',
          aspectRatio: '4 / 3',
          objectFit: 'cover',
        }}
      />
      <CardContent sx={{ flex: 1, p: 3 }}>
        <Stack spacing={2.2} height="100%">
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {product.badges.slice(0, 2).map((badge) => (
              <Chip key={badge} label={badge} size="small" color="primary" variant="outlined" />
            ))}
            <Chip
              size="small"
              label={getStockStatus(product.stock, product.minStock)}
              color={product.stock <= product.minStock ? 'warning' : 'success'}
            />
          </Stack>

          <Box>
            <Typography color="text.secondary" variant="body2">
              {product.brand} · {product.subcategory}
            </Typography>
            <Typography variant="h5" sx={{ mt: 0.5 }}>
              {product.name}
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h5">{formatCurrency(product.promoPrice || product.price)}</Typography>
            {product.promoPrice ? (
              <Typography color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                {formatCurrency(product.price)}
              </Typography>
            ) : null}
          </Stack>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <StarRoundedIcon sx={{ color: '#fbbf24' }} />
            <Typography>{product.rating}</Typography>
            <Typography color="text.secondary">· {product.views} vistas</Typography>
            <Typography color="text.secondary">· stock {product.stock}</Typography>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {product.specsSummary.map((spec) => (
              <Chip key={spec} label={spec} size="small" variant="filled" className="metric-chip" />
            ))}
            <Chip
              label={product.technicalSpecs.os}
              size="small"
              variant="outlined"
              color="secondary"
            />
          </Stack>

          <Divider sx={{ my: 'auto' }} />

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Button
              variant="contained"
              startIcon={<Inventory2RoundedIcon />}
              onClick={() => {
                addToReservationCart(product.id)
                notify('Producto agregado al carrito de reserva', 'success')
              }}
            >
              Reservar
            </Button>
            <Button
              variant="outlined"
              component={Link}
              to={`/producto/${product.slug}`}
              startIcon={<LaunchRoundedIcon />}
            >
              Ver detalle
            </Button>
            <IconButton
              onClick={() => {
                toggleFavorite(product.id)
                notify(
                  isFavorite ? 'Producto removido de favoritos' : 'Producto agregado a favoritos',
                  'info',
                )
              }}
            >
              {isFavorite ? <FavoriteRoundedIcon color="error" /> : <FavoriteBorderRoundedIcon />}
            </IconButton>
            <IconButton
              onClick={() => {
                addToCompare(product.id)
                notify('Producto agregado al comparador', 'info')
              }}
            >
              <CompareArrowsRoundedIcon />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ProductCard
