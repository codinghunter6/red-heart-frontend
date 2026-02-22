const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function signIn(email, password, isDoctor = false) {
  const path = isDoctor ? '/doctor/signin' : '/signin';
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(typeof data.detail === 'string' ? data.detail : (Array.isArray(data.detail) ? data.detail[0]?.msg : null) || 'Sign in failed');
  return data;
}

export async function register(email, password, isDoctor = false) {
  const path = isDoctor ? '/doctor/register' : '/register';
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(typeof data.detail === 'string' ? data.detail : (Array.isArray(data.detail) ? data.detail[0]?.msg : null) || 'Registration failed');
  return data;
}

export function setToken(token) {
  if (token) localStorage.setItem('red_heart_token', token);
  else localStorage.removeItem('red_heart_token');
}

export function getToken() {
  return localStorage.getItem('red_heart_token');
}
