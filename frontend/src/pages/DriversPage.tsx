
import { useEffect, useState } from 'react'
import { driversApi } from '../lib/api'
import toast from 'react-hot-toast'

export default function DriversPage() {
  const [drivers, setDrivers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadDrivers = () => {
    setLoading(true)
    driversApi.list()
      .then(r => setDrivers(r.data))
      .catch(() => toast.error('Failed to load drivers'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadDrivers()
  }, [])

  // 🔥 CREATE DRIVER FUNCTION
  const createDriver = async () => {
    try {
      await fetch("http://localhost:8000/api/drivers/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          license_number: "DL123456",
          vehicle_type: "bike",
          vehicle_plate: "KA01AB1234"
        })
      })

      toast.success("Driver created")
      loadDrivers()
    } catch {
      toast.error("Failed to create driver")
    }
  }

  const card: React.CSSProperties = {
    background: 'rgba(30,41,59,0.8)',
    border: '1px solid rgba(148,163,184,0.1)',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.3)'
  }

  return (
    <div style={{ padding: '32px', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* 🔥 HEADER + BUTTON */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ color: '#f1f5f9', fontSize: '26px', fontWeight: 800, margin: '0 0 8px' }}>🚗 Drivers</h1>
          <p style={{ color: '#64748b', fontSize: '14px' }}>{drivers.length} registered drivers</p>
        </div>

        <button
          onClick={createDriver}
          style={{
            padding: '10px 16px',
            borderRadius: '10px',
            border: 'none',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            color: '#fff',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          + Add Driver
        </button>
      </div>

      <div style={{ marginTop: '24px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
            <div style={{
              width: '36px',
              height: '36px',
              border: '3px solid rgba(59,130,246,0.2)',
              borderTopColor: '#3b82f6',
              borderRadius: '50%',
              margin: '0 auto 12px',
              animation: 'spin 1s linear infinite'
            }} />
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        ) : drivers.length === 0 ? (
          <div style={{ ...card, textAlign: 'center', padding: '60px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🚗</div>
            <p style={{ color: '#64748b', marginBottom: '16px' }}>No drivers registered yet</p>

            {/* 🔥 BUTTON ALSO HERE */}
            <button
              onClick={createDriver}
              style={{
                padding: '10px 16px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Create First Driver
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {drivers.map((d: any) => (
              <div key={d.id} style={card}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: d.is_available
                      ? 'linear-gradient(135deg, #10b981, #059669)'
                      : 'linear-gradient(135deg, #6b7280, #4b5563)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '18px'
                  }}>
                    {(d.user?.name || 'D')[0].toUpperCase()}
                  </div>

                  <div>
                    <p style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '16px', margin: '0 0 2px' }}>
                      {d.user?.name || d.user?.email}
                    </p>

                    <span style={{
                      padding: '2px 10px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: 700,
                      background: d.is_available ? '#10b98120' : '#6b728020',
                      color: d.is_available ? '#10b981' : '#9ca3af'
                    }}>
                      {d.is_available ? '● Available' : '○ Unavailable'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div><b>Vehicle:</b> {d.vehicle_type}</div>
                  <div><b>Plate:</b> {d.vehicle_plate}</div>
                  <div><b>License:</b> {d.license_number}</div>
                  <div><b>Phone:</b> {d.user?.phone}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
