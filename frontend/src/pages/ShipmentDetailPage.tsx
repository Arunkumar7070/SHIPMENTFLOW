import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { shipmentsApi, driversApi } from '../lib/api'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  delivered:        { bg: '#10b98120', text: '#10b981' },
  in_transit:       { bg: '#3b82f620', text: '#60a5fa' },
  pending:          { bg: '#f59e0b20', text: '#fbbf24' },
  out_for_delivery: { bg: '#8b5cf620', text: '#a78bfa' },
  picked_up:        { bg: '#06b6d420', text: '#22d3ee' },
  at_hub:           { bg: '#f9731620', text: '#fb923c' },
  failed:           { bg: '#ef444420', text: '#f87171' },
  returned:         { bg: '#6b728020', text: '#9ca3af' },
}

const STATUSES = ['pending','picked_up','in_transit','at_hub','out_for_delivery','delivered','failed','returned']

export default function ShipmentDetailPage() {
  const { id } = useParams()
  const { user } = useAuthStore()
  const [shipment, setShipment] = useState<any>(null)
  const [drivers, setDrivers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newStatus, setNewStatus] = useState('')
  const [note, setNote] = useState('')
  const [selectedDriver, setSelectedDriver] = useState('')

  const load = async () => {
    try {
      const res = await shipmentsApi.get(id!)
      setShipment(res.data)
    } catch { toast.error('Shipment not found') }
    finally { setLoading(false) }
  }

  useEffect(() => {
    load()
    if (user && ['admin','dispatcher'].includes(user.role)) {
      driversApi.list().then(r => setDrivers(r.data)).catch(() => {})
    }
  }, [id])

  const updateStatus = async () => {
    if (!newStatus) { toast.error('Select a status'); return }
    try {
      await shipmentsApi.updateStatus(id!, newStatus, note)
      toast.success('Status updated')
      setNote(''); setNewStatus('')
      load()
    } catch (e: any) { toast.error(e.response?.data?.detail || 'Update failed') }
  }

  const assignDriver = async () => {
    if (!selectedDriver) { toast.error('Select a driver'); return }
    try {
      await shipmentsApi.assign(id!, selectedDriver)
      toast.success('Driver assigned')
      setSelectedDriver('')
      load()
    } catch (e: any) { toast.error(e.response?.data?.detail || 'Assignment failed') }
  }

  const card: React.CSSProperties = {
    background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(148,163,184,0.1)',
    borderRadius: '16px', padding: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.3)'
  }
  const inp: React.CSSProperties = {
    width: '100%', padding: '11px 14px', boxSizing: 'border-box',
    background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(148,163,184,0.15)',
    borderRadius: '10px', color: '#f1f5f9', fontSize: '14px', outline: 'none'
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center', color: '#64748b' }}>
        <div style={{ width: '36px', height: '36px', border: '3px solid rgba(59,130,246,0.2)', borderTopColor: '#3b82f6', borderRadius: '50%', margin: '0 auto 12px', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  )

  if (!shipment) return (
    <div style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>
      <p style={{ fontSize: '48px' }}>📭</p>
      <p>Shipment not found</p>
      <Link to="/shipments" style={{ color: '#3b82f6' }}>← Back to Shipments</Link>
    </div>
  )

  const sc = STATUS_COLORS[shipment.status] || { bg: '#6b728020', text: '#9ca3af' }
  const isStaff = user && ['admin','dispatcher','driver'].includes(user.role)

  return (
    <div style={{ padding: '32px', maxWidth: '860px', margin: '0 auto', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Back + Header */}
      <div style={{ marginBottom: '24px' }}>
        <Link to="/shipments" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', display: 'inline-block', marginBottom: '12px' }}>← Back to Shipments</Link>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ color: '#f1f5f9', fontSize: '24px', fontWeight: 800, margin: '0 0 4px' }}>📦 Shipment Detail</h1>
            <p style={{ color: '#60a5fa', fontFamily: 'monospace', fontSize: '18px', fontWeight: 700, margin: 0 }}>{shipment.tracking_number}</p>
          </div>
          <span style={{ padding: '8px 20px', borderRadius: '20px', fontWeight: 700, fontSize: '14px', background: sc.bg, color: sc.text, border: `1px solid ${sc.text}40` }}>
            {shipment.status?.replace(/_/g, ' ')?.toUpperCase()}
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Recipient */}
        <div style={card}>
          <h3 style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 14px' }}>👤 Recipient</h3>
          <p style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '16px', margin: '0 0 6px' }}>{shipment.recipient_name}</p>
          <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 4px' }}>{shipment.recipient_email || '—'}</p>
          <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>{shipment.recipient_phone || '—'}</p>
        </div>

        {/* Package */}
        <div style={card}>
          <h3 style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 14px' }}>📋 Package Info</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {[
              { label: 'Weight', value: shipment.weight_kg ? `${shipment.weight_kg} kg` : '—' },
              { label: 'Value', value: shipment.declared_value ? `MYR ${shipment.declared_value}` : '—' },
              { label: 'Created', value: new Date(shipment.created_at).toLocaleDateString() },
              { label: 'Est. Delivery', value: shipment.estimated_delivery ? new Date(shipment.estimated_delivery).toLocaleDateString() : '—' },
            ].map(item => (
              <div key={item.label}>
                <p style={{ color: '#64748b', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 2px' }}>{item.label}</p>
                <p style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: 600, margin: 0 }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Addresses */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {[{ label: '📍 Origin', addr: shipment.origin_address }, { label: '🎯 Destination', addr: shipment.destination_address }].map(({ label, addr }) => (
          <div key={label} style={card}>
            <h3 style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 10px' }}>{label}</h3>
            <p style={{ color: '#e2e8f0', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>
              {addr?.street && <>{addr.street}<br /></>}
              {addr?.city && <>{addr.city}{addr?.state ? `, ${addr.state}` : ''}<br /></>}
              {addr?.postal_code} {addr?.country}
            </p>
          </div>
        ))}
      </div>

      {/* Staff Actions */}
      {isStaff && (
        <div style={{ ...card, marginBottom: '20px' }}>
          <h3 style={{ color: '#f1f5f9', fontSize: '16px', fontWeight: 700, margin: '0 0 18px' }}>⚙️ Staff Actions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* Update Status */}
            <div>
              <p style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 10px' }}>Update Status</p>
              <select style={{ ...inp, marginBottom: '10px', cursor: 'pointer' }}
                value={newStatus} onChange={e => setNewStatus(e.target.value)}>
                <option value="">Select new status...</option>
                {STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
              </select>
              <input style={{ ...inp, marginBottom: '10px' }} placeholder="Note (optional)"
                value={note} onChange={e => setNote(e.target.value)} />
              <button onClick={updateStatus} style={{
                width: '100%', padding: '11px', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '14px'
              }}>Update Status</button>
            </div>

            {/* Assign Driver */}
            {['admin','dispatcher'].includes(user?.role || '') && (
              <div>
                <p style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 10px' }}>Assign Driver</p>
                <select style={{ ...inp, marginBottom: '10px', cursor: 'pointer' }}
                  value={selectedDriver} onChange={e => setSelectedDriver(e.target.value)}>
                  <option value="">Select driver...</option>
                  {drivers.map((d: any) => (
                    <option key={d.id} value={d.id}>
                      {d.user?.name || d.user?.email} ({d.vehicle_type || 'vehicle'})
                    </option>
                  ))}
                </select>
                <button onClick={assignDriver} style={{
                  width: '100%', padding: '11px', background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '14px', marginTop: '10px'
                }}>Assign Driver</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Timeline */}
      {shipment.tracking_events && shipment.tracking_events.length > 0 && (
        <div style={card}>
          <h3 style={{ color: '#f1f5f9', fontSize: '16px', fontWeight: 700, margin: '0 0 20px' }}>🗓 Tracking Timeline</h3>
          <div>
            {[...shipment.tracking_events].reverse().map((ev: any, i: number) => (
              <div key={ev.id} style={{ display: 'flex', gap: '16px', paddingBottom: i < shipment.tracking_events.length - 1 ? '20px' : '0' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '12px', height: '12px', borderRadius: '50%', marginTop: '4px', flexShrink: 0,
                    background: i === 0 ? '#3b82f6' : '#334155',
                    border: `2px solid ${i === 0 ? '#60a5fa' : '#475569'}`,
                    boxShadow: i === 0 ? '0 0 8px rgba(59,130,246,0.5)' : 'none'
                  }} />
                  {i < shipment.tracking_events.length - 1 && (
                    <div style={{ width: '1px', flex: 1, background: 'rgba(148,163,184,0.15)', margin: '4px 0' }} />
                  )}
                </div>
                <div>
                  <p style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: 600, margin: '0 0 2px' }}>
                    {ev.description || ev.event_type?.replace(/_/g, ' ')}
                  </p>
                  {ev.location_name && <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 2px' }}>📍 {ev.location_name}</p>}
                  <p style={{ color: '#475569', fontSize: '12px', margin: 0 }}>{new Date(ev.occurred_at).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
