import { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { shipmentsApi, dashboardApi } from '../lib/api'
import { useNavigate, Link } from 'react-router-dom'

const statusColor: Record<string, string> = {
  delivered: '#10b981', in_transit: '#3b82f6', pending: '#f59e0b',
  out_for_delivery: '#8b5cf6', picked_up: '#06b6d4', at_hub: '#f97316',
  failed: '#ef4444', returned: '#6b7280',
}

export function DashboardPage() {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [stats, setStats] = useState<any>(null)
  const [shipments, setShipments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { navigate('/login'); return }

    const fetchData = async () => {
      try {
        const shipmentsRes = await shipmentsApi.list()
        const allShipments: any[] = shipmentsRes.data
        setShipments(allShipments.slice(0, 6))

        // Admin/dispatcher get real stats from backend
        if (user.role === 'admin' || user.role === 'dispatcher') {
          try {
            const statsRes = await dashboardApi.stats()
            setStats(statsRes.data)
          } catch {
            // fallback: compute from shipments list
            setStats(computeStats(allShipments))
          }
        } else {
          // Customer/driver: compute stats from their own shipments
          setStats(computeStats(allShipments))
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user, navigate])

  const computeStats = (list: any[]) => ({
    total_shipments: list.length,
    pending: list.filter(s => s.status === 'pending').length,
    in_transit: list.filter(s => ['in_transit','picked_up','at_hub','out_for_delivery'].includes(s.status)).length,
    delivered: list.filter(s => s.status === 'delivered').length,
    failed: list.filter(s => ['failed','returned'].includes(s.status)).length,
  })

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center', color: '#94a3b8' }}>
        <div style={{
          width: '48px', height: '48px', border: '4px solid rgba(59,130,246,0.2)',
          borderTopColor: '#3b82f6', borderRadius: '50%', margin: '0 auto 16px',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ margin: 0 }}>Loading dashboard...</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  )

  const card: React.CSSProperties = {
    background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(148,163,184,0.1)',
    borderRadius: '16px', padding: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.3)'
  }

  const statCards = [
    { label: 'Total Shipments', value: stats?.total_shipments ?? 0, icon: '📦', color: '#3b82f6' },
    { label: 'In Transit', value: stats?.in_transit ?? 0, icon: '🚚', color: '#f59e0b' },
    { label: 'Pending', value: stats?.pending ?? 0, icon: '⏳', color: '#8b5cf6' },
    { label: 'Delivered', value: stats?.delivered ?? 0, icon: '✅', color: '#10b981' },
  ]

  const roleLabel: Record<string, string> = {
    admin: 'Full system access',
    dispatcher: 'Manage operations & shipments',
    driver: 'Check your assigned deliveries',
    customer: 'Track and manage your shipments',
  }

  return (
    <div style={{ padding: '32px', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Hero Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(16,185,129,0.08))',
        border: '1px solid rgba(59,130,246,0.2)', borderRadius: '20px',
        padding: '28px 32px', marginBottom: '28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px'
      }}>
        <div>
          <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
            {user?.role?.toUpperCase()} DASHBOARD
          </p>
          <h1 style={{ color: '#f1f5f9', fontSize: '26px', fontWeight: 800, margin: '0 0 4px' }}>
            Welcome, {user?.name || user?.email?.split('@')[0]} 👋
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
            {roleLabel[user?.role || 'customer']}
          </p>
        </div>
        {(user?.role === 'customer' || user?.role === 'admin' || user?.role === 'dispatcher') && (
          <Link to="/shipments/new" style={{
            padding: '12px 24px', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            color: '#fff', textDecoration: 'none', borderRadius: '12px', fontWeight: 700,
            fontSize: '14px', boxShadow: '0 8px 20px rgba(59,130,246,0.4)'
          }}>+ New Shipment</Link>
        )}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {statCards.map(sc => (
          <div key={sc.label} style={{ ...card, borderLeft: `4px solid ${sc.color}`, display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '14px', fontSize: '24px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `${sc.color}20`, flexShrink: 0
            }}>{sc.icon}</div>
            <div>
              <p style={{ color: '#64748b', fontSize: '11px', margin: 0, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{sc.label}</p>
              <p style={{ color: '#f1f5f9', fontSize: '32px', fontWeight: 800, margin: 0, lineHeight: 1.1 }}>{sc.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Shipments Table */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#f1f5f9', fontSize: '18px', fontWeight: 700, margin: 0 }}>📋 Recent Shipments</h2>
          <Link to="/shipments" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>View All →</Link>
        </div>

        {shipments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px', color: '#475569' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
            <p style={{ margin: '0 0 16px', fontSize: '16px' }}>No shipments yet</p>
            <Link to="/shipments/new" style={{
              padding: '10px 20px', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              color: '#fff', textDecoration: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '14px'
            }}>Create your first shipment →</Link>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Tracking #', 'Recipient', 'Status', 'Est. Delivery', 'Action'].map(h => (
                    <th key={h} style={{
                      padding: '10px 14px', textAlign: 'left', color: '#64748b',
                      fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px',
                      borderBottom: '1px solid rgba(148,163,184,0.1)'
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shipments.map((s: any) => (
                  <tr key={s.id} style={{ borderBottom: '1px solid rgba(148,163,184,0.06)' }}>
                    <td style={{ padding: '14px', fontFamily: 'monospace', color: '#60a5fa', fontWeight: 700, fontSize: '13px' }}>
                      {s.tracking_number}
                    </td>
                    <td style={{ padding: '14px', color: '#cbd5e1', fontSize: '14px' }}>{s.recipient_name || '—'}</td>
                    <td style={{ padding: '14px' }}>
                      <span style={{
                        padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700,
                        background: `${statusColor[s.status] || '#6b7280'}20`,
                        color: statusColor[s.status] || '#94a3b8',
                        border: `1px solid ${statusColor[s.status] || '#6b7280'}40`
                      }}>{s.status?.replace(/_/g, ' ') || 'pending'}</span>
                    </td>
                    <td style={{ padding: '14px', color: '#94a3b8', fontSize: '13px' }}>
                      {s.estimated_delivery ? new Date(s.estimated_delivery).toLocaleDateString() : '—'}
                    </td>
                    <td style={{ padding: '14px' }}>
                      <Link to={`/shipments/${s.id}`} style={{
                        color: '#3b82f6', textDecoration: 'none', fontWeight: 600, fontSize: '13px',
                        padding: '6px 14px', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px'
                      }}>View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
