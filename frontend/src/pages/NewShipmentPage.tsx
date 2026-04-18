
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { shipmentsApi } from '../lib/api'
import toast from 'react-hot-toast'

// ✅ stable styles (outside)
const card = { padding: '20px', background: '#1e293b', borderRadius: '12px', marginBottom: '20px' }
const inp = { padding: '10px', width: '100%', borderRadius: '8px', marginBottom: '10px' }
const grid2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }

// ✅ stable component
const AddrSection = ({ title, icon, field, form, updateAddress }: any) => (
  <div style={card}>
    <h3 style={{ color: '#f1f5f9', marginBottom: '12px' }}>
      {icon} {title}
    </h3>

    <input
      style={inp}
      placeholder="Street"
      value={form[field].street}
      onChange={e => updateAddress(field, 'street', e.target.value)}
      autoComplete="off"
    />

    <div style={grid2}>
      <input
        style={inp}
        placeholder="City"
        value={form[field].city}
        onChange={e => updateAddress(field, 'city', e.target.value)}
        autoComplete="off"
      />
      <input
        style={inp}
        placeholder="State"
        value={form[field].state}
        onChange={e => updateAddress(field, 'state', e.target.value)}
        autoComplete="off"
      />
    </div>

    <div style={grid2}>
      <input
        style={inp}
        placeholder="Postal Code"
        value={form[field].postal_code}
        onChange={e => updateAddress(field, 'postal_code', e.target.value)}
        autoComplete="off"
      />
      <input
        style={inp}
        placeholder="Country"
        value={form[field].country}
        onChange={e => updateAddress(field, 'country', e.target.value)}
        autoComplete="off"
      />
    </div>
  </div>
)

export default function NewShipmentPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    recipient_name: '',
    recipient_phone: '',
    recipient_email: '',
    weight_kg: '',
    description: '',
    origin: { street: '', city: '', state: '', postal_code: '', country: '' },
    destination: { street: '', city: '', state: '', postal_code: '', country: '' }
  })

  const updateField = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const updateAddress = (type: 'origin' | 'destination', key: string, value: string) => {
    setForm(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: value
      }
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    try {
      await shipmentsApi.create({
        recipient_name: form.recipient_name,
        recipient_phone: form.recipient_phone,
        recipient_email: form.recipient_email,
        weight_kg: form.weight_kg ? parseFloat(form.weight_kg) : null,
        description: form.description,
        origin_address: form.origin,
        destination_address: form.destination
      })

      toast.success('Shipment created')
      navigate('/shipments')

    } catch {
      toast.error('Failed to create shipment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: '30px', maxWidth: '700px', margin: 'auto' }}>

      {/* 👤 Recipient */}
      <div style={card}>
        <h3 style={{ color: '#f1f5f9' }}>👤 Recipient</h3>

        <input
          style={inp}
          placeholder="Full Name"
          value={form.recipient_name}
          onChange={e => updateField('recipient_name', e.target.value)}
          autoComplete="off"
        />

        <input
          style={inp}
          placeholder="Phone"
          value={form.recipient_phone}
          onChange={e => updateField('recipient_phone', e.target.value)}
          autoComplete="off"
        />

        <input
          style={inp}
          placeholder="Email"
          value={form.recipient_email}
          onChange={e => updateField('recipient_email', e.target.value)}
          autoComplete="off"
        />
      </div>

      {/* 📍 Origin */}
      <AddrSection
        title="Origin"
        icon="📍"
        field="origin"
        form={form}
        updateAddress={updateAddress}
      />

      {/* 🎯 Destination */}
      <AddrSection
        title="Destination"
        icon="🎯"
        field="destination"
        form={form}
        updateAddress={updateAddress}
      />

      {/* 📦 Package */}
      <div style={card}>
        <h3 style={{ color: '#f1f5f9' }}>📦 Package</h3>

        <input
          style={inp}
          placeholder="Weight (kg)"
          value={form.weight_kg}
          onChange={e => updateField('weight_kg', e.target.value)}
          autoComplete="off"
        />

        <input
          style={inp}
          placeholder="Description"
          value={form.description}
          onChange={e => updateField('description', e.target.value)}
          autoComplete="off"
        />
      </div>

      <button type="submit">
        {loading ? 'Creating...' : 'Create Shipment'}
      </button>

    </form>
  )
}
