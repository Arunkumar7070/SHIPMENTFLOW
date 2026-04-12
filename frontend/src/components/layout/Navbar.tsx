import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'

export default function Navbar() {
  const { user, clearUser } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    clearUser()
    toast.success('Logged out')
    navigate('/login')
  }

  const navLinks = [
    { to: '/dashboard', label: '🏠 Dashboard', roles: ['admin','dispatcher','customer','driver'] },
    { to: '/shipments', label: '📦 Shipments', roles: ['admin','dispatcher','customer','driver'] },
    { to: '/shipments/new', label: '+ New', roles: ['admin','dispatcher','customer'] },
    { to: '/drivers', label: '🚗 Drivers', roles: ['admin','dispatcher'] },
    { to: '/driver', label: '🗺 My Deliveries', roles: ['driver'] },
    { to: '/track', label: '🔍 Track', roles: ['admin','dispatcher','customer','driver'] },
  ].filter(l => user && l.roles.includes(user.role))

  return (
    <nav style={{
      background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(148,163,184,0.1)',
      padding: '0 24px', height: '60px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky' as const, top: 0, zIndex: 100,
      fontFamily: "'Segoe UI', system-ui, sans-serif"
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <Link to="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>📦</span>
          <span style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '17px', letterSpacing: '-0.3px' }}>CourierTrack</span>
        </Link>

        <div style={{ display: 'flex', gap: '4px' }}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} style={{
              color: location.pathname === link.to ? '#3b82f6' : '#94a3b8',
              textDecoration: 'none', fontSize: '14px', fontWeight: 600,
              padding: '6px 14px', borderRadius: '8px',
              background: location.pathname === link.to ? 'rgba(59,130,246,0.15)' : 'transparent',
              transition: 'all 0.2s'
            }}>{link.label}</Link>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: '14px'
            }}>
              {(user.name || user.email)?.[0]?.toUpperCase()}
            </div>
            <div>
              <p style={{ color: '#f1f5f9', fontSize: '13px', fontWeight: 600, margin: 0 }}>{user.name || user.email}</p>
              <p style={{ color: '#64748b', fontSize: '11px', margin: 0, textTransform: 'capitalize' as const }}>{user.role}</p>
            </div>
          </div>
        )}
        <button onClick={handleLogout} style={{
          background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
          color: '#f87171', padding: '7px 16px', borderRadius: '8px',
          cursor: 'pointer', fontSize: '13px', fontWeight: 700
        }}>Logout</button>
      </div>
    </nav>
  )
}
