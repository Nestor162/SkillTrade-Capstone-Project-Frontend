import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProfileCreationForm from './ProfileCreationForm'

function ProfileCreationPage() {
  return (
    <>
      <div className='dark-bg'>
        <div className='centered-overlay-box'>
          <div className='position-relative'>
            <Link to={'/profile-name'}>
              <ArrowLeft className='left-icon-position' />
            </Link>
          </div>
          <header>
            <div className='ms-4 pt-5 mt-3'>
              <h1 className='fs-4 text-nowrap'>Show the world who you are</h1>
              <h2 className='fs-6 fst-italic fw-lighter'>Share Your Story, Skills, and Personality</h2>
            </div>
          </header>
          <ProfileCreationForm />
        </div>
      </div>
    </>
  )
}

export default ProfileCreationPage
