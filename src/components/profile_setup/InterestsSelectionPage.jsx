import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import InterestsList from './InterestsList'
import { Alert, Button } from 'react-bootstrap'
import { useState } from 'react'
import { addInterestsToProfile } from '../../utils/api'

function SelectInterestPage() {
  const [selectedInterests, setSelectedInterests] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)

  const handleSelectInterest = name => {
    setSelectedInterests(prevSelectedInterests => {
      if (prevSelectedInterests.includes(name)) {
        // remove the interest from the selectedInterests array
        return prevSelectedInterests.filter(interest => interest !== name)
      } else {
        // add the interest to the selectedInterests array
        return [...prevSelectedInterests, name]
      }
    })
  }

  const payloadInterestList = {
    interests: selectedInterests
  }

  const handleCloseAlert = () => {
    setErrorMsg(null)
  }

  async function handleSubmit() {
    // fetch to save interests in current profile
    const profileId = localStorage.getItem('profileId')
    const response = await addInterestsToProfile(payloadInterestList, profileId)
    if (response.error) {
      setErrorMsg(response.error)
    }
  }

  return (
    <>
      {errorMsg && (
        <Alert
          key='danger'
          variant='danger'
          className='position-absolute start-0 end-0 top-0 z-3'
          onClick={handleCloseAlert}
        >
          {errorMsg}
        </Alert>
      )}
      <div className='dark-bg'>
        <div className='centered-overlay-box'>
          <div className='position-relative'>
            <Link to={'/'}>
              <ArrowLeft className='left-icon-position' />
            </Link>
          </div>
          <header>
            <div className='ms-4 pt-5 mt-3'>
              <h1 className='fs-4 text-nowrap'>Let’s start creating your profile</h1>
              <h2 className='fs-6 fst-italic fw-lighter'>Please, select your interests</h2>
            </div>
          </header>
          <InterestsList onSelectInterest={handleSelectInterest} />
          <div className='text-center'>
            <Button type='submit' className='mb-3 main-btn' onClick={handleSubmit}>
              CONTINUE
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SelectInterestPage
