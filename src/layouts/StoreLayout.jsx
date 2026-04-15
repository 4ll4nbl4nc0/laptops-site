import {
  Box,
  Container,
} from '@mui/material'
import { Outlet } from 'react-router-dom'
import AppFooter from '../components/common/AppFooter'
import AppHeader from '../components/common/AppHeader'

function StoreLayout() {
  return (
    <Box className="page-shell">
      <AppHeader />
      <Box component="main" sx={{ minHeight: '100vh', pt: { xs: 11, md: 13 }, position: 'relative', zIndex: 1 }}>
        <Outlet />
      </Box>
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <AppFooter />
      </Container>
    </Box>
  )
}

export default StoreLayout
