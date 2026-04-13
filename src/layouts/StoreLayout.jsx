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
      <Box component="main" sx={{ minHeight: '100vh', pt: { xs: 10, md: 12 } }}>
        <Outlet />
      </Box>
      <Container maxWidth="xl">
        <AppFooter />
      </Container>
    </Box>
  )
}

export default StoreLayout
