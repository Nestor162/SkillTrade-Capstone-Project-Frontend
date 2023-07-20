import NotFound from './components/NotFound'
import LoginPage from './components/auth/LoginPage'
import RegisterPage from './components/auth/RegisterPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import InterestsSelectionPage from './components/profile_setup/InterestsSelectionPage'
import ProfileCreation from './components/profile_setup/ProfileCreationPage'
import ProfileNameSurnamePage from './components/profile_setup/ProfileNameSurnamePage'
import Homepage from './components/home/Homepage'
import PostDetails from './components/details/PostDetails'
import ProfileDetails from './components/details/ProfileDetails'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import MyProfile from './components/details/MyProfile'

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [navigate, token])
  if (!token) {
    return null
  }
  return children
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route
            path='/interests'
            element={
              <ProtectedRoute>
                <InterestsSelectionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile-name'
            element={
              <ProtectedRoute>
                <ProfileNameSurnamePage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile-creation'
            element={
              <ProtectedRoute>
                <ProfileCreation />
              </ProtectedRoute>
            }
          />
          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/post-details'
            element={
              <ProtectedRoute>
                <PostDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile-details'
            element={
              <ProtectedRoute>
                <ProfileDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path='/me'
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
}

export default App
