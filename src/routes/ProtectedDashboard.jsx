import { Navigate, useLocation } from 'react-router-dom'
import { useAppStore } from '../app/store'
import DashboardLayout from '../layouts/DashboardLayout'

function ProtectedDashboard() {
  const isAuthenticated = useAppStore((state) => state.auth.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/dashboard/login" replace state={{ from: location.pathname }} />
  }

  return <DashboardLayout />
}

export default ProtectedDashboard
