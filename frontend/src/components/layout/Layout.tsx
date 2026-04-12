import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

// Wrap for non-Outlet usage (pages that render Layout directly)
export function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <Navbar />
      <main>{children || <Outlet />}</main>
    </div>
  )
}

export default Layout
