import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'

import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { TrackPage } from './pages/TrackPage'
import { DashboardPage } from './pages/DashboardPage'
import ShipmentsPage from './pages/ShipmentsPage'
import NewShipmentPage from './pages/NewShipmentPage'
import ShipmentDetailPage from './pages/ShipmentDetailPage'
import DriversPage from './pages/DriversPage'
import DriverDashboard from './pages/DriverDashboard'
import Layout from './components/layout/Layout'

const qc = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
})

function ProtectedRoute({ children, roles }: { children: React.ReactNode; roles?: string[] }) {
  const { user } = useAuthStore()
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/track" element={<TrackPage />} />
          <Route path="/track/:trackingNumber" element={<TrackPage />} />

          {/* Protected */}
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="shipments" element={<ShipmentsPage />} />
            <Route path="shipments/new" element={<NewShipmentPage />} />
            <Route path="shipments/:id" element={<ShipmentDetailPage />} />
            <Route
              path="drivers"
              element={
                <ProtectedRoute roles={['admin', 'dispatcher']}>
                  <DriversPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="driver"
              element={
                <ProtectedRoute roles={['driver']}>
                  <DriverDashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
