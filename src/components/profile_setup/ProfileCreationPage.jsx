import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProfilePicturePlaceholder from '../../assets/img/profile_picture_placeholder_v1.jpg'
import { Image } from 'react-bootstrap'
import ProfileCreationForm from './ProfileCreationForm'

function ProfileCreationPage() {
  return (
    <>
      <div className='dark-bg'>
        <div className='centered-overlay-box'>
          <div className='position-relative'>
            <Link to={'/interests'}>
              <ArrowLeft className='left-icon-position' />
            </Link>
          </div>
          <header>
            <div className='ms-4 pt-5 mt-3'>
              <h1 className='fs-4 text-nowrap'>Show the world who you are</h1>
              <h2 className='fs-6 fst-italic fw-lighter'>Share Your Story, Skills, and Personality</h2>
            </div>
          </header>
          <Image
            src={ProfilePicturePlaceholder}
            roundedCircle
            className='profile-picture-placeholder mx-auto d-block'
          />
          <button className='secondary-btn mx-auto d-block mt-2 mb-3 small'>Change profile picture</button>
          <ProfileCreationForm />
        </div>
      </div>
    </>
  )
}

export default ProfileCreationPage
