import { ArrowLeft } from 'lucide-react'
import AuthHeader from './AuthHeader'
import GoogleSignBtn from './GoogleSignBtn'
import RegisterForm from './RegisterForm'
import { Link } from 'react-router-dom'

function RegisterPage() {
  return (
    <div className='dark-bg'>
      <div className='centered-overlay-box'>
        <div className='centered-overlay-box'>
          <div className='position-relative'>
            <Link to={'/'}>
              <ArrowLeft className='left-icon-position' />
            </Link>
            <AuthHeader title='Register' subtitle='create a new account' />
          </div>
          <RegisterForm />
          <div className='d-flex align-items-center justify-content-center mt-4'>
            <div className='horizontal-separator ms-5'></div> <span className='mx-3 align-self-center'>OR</span>
            <div className='horizontal-separator me-5'></div>
          </div>
          <div className='mb-3'>
            <GoogleSignBtn />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
