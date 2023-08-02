import NotFound from './components/NotFound'
import LoginPage from './components/auth/LoginPage'
import RegisterPage from './components/auth/RegisterPage'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import InterestsSelectionPage from './components/profile_setup/InterestsSelectionPage'
import ProfileCreation from './components/profile_setup/ProfileCreationPage'
import ProfileNameSurnamePage from './components/profile_setup/ProfileNameSurnamePage'
import Homepage from './components/home/Homepage'
import PostDetails from './components/details/PostDetails'
import ProfileDetails from './components/details/ProfileDetails'
import MyProfile from './components/details/MyProfile'
import { useAuthStore } from './store/useAuthStore'

function App() {
  const token = useAuthStore(state => state.token)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={token ? <Navigate to='/home' /> : <LoginPage />} />
          <Route path='/register' element={token ? <Navigate to='/home' /> : <RegisterPage />} />
          <Route path='/interests' element={<InterestsSelectionPage />} />
          <Route path='/profile-name' element={<ProfileNameSurnamePage />} />
          <Route path='/profile-creation' element={<ProfileCreation />} />
          <Route path='/home' element={token ? <Homepage /> : <Navigate to='/' />} />
          <Route path='/post-details' element={<PostDetails />} />
          <Route path='/profile-details' element={<ProfileDetails />} />
          <Route path='/me' element={<MyProfile />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
