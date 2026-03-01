import { useNavigate } from 'react-router-dom'
import { getToken, setToken } from '../api'

function parseJwtPayload(token) {
  try {
    const base64 = token.split('.')[1]
    return base64 ? JSON.parse(atob(base64)) : null
  } catch {
    return null
  }
}

export default function Home() {
  const navigate = useNavigate()
  const token = getToken()
  const payload = token ? parseJwtPayload(token) : null
  const role = payload?.role ?? null
  const email = payload?.sub ?? null

  function handleSignOut() {
    setToken(null)
    window.location.href = '/'
  }

  return (
    <div style={styles.page}>
      {/* Hero image fills the full viewport */}
      <img src="/hero.png" alt="" style={styles.heroImg} />
      {/* Dark overlay — stronger at top for navbar, subtle overall */}
      <div style={styles.overlay} />

      {/* ── Header bar ── */}
      <header style={styles.header}>
        {/* Brand */}
        <div style={styles.brand}>
          <span style={styles.brandHeart}>♥</span>
          <span style={styles.brandName}>Red Heart</span>
        </div>

        {/* Headline (centre) */}
        <h1 style={styles.headline}>Your mental health, our priority.</h1>

        {/* Actions (right) */}
        {token ? (
          <div style={styles.signedIn}>
            <span style={styles.signedInText}>{email}</span>
            <span style={styles.roleBadge}>{role}</span>
            <button type="button" onClick={handleSignOut} style={styles.outlineBtn}>
              Sign out
            </button>
          </div>
        ) : (
          <div style={styles.cta}>
            <button
              type="button"
              onClick={() => navigate('/signin')}
              style={styles.primaryBtn}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => navigate('/register')}
              style={styles.secondaryBtn}
            >
              Register
            </button>
          </div>
        )}
      </header>
    </div>
  )
}

const styles = {
  page: {
    position: 'fixed',
    inset: 0,
    overflow: 'hidden',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  heroImg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    zIndex: 0,
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, rgba(10,10,20,0.55) 0%, rgba(10,10,20,0.1) 30%)',
    zIndex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2.5rem',
    height: '4.5rem',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    background: 'rgba(10,10,20,0.35)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flexShrink: 0,
  },
  brandHeart: {
    fontSize: '1.4rem',
    color: '#e84360',
    filter: 'drop-shadow(0 0 6px rgba(232,67,96,0.7))',
  },
  brandName: {
    fontSize: '1.15rem',
    fontWeight: 700,
    color: '#fff',
    letterSpacing: '0.02em',
  },
  headline: {
    flex: 1,
    textAlign: 'center',
    margin: 0,
    fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: '0.01em',
    textShadow: '0 1px 6px rgba(0,0,0,0.4)',
    padding: '0 1rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cta: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    flexShrink: 0,
  },
  primaryBtn: {
    padding: '0.5rem 1.25rem',
    background: '#c41e3a',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 700,
    letterSpacing: '0.02em',
    boxShadow: '0 2px 12px rgba(196,30,58,0.45)',
  },
  secondaryBtn: {
    padding: '0.5rem 1.25rem',
    background: 'rgba(255,255,255,0.12)',
    color: '#fff',
    border: '1.5px solid rgba(255,255,255,0.45)',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 600,
  },
  signedIn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    flexShrink: 0,
  },
  signedInText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: '0.88rem',
  },
  roleBadge: {
    background: 'rgba(196,30,58,0.8)',
    color: '#fff',
    padding: '0.15rem 0.6rem',
    borderRadius: 20,
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'capitalize',
  },
  outlineBtn: {
    padding: '0.5rem 1.25rem',
    background: 'transparent',
    color: '#fff',
    border: '1.5px solid rgba(255,255,255,0.45)',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 600,
  },
}
