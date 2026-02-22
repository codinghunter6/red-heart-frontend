import { Link } from 'react-router-dom'
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
      <div style={styles.card}>
        <h1 style={styles.title}>♥ Red Heart</h1>
        <p style={styles.subtitle}>Mental health management</p>
        {token ? (
          <div style={styles.signedIn}>
            <p>Signed in as <strong>{email}</strong> ({role})</p>
            <button type="button" onClick={handleSignOut} style={styles.button}>
              Sign out
            </button>
          </div>
        ) : (
          <div style={styles.links}>
            <p>
              <Link to="/signin">Patient sign in</Link>
              {' · '}
              <Link to="/register">Patient register</Link>
            </p>
            <p>
              <Link to="/doctor/signin">Clinician sign in</Link>
              {' · '}
              <Link to="/doctor/register">Clinician register</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(160deg, #e8f4f8 0%, #f0f7fa 100%)',
    padding: '1rem',
    fontFamily: 'system-ui, sans-serif',
  },
  card: {
    background: '#fff',
    borderRadius: 12,
    padding: '2rem',
    maxWidth: 420,
    width: '100%',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
  },
  title: { margin: 0, fontSize: '1.5rem', color: '#1a2b3c' },
  subtitle: { margin: '0.35rem 0 1rem', color: '#5a6b7c', fontSize: '0.95rem' },
  signedIn: { marginTop: '1rem' },
  button: {
    marginTop: '0.75rem',
    padding: '0.5rem 1rem',
    background: '#5a8fa8',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  links: { marginTop: '1rem', fontSize: '0.95rem' },
}
