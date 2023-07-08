import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import InterestsList from './InterestsList'

function SelectInterestPage() {
  return (
    <div className='dark-bg'>
      <div className='centered-overlay-box'>
        <div className='position-relative'>
          <Link to={'/'}>
            <ArrowLeft className='left-icon-position' />
          </Link>
        </div>
        <header>
          <div className='ms-4 pt-5 mt-4'>
            <h1 className='fs-1'>Let’s start creating your profile</h1>
            <h2 className='fs-4 fst-italic fw-lighter'>Please, select your interests</h2>
          </div>
        </header>
        <InterestsList />
      </div>
    </div>
  )
}

export default SelectInterestPage
