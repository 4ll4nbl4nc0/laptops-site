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
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
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
    <Box sx={{ width: 288, p: 2.5, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box
        className="dashboard-panel"
        sx={{
          p: 2.5,
          borderRadius: 4,
          mb: 3,
        }}
      >
        <Typography variant="overline" sx={{ letterSpacing: 1.6, color: 'primary.main' }}>
          AstraCompute
        </Typography>
        <Typography variant="h5" sx={{ mt: 1 }}>
          Commerce Console
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Operación de catálogo, inventario, clientes y reservas en una sola vista.
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
              px: 1.8,
              border: '1px solid transparent',
              '&.active': {
                bgcolor: 'rgba(234, 122, 90, 0.1)',
                border: '1px solid rgba(234, 122, 90, 0.14)',
              },
            }}
          >
            <ListItemText primary={label} />
            <ChevronRightRoundedIcon sx={{ fontSize: 18, opacity: 0.55 }} />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ mt: 'auto', pt: 3 }}>
        <Chip label="Panel interno" color="primary" variant="outlined" />
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
    <Box className="dashboard-shell" sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {isDesktop ? (
        <Box
          sx={{
            width: 290,
            borderRight: '1px solid rgba(31, 42, 51, 0.06)',
            position: 'sticky',
            top: 0,
            height: '100vh',
            bgcolor: 'rgba(255, 250, 243, 0.92)',
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
            backdropFilter: 'blur(18px)',
            borderBottom: '1px solid rgba(31, 42, 51, 0.06)',
            background: 'linear-gradient(180deg, rgba(251,246,239,0.88), rgba(251,246,239,0.72))',
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
                Seguimiento comercial, operación y control del showroom.
              </Typography>
            </Box>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Avatar sx={{ bgcolor: 'primary.main', color: '#fffdf9' }}>
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
            Consola administrativa demo con persistencia local y foco en operación comercial.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default DashboardLayout
