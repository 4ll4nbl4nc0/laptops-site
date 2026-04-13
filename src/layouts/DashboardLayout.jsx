import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { useAppStore } from '../app/store'

const dashboardLinks = [
  ['Overview', '/dashboard'],
  ['Productos', '/dashboard/productos'],
  ['Inventario', '/dashboard/inventario'],
  ['Clientes', '/dashboard/clientes'],
  ['Reservas', '/dashboard/reservas'],
  ['Analytics', '/dashboard/analytics'],
  ['Configuracion', '/dashboard/configuracion'],
  ['Perfil', '/dashboard/perfil'],
]

function Sidebar({ onNavigate }) {
  return (
    <Box sx={{ width: 280, p: 2.5, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box
        className="dashboard-accent"
        sx={{
          p: 2.5,
          borderRadius: 5,
          border: '1px solid rgba(243, 239, 230, 0.08)',
          mb: 3,
        }}
      >
        <Typography variant="overline" sx={{ letterSpacing: 2, color: 'primary.main' }}>
          AstraCompute
        </Typography>
        <Typography variant="h5" sx={{ mt: 1 }}>
          Commerce Control
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Panel premium para catálogo, reservas, stock y operación comercial.
        </Typography>
      </Box>
      <List sx={{ display: 'grid', gap: 1 }}>
        {dashboardLinks.map(([label, path]) => (
          <ListItemButton
            key={path}
            component={NavLink}
            to={path}
            onClick={onNavigate}
            sx={{
              borderRadius: 3,
              '&.active': {
                bgcolor: 'rgba(214, 176, 107, 0.12)',
                border: '1px solid rgba(214, 176, 107, 0.18)',
              },
            }}
          >
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ mt: 'auto', pt: 3 }}>
        <Chip label="Acceso por ruta: /dashboard" color="primary" variant="outlined" />
      </Box>
    </Box>
  )
}

function DashboardLayout() {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  const navigate = useNavigate()
  const logout = useAppStore((state) => state.logout)
  const user = useAppStore((state) => state.auth.user)

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {isDesktop ? (
        <Box
          sx={{
            width: 290,
            borderRight: '1px solid rgba(243, 239, 230, 0.08)',
            position: 'sticky',
            top: 0,
            height: '100vh',
            bgcolor: 'rgba(10, 15, 20, 0.98)',
          }}
        >
          <Sidebar />
        </Box>
      ) : (
        <Drawer open={open} onClose={() => setOpen(false)}>
          <Sidebar onNavigate={() => setOpen(false)} />
        </Drawer>
      )}
      <Box sx={{ flex: 1 }}>
        <AppBar
          position="sticky"
          color="transparent"
          elevation={0}
          sx={{
            backdropFilter: 'blur(22px)',
            borderBottom: '1px solid rgba(243, 239, 230, 0.08)',
          }}
        >
          <Toolbar sx={{ gap: 2 }}>
            {!isDesktop && (
              <IconButton onClick={() => setOpen(true)}>
                <MenuRoundedIcon />
              </IconButton>
            )}
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6">Control Center</Typography>
              <Typography variant="body2" color="text.secondary">
                Operación comercial, inventario, clientes y reservas.
              </Typography>
            </Box>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Avatar sx={{ bgcolor: 'primary.main', color: 'background.default' }}>
                {user?.name?.[0] || 'A'}
              </Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography fontWeight={700}>{user?.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.role}
                </Typography>
              </Box>
              <Button
                color="inherit"
                startIcon={<LogoutRoundedIcon />}
                onClick={() => {
                  logout()
                  navigate('/')
                }}
              >
                Salir
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Outlet />
          <Divider sx={{ my: 5 }} />
          <Typography color="text.secondary" variant="body2">
            Demo frontend premium con persistencia local para propuesta comercial.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default DashboardLayout
