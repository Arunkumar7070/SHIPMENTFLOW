import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { shipmentsApi, driversApi } from '../lib/api'
import toast from 'react-hot-toast'

export default function DriverDashboard() {
  const [shipments, setShipments] = useState<any[]>([])
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      shipmentsApi.list().then(r => setShipments(r.data)),
      driversApi.getMe().then(r => setProfile(r.data)).catch(() => {})
    ]).finally(() => setLoading(false))
  }, [])

  const toggleAvailability = async () => {
    try {
      await driversApi.toggleAvailability()
      toast.success('Availability updated')
      const r = await driversApi.getMe()
      setProfile(r.data)
    } catch { toast.error('Failed to update') }
  }

  const card: React.CSSProperties = {
    background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(148,163,184,0.1)',
    borderRadius: '16px', padding: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.3)'
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ width: '36px', height: '36px', border: '3px solid rgba(59,130,246,0.2)', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  return (
    <div style={{ padding: '32px', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <h1 style={{ color: '#f1f5f9', fontSize: '26px', fontWeight: 800, margin: '0 0 24px' }}>🗺 Driver Dashboard</h1>

      {/* Profile Card */}
      {profile && (
        <div style={{ ...card, marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: '#fff', fontWeight: 800
            }}>🚗</div>
            <div>
              <p style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '16px', margin: '0 0 4px' }}>{profile.vehicle_type || 'Vehicle'} • {profile.vehicle_plate || 'No plate'}</p>
              <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>License: {profile.license_number || 'N/A'}</p>
            </div>
          </div>
          <button onClick={toggleAvailability} style={{
            padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '14px',
            background: profile.is_available ? '#10b98120' : 'rgba(59,130,246,0.2)',
            color: profile.is_available ? '#10b981' : '#60a5fa',
            border: `1px solid ${profile.is_available ? '#10b98140' : 'rgba(59,130,246,0.3)'}`
          }}>{profile.is_available ? '● Available — Go Offline' : '○ Offline — Go Online'}</button>
        </div>
      )}

      {/* Assigned Shipments */}
      <div style={card}>
        <h2 style={{ color: '#f1f5f9', fontSize: '18px', fontWeight: 700, margin: '0 0 20px' }}>📦 My Assigned Deliveries ({shipments.length})</h2>
        {shipments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#475569' }}>
            <p style={{ fontSize: '40px', margin: '0 0 10px' }}>📭</p>
            <p style={{ margin: 0 }}>No deliveries assigned yet</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {shipments.map((s: any) => (
              <div key={s.id} style={{
                background: 'rgba(15,23,42,0.5)', borderRadius: '12px', padding: '16px',
                border: '1px solid rgba(148,163,184,0.08)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px'
              }}>
                <div>
                  <p style={{ color: '#60a5fa', fontFamily: 'monospace', fontWeight: 700, margin: '0 0 4px', fontSize: '14px' }}>{s.tracking_number}</p>
                  <p style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: 600, margin: '0 0 2px' }}>{s.recipient_name}</p>
                  <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>{s.destination_address?.city || 'Destination'}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{
                    padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700,
                    background: '#f59e0b20', color: '#fbbf24', border: '1px solid #f59e0b40'
                  }}>{s.status?.replace(/_/g, ' ')}</span>
                  <Link to={`/shipments/${s.id}`} style={{
                    color: '#3b82f6', textDecoration: 'none', fontWeight: 600, fontSize: '13px',
                    padding: '6px 14px', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px'
                  }}>View</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
