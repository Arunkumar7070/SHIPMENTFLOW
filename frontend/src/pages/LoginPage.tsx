import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { authApi } from '../lib/api'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { setUser } = useAuthStore()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data } = await authApi.login(email, password)

      // ✅ FIX 1: correct token key
      localStorage.setItem('token', data.access_token)

      setUser(data.user)

      toast.success('Welcome back!')
      navigate('/dashboard')

    } catch (error: any) {

      // ✅ FIX 2: safe error (no React crash)
      let message = 'Login failed'

      if (error.response?.data?.detail) {
        if (Array.isArray(error.response.data.detail)) {
          message = error.response.data.detail[0]?.msg
        } else {
          message = error.response.data.detail
        }
      }

      toast.error(message)

    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      padding: '24px'
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '28px'
          }}>
            📦
          </div>
          <h1 style={{ color: '#f8fafc', fontSize: '32px', fontWeight: 800, margin: 0 }}>
            CourierTrack
          </h1>
          <p style={{ color: '#94a3b8', marginTop: '8px' }}>
            Courier Management System
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(30,41,59,0.8)',
          borderRadius: '20px',
          padding: '36px',
          border: '1px solid rgba(148,163,184,0.1)'
        }}>
          <h2 style={{ color: '#f1f5f9', marginBottom: '20px' }}>
            Sign in to your account
          </h2>

          <form onSubmit={handleSubmit}>
            
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                marginBottom: '14px'
              }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                marginBottom: '18px'
              }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                color: '#fff',
                fontWeight: 700,
                border: 'none'
              }}
            >
              {loading ? 'Signing in...' : '→ Sign In'}
            </button>

          </form>

          <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
            <Link to="/track">📍 Track Package</Link>
            <Link to="/register">✨ Register</Link>
          </div>

        </div>
      </div>
    </div>
  )
}