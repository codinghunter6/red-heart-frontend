import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { getToken } from './api'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import DoctorSignIn from './pages/DoctorSignIn'
import DoctorRegister from './pages/DoctorRegister'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctor/signin" element={<DoctorSignIn />} />
        <Route path="/doctor/register" element={<DoctorRegister />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
