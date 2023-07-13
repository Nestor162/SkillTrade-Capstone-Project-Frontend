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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/interests' element={<InterestsSelectionPage />} />
          <Route path='/profile-name' element={<ProfileNameSurnamePage />} />
          <Route path='/profile-creation' element={<ProfileCreation />} />
          <Route path='/home' element={<Homepage />} />
          <Route path='/post-details' element={<PostDetails />} />
          <Route path='/profile-details' element={<ProfileDetails />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
