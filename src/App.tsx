import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
// import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            // <ProtectedRoute>
              <Home />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            // <ProtectedRoute>
              <Profile />
            // </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App
