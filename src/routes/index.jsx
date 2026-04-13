import { createBrowserRouter } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import StoreLayout from '../layouts/StoreLayout'
import AnalyticsPage from '../pages/dashboard/AnalyticsPage'
import CustomersPage from '../pages/dashboard/CustomersPage'
import DashboardOverviewPage from '../pages/dashboard/DashboardOverviewPage'
import InventoryPage from '../pages/dashboard/InventoryPage'
import LoginPage from '../pages/dashboard/LoginPage'
import ProductsAdminPage from '../pages/dashboard/ProductsAdminPage'
import ProfilePage from '../pages/dashboard/ProfilePage'
import ReservationsPage from '../pages/dashboard/ReservationsPage'
import SettingsPage from '../pages/dashboard/SettingsPage'
import NotFoundPage from '../pages/shared/NotFoundPage'
import CatalogPage from '../pages/store/CatalogPage'
import ComparePage from '../pages/store/ComparePage'
import ContactPage from '../pages/store/ContactPage'
import FavoritesPage from '../pages/store/FavoritesPage'
import HomePage from '../pages/store/HomePage'
import ProductDetailPage from '../pages/store/ProductDetailPage'
import ReservationCartPage from '../pages/store/ReservationCartPage'
import ReservationCheckoutPage from '../pages/store/ReservationCheckoutPage'
import ReservationConfirmationPage from '../pages/store/ReservationConfirmationPage'
import SupportPage from '../pages/store/SupportPage'
import ProtectedDashboard from './ProtectedDashboard'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <StoreLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'catalogo', element: <CatalogPage /> },
      { path: 'producto/:slug', element: <ProductDetailPage /> },
      { path: 'comparar', element: <ComparePage /> },
      { path: 'favoritos', element: <FavoritesPage /> },
      { path: 'reserva', element: <ReservationCartPage /> },
      { path: 'checkout-reserva', element: <ReservationCheckoutPage /> },
      { path: 'confirmacion', element: <ReservationConfirmationPage /> },
      { path: 'contacto', element: <ContactPage /> },
      { path: 'soporte', element: <SupportPage /> },
    ],
  },
  {
    path: '/dashboard/login',
    element: <AuthLayout />,
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    path: '/dashboard',
    element: <ProtectedDashboard />,
    children: [
      { index: true, element: <DashboardOverviewPage /> },
      { path: 'productos', element: <ProductsAdminPage /> },
      { path: 'inventario', element: <InventoryPage /> },
      { path: 'clientes', element: <CustomersPage /> },
      { path: 'reservas', element: <ReservationsPage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
      { path: 'configuracion', element: <SettingsPage /> },
      { path: 'perfil', element: <ProfilePage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
