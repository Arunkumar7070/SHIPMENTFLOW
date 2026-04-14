import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authApi } from '../lib/api'
import toast from 'react-hot-toast'

export function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', role: 'customer' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await authApi.register(form)
      toast.success('Account created! Please login.')
      navigate('/login')
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Registration failed')
    } finally { setLoading(false) }
  }

  const inp: React.CSSProperties = {
    width: '100%', padding: '12px 16px', boxSizing: 'border-box',
    background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(148,163,184,0.2)',
    borderRadius: '10px', color: '#f1f5f9', fontSize: '15px', outline: 'none'
  }
  const lbl: React.CSSProperties = {
    display: 'block', color: '#94a3b8', fontSize: '12px', fontWeight: 700,
    marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px'
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Segoe UI', system-ui, sans-serif", padding: '24px'
    }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '64px', height: '64px', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            borderRadius: '18px', fontSize: '28px', marginBottom: '14px',
            boxShadow: '0 16px 36px rgba(59,130,246,0.4)'
          }}>📦</div>
          <h1 style={{ color: '#f8fafc', fontSize: '28px', fontWeight: 800, margin: 0 }}>CourierTrack</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>Create your account</p>
        </div>

        <div style={{
          background: 'rgba(30,41,59,0.85)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(148,163,184,0.1)', borderRadius: '20px',
          padding: '32px', boxShadow: '0 25px 50px rgba(0,0,0,0.4)'
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={lbl}>Full Name</label>
                <input style={inp} required placeholder="John Doe"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label style={lbl}>Phone</label>
                <input style={inp} placeholder="+60123456789"
                  value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={lbl}>Email Address</label>
              <input style={inp} type="email" required placeholder="you@example.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={lbl}>Password</label>
              <input style={inp} type="password" required placeholder="Min 8 characters"
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={lbl}>Account Role</label>
              <select style={{ ...inp, cursor: 'pointer' }}
                value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                <option value="customer">Customer — Track & send packages</option>
                <option value="driver">Driver — Handle deliveries</option>
                <option value="dispatcher">Dispatcher — Manage operations</option>
                <option value="admin">Admin — Full access</option>
              </select>
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '13px',
              background: loading ? 'rgba(59,130,246,0.5)' : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              color: '#fff', border: 'none', borderRadius: '10px',
              fontSize: '15px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 8px 24px rgba(59,130,246,0.35)'
            }}>
              {loading ? 'Creating account...' : '✓  Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: '#64748b', fontSize: '14px', marginTop: '20px' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#3b82f6', fontWeight: 700, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
