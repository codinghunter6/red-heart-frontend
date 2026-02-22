import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signIn, setToken } from '../api'
import '../styles/Auth.css'

export default function DoctorSignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { access_token } = await signIn(email, password, true)
      setToken(access_token)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page auth-page--doctor">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="auth-logo">♥</span>
          <h1>Red Heart</h1>
          <p>Clinician sign in</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@clinic.example.com"
              required
              autoComplete="email"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </label>
          <button type="submit" disabled={loading} className="auth-submit">
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className="auth-switch">
          New clinician? <Link to="/doctor/register">Register</Link>
        </p>
      </div>
    </div>
  )
}
