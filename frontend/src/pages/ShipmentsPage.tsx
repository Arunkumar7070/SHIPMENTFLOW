import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { shipmentsApi } from '../lib/api'
import toast from 'react-hot-toast'

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  delivered:        { bg: '#10b98120', text: '#10b981', border: '#10b98140' },
  in_transit:       { bg: '#3b82f620', text: '#60a5fa', border: '#3b82f640' },
  pending:          { bg: '#f59e0b20', text: '#fbbf24', border: '#f59e0b40' },
  out_for_delivery: { bg: '#8b5cf620', text: '#a78bfa', border: '#8b5cf640' },
  picked_up:        { bg: '#06b6d420', text: '#22d3ee', border: '#06b6d440' },
  at_hub:           { bg: '#f9731620', text: '#fb923c', border: '#f9731640' },
  failed:           { bg: '#ef444420', text: '#f87171', border: '#ef444440' },
  returned:         { bg: '#6b728020', text: '#9ca3af', border: '#6b728040' },
}

const STATUSES = ['', 'pending', 'picked_up', 'in_transit', 'at_hub', 'out_for_delivery', 'delivered', 'failed', 'returned']

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  const load = async (status?: string) => {
    setLoading(true)
    try {
      const res = await shipmentsApi.list(status ? { status } : {})
      setShipments(res.data)
    } catch { toast.error('Failed to load shipments') }
    finally { setLoading(false) }
  }

  useEffect(() => { load(filter) }, [filter])

  const card: React.CSSProperties = {
    background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(148,163,184,0.1)',
    borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.3)'
  }

  return (
    <div style={{ padding: '32px', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ color: '#f1f5f9', fontSize: '26px', fontWeight: 800, margin: 0 }}>📦 Shipments</h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>{shipments.length} total records</p>
        </div>
        <Link to="/shipments/new" style={{
          padding: '12px 24px', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          color: '#fff', textDecoration: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '14px',
          boxShadow: '0 8px 20px rgba(59,130,246,0.4)'
        }}>+ New Shipment</Link>
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {STATUSES.map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{
            padding: '7px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer',
            fontSize: '13px', fontWeight: 600, transition: 'all 0.2s',
            background: filter === s ? 'rgba(59,130,246,0.3)' : 'rgba(30,41,59,0.8)',
            color: filter === s ? '#60a5fa' : '#64748b',
            border: filter === s ? '1px solid rgba(59,130,246,0.5)' : '1px solid rgba(148,163,184,0.1)'
          }}>{s || 'All'}</button>
        ))}
      </div>

      {/* Table */}
      <div style={card}>
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
            <div style={{
              width: '36px', height: '36px', border: '3px solid rgba(59,130,246,0.2)',
              borderTopColor: '#3b82f6', borderRadius: '50%', margin: '0 auto 12px',
              animation: 'spin 1s linear infinite'
            }} />
            <p style={{ margin: 0 }}>Loading...</p>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        ) : shipments.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#475569' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
            <p style={{ margin: 0, fontSize: '16px' }}>No shipments found</p>
            <p style={{ margin: '8px 0 0', fontSize: '13px' }}>Try changing the filter or create a new shipment</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.1)' }}>
                  {['Tracking #', 'Recipient', 'Origin → Destination', 'Status', 'Created', 'Action'].map(h => (
                    <th key={h} style={{
                      padding: '12px 16px', textAlign: 'left', color: '#64748b',
                      fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px'
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shipments.map((s: any) => {
                  const sc = STATUS_COLORS[s.status] || { bg: '#6b728020', text: '#9ca3af', border: '#6b728040' }
                  return (
                    <tr key={s.id} style={{ borderBottom: '1px solid rgba(148,163,184,0.05)', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(59,130,246,0.04)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <td style={{ padding: '14px 16px', fontFamily: 'monospace', color: '#60a5fa', fontWeight: 700, fontSize: '13px' }}>
                        {s.tracking_number}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <p style={{ color: '#e2e8f0', fontSize: '14px', margin: 0, fontWeight: 600 }}>{s.recipient_name}</p>
                        {s.recipient_phone && <p style={{ color: '#64748b', fontSize: '12px', margin: '2px 0 0' }}>{s.recipient_phone}</p>}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#94a3b8', fontSize: '13px' }}>
                        <span title={JSON.stringify(s.origin_address)}>
                          {s.origin_address?.city || 'Origin'} → {s.destination_address?.city || 'Destination'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700,
                          background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`
                        }}>{s.status?.replace(/_/g, ' ') || 'pending'}</span>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#64748b', fontSize: '13px' }}>
                        {s.created_at ? new Date(s.created_at).toLocaleDateString() : '—'}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <Link to={`/shipments/${s.id}`} style={{
                          color: '#3b82f6', textDecoration: 'none', fontWeight: 600, fontSize: '13px',
                          padding: '6px 14px', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px',
                          display: 'inline-block', whiteSpace: 'nowrap'
                        }}>View →</Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
