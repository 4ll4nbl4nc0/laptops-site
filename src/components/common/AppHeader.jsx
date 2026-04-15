import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
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
import MotionReveal from './MotionReveal'

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
        minWidth: mobile ? '100%' : { lg: 240, xl: 320 },
        '& .MuiOutlinedInput-root': {
          bgcolor: alpha('#ffffff', 0.75),
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
        backdropFilter: 'blur(26px)',
        borderBottom: '1px solid rgba(31, 42, 51, 0.06)',
        background: 'linear-gradient(180deg, rgba(251,246,239,0.86), rgba(251,246,239,0.68))',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1.5 }}>
          <MotionReveal
            className="glass-panel elevated-border"
            sx={{
              width: '100%',
              borderRadius: 999,
              px: { xs: 1, md: 1.3 },
              py: { xs: 0.9, md: 1.1 },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Stack
                component={Link}
                to="/"
                direction="row"
                spacing={1.2}
                alignItems="center"
                sx={{ mr: { xs: 'auto', md: 0 }, minWidth: 'fit-content' }}
              >
                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    borderRadius: 3.5,
                    display: 'grid',
                    placeItems: 'center',
                    background:
                      'linear-gradient(135deg, rgba(234,122,90,0.18), rgba(47,127,121,0.12))',
                    border: '1px solid rgba(31,42,51,0.08)',
                  }}
                >
                  <Typography variant="h6" color="primary.main">
                    A
                  </Typography>
                </Box>
                <Box>
                  <Typography fontWeight={800} sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}>
                    AstraCompute
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                  >
                    Premium hardware showroom
                  </Typography>
                </Box>
              </Stack>

              <Stack
                direction="row"
                spacing={0.8}
                sx={{
                  display: { xs: 'none', lg: 'flex' },
                  mx: 'auto',
                  p: 0.7,
                  borderRadius: 999,
                  border: '1px solid rgba(31,42,51,0.08)',
                  bgcolor: 'rgba(255,255,255,0.52)',
                }}
              >
                {navLinks.map(([label, path]) => (
                  <Button
                    key={path}
                    component={NavLink}
                    to={path}
                    color="inherit"
                    sx={{
                      px: 1.8,
                      '&.active': {
                        color: '#fffdf9',
                        backgroundImage: 'linear-gradient(135deg, #ea7a5a 0%, #f29a71 100%)',
                      },
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </Stack>

              <Box sx={{ display: { xs: 'none', xl: 'block' } }}>
                <SearchField />
              </Box>

              <Stack direction="row" spacing={1} alignItems="center">
                {summary.map((item) => (
                  <IconButton
                    key={item.to}
                    component={Link}
                    to={item.to}
                    sx={{
                      border: '1px solid rgba(31, 42, 51, 0.08)',
                      bgcolor: 'rgba(255, 255, 255, 0.54)',
                    }}
                  >
                    <Badge badgeContent={item.count} color="primary">
                      {item.icon}
                    </Badge>
                  </IconButton>
                ))}
                <Button
                  component={Link}
                  to="/contacto"
                  variant="outlined"
                  endIcon={<KeyboardArrowRightRoundedIcon />}
                  sx={{ display: { xs: 'none', xl: 'inline-flex' } }}
                >
                  Hablar con asesor
                </Button>
                <IconButton
                  onClick={() => setOpen(true)}
                  sx={{
                    display: { md: 'none' },
                    border: '1px solid rgba(31, 42, 51, 0.08)',
                  }}
                >
                  <MenuRoundedIcon />
                </IconButton>
              </Stack>
            </Stack>
          </MotionReveal>
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
                sx={{
                  justifyContent: 'flex-start',
                  borderRadius: 3,
                  py: 1.2,
                  px: 1.4,
                }}
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
