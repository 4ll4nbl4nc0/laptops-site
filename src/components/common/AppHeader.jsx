import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useMemo, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAppStore } from '../../app/store'

const navLinks = [
  ['Inicio', '/'],
  ['Catálogo', '/catalogo'],
  ['Soporte', '/soporte'],
  ['Contacto', '/contacto'],
]

function SearchField({ mobile = false, onNavigate }) {
  const [value, setValue] = useState('')
  const setSearch = useAppStore((state) => state.setSearch)
  const navigate = useNavigate()

  return (
    <TextField
      fullWidth
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          setSearch(value)
          navigate('/catalogo')
          onNavigate?.()
        }
      }}
      placeholder="Buscar laptops, RTX, 32GB RAM, OLED..."
      size="small"
      sx={{
        minWidth: mobile ? '100%' : 320,
        '& .MuiOutlinedInput-root': {
          bgcolor: alpha('#0d1829', 0.9),
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchRoundedIcon />
          </InputAdornment>
        ),
      }}
    />
  )
}

function AppHeader() {
  const [open, setOpen] = useState(false)
  const favorites = useAppStore((state) => state.favorites.length)
  const cart = useAppStore((state) => state.reservationCart.length)
  const summary = useMemo(
    () => [
      { to: '/favoritos', icon: <FavoriteBorderRoundedIcon />, count: favorites },
      { to: '/reserva', icon: <Inventory2RoundedIcon />, count: cart },
    ],
    [cart, favorites],
  )

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: 'blur(22px)',
        borderBottom: '1px solid rgba(220, 231, 255, 0.08)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Stack
            component={Link}
            to="/"
            direction="row"
            spacing={1.2}
            alignItems="center"
            sx={{ mr: 2 }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 3,
                display: 'grid',
                placeItems: 'center',
                bgcolor: 'rgba(76, 201, 240, 0.12)',
                border: '1px solid rgba(76, 201, 240, 0.2)',
              }}
            >
              <Typography variant="h6" color="primary.main">
                A
              </Typography>
            </Box>
            <Box>
              <Typography fontWeight={800}>AstraCompute</Typography>
              <Typography variant="caption" color="text.secondary">
                Premium Computer Store
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 'auto' }}
          >
            {navLinks.map(([label, path]) => (
              <Button
                key={path}
                component={NavLink}
                to={path}
                color="inherit"
                sx={{
                  '&.active': {
                    color: 'primary.main',
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Stack>

          <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
            <SearchField />
          </Box>

          <Stack direction="row" spacing={1} alignItems="center">
            {summary.map((item) => (
              <IconButton
                key={item.to}
                component={Link}
                to={item.to}
                sx={{
                  border: '1px solid rgba(220, 231, 255, 0.08)',
                  bgcolor: 'rgba(9, 16, 29, 0.75)',
                }}
              >
                <Badge badgeContent={item.count} color="primary">
                  {item.icon}
                </Badge>
              </IconButton>
            ))}
            <IconButton
              onClick={() => setOpen(true)}
              sx={{ display: { md: 'none' }, border: '1px solid rgba(220, 231, 255, 0.08)' }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 320, p: 3 }}>
          <Stack spacing={3}>
            <SearchField mobile onNavigate={() => setOpen(false)} />
            {navLinks.map(([label, path]) => (
              <Button
                key={path}
                component={NavLink}
                to={path}
                color="inherit"
                onClick={() => setOpen(false)}
                sx={{ justifyContent: 'flex-start' }}
              >
                {label}
              </Button>
            ))}
          </Stack>
        </Box>
      </Drawer>
    </AppBar>
  )
}

export default AppHeader
