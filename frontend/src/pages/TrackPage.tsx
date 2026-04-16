import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { shipmentsApi } from '../lib/api'
import toast from 'react-hot-toast'

const STATUS_STEPS = ['pending', 'picked_up', 'in_transit', 'at_hub', 'out_for_delivery', 'delivered']

export function TrackPage() {
  const { trackingNumber: paramTN } = useParams()
  const [input, setInput] = useState(paramTN || '')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleTrack = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim()) { toast.error('Enter a tracking number'); return }
    setLoading(true)
    try {
      const res = await shipmentsApi.track(input.trim().toUpperCase())
      setResult(res.data)
      navigate(`/track/${input.trim().toUpperCase()}`, { replace: true })
    } catch {
      toast.error('Tracking number not found')
      setResult(null)
    } finally { setLoading(false) }
  }

  const currentStep = result ? STATUS_STEPS.indexOf(result.status) : -1

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)',
      fontFamily: "'Segoe UI', system-ui, sans-serif", padding: '48px 24px'
    }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
          <h1 style={{ color: '#f1f5f9', fontSize: '32px', fontWeight: 800, margin: '0 0 8px' }}>Track Your Package</h1>
          <p style={{ color: '#64748b', fontSize: '16px', margin: 0 }}>Enter your tracking number to see real-time delivery status</p>
        </div>

        {/* Search */}
        <form onSubmit={handleTrack} style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              value={input} onChange={e => setInput(e.target.value)}
              placeholder="CT-20250405-XXXXXX"
              style={{
                flex: 1, padding: '16px 20px',
                background: 'rgba(30,41,59,0.9)', border: '1px solid rgba(148,163,184,0.2)',
                borderRadius: '14px', color: '#f1f5f9', fontSize: '16px',
                outline: 'none', fontFamily: 'monospace', letterSpacing: '1px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
              }}
            />
            <button type="submit" disabled={loading} style={{
              padding: '16px 28px', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              color: '#fff', border: 'none', borderRadius: '14px', fontWeight: 700,
              fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 8px 24px rgba(59,130,246,0.4)', whiteSpace: 'nowrap'
            }}>
              {loading ? '...' : 'Track →'}
            </button>
          </div>
        </form>

        {/* Result */}
        {result && (
          <div style={{
            background: 'rgba(30,41,59,0.85)', border: '1px solid rgba(148,163,184,0.1)',
            borderRadius: '20px', padding: '28px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}>
            {/* Tracking Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid rgba(148,163,184,0.1)' }}>
              <div>
                <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 4px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px' }}>Tracking Number</p>
                <p style={{ color: '#60a5fa', fontFamily: 'monospace', fontSize: '20px', fontWeight: 800, margin: 0 }}>{result.tracking_number}</p>
              </div>
              <span style={{
                padding: '8px 20px', borderRadius: '20px', fontWeight: 700, fontSize: '14px',
                background: result.status === 'delivered' ? '#10b98120' : '#3b82f620',
                color: result.status === 'delivered' ? '#10b981' : '#60a5fa',
                border: `1px solid ${result.status === 'delivered' ? '#10b98140' : '#3b82f640'}`
              }}>{result.status?.replace(/_/g, ' ')?.toUpperCase()}</span>
            </div>

            {/* Progress Steps */}
            <div style={{ marginBottom: '28px' }}>
              <p style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Delivery Progress</p>
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                {STATUS_STEPS.map((step, i) => {
                  const done = i <= currentStep
                  const active = i === currentStep
                  return (
                    <div key={step} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                      {i < STATUS_STEPS.length - 1 && (
                        <div style={{
                          position: 'absolute', top: '14px', left: '50%', width: '100%',
                          height: '2px', background: done && i < currentStep ? '#3b82f6' : 'rgba(148,163,184,0.2)',
                          transition: 'background 0.3s', zIndex: 0
                        }} />
                      )}
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%', position: 'relative', zIndex: 1,
                        background: done ? (active ? '#3b82f6' : '#1d4ed8') : 'rgba(30,41,59,0.9)',
                        border: `2px solid ${done ? '#3b82f6' : 'rgba(148,163,184,0.2)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '12px', boxShadow: active ? '0 0 12px rgba(59,130,246,0.6)' : 'none'
                      }}>
                        {done ? '✓' : ''}
                      </div>
                      <p style={{
                        color: done ? '#94a3b8' : '#475569', fontSize: '10px', marginTop: '6px',
                        textAlign: 'center', fontWeight: done ? 700 : 400,
                        textTransform: 'capitalize', wordBreak: 'break-word', maxWidth: '60px'
                      }}>{step.replace(/_/g, ' ')}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Info Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {[
                { label: 'Recipient', value: result.recipient_name },
                { label: 'Phone', value: result.recipient_phone || '—' },
                { label: 'Weight', value: result.weight_kg ? `${result.weight_kg} kg` : '—' },
                { label: 'Est. Delivery', value: result.estimated_delivery ? new Date(result.estimated_delivery).toLocaleDateString() : '—' },
              ].map(item => (
                <div key={item.label} style={{ background: 'rgba(15,23,42,0.5)', borderRadius: '12px', padding: '14px 16px', border: '1px solid rgba(148,163,184,0.08)' }}>
                  <p style={{ color: '#64748b', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px' }}>{item.label}</p>
                  <p style={{ color: '#e2e8f0', fontSize: '15px', fontWeight: 600, margin: 0 }}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Timeline */}
            {result.tracking_events && result.tracking_events.length > 0 && (
              <div>
                <p style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 700, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tracking History</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {[...result.tracking_events].reverse().map((ev: any, i: number) => (
                    <div key={ev.id} style={{ display: 'flex', gap: '16px', paddingBottom: i < result.tracking_events.length - 1 ? '16px' : '0' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                          width: '12px', height: '12px', borderRadius: '50%', flexShrink: 0, marginTop: '4px',
                          background: i === 0 ? '#3b82f6' : '#334155',
                          border: i === 0 ? '2px solid #60a5fa' : '2px solid #475569',
                          boxShadow: i === 0 ? '0 0 8px rgba(59,130,246,0.5)' : 'none'
                        }} />
                        {i < result.tracking_events.length - 1 && (
                          <div style={{ width: '1px', flex: 1, background: 'rgba(148,163,184,0.15)', margin: '4px 0' }} />
                        )}
                      </div>
                      <div style={{ paddingBottom: '4px' }}>
                        <p style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: 600, margin: '0 0 2px' }}>
                          {ev.description || ev.event_type?.replace(/_/g, ' ')}
                        </p>
                        {ev.location_name && <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 2px' }}>📍 {ev.location_name}</p>}
                        <p style={{ color: '#475569', fontSize: '12px', margin: 0 }}>
                          {ev.occurred_at ? new Date(ev.occurred_at).toLocaleString() : ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
