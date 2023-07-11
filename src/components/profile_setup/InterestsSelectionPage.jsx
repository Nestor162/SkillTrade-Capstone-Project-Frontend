import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import InterestsList from './InterestsList'
import { Alert, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useState } from 'react'
import { updateProfile } from '../../utils/api'

function SelectInterestPage() {
  const [selectedInterests, setSelectedInterests] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)
  const navigate = useNavigate()

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
    const response = await updateProfile(payloadInterestList, profileId)
    if (response.error) {
      setErrorMsg(response.error)
    } else {
      navigate('/profile-name')
    }
  }

  // Show message when interests selected are less than 3
  const renderTooltip = props => (
    <Tooltip id='button-tooltip' {...props}>
      You must select at least 3 interests to continue
    </Tooltip>
  )

  const [showTooltip, setShowTooltip] = useState(false)

  const handleMouseEnter = () => {
    setShowTooltip(true)
  }
  const handleMouseLeave = () => {
    setShowTooltip(false)
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
            <OverlayTrigger placement='top' overlay={renderTooltip} show={showTooltip && selectedInterests.length < 3}>
              <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <Button
                  type='submit'
                  className='mb-3 main-btn'
                  onClick={handleSubmit}
                  disabled={selectedInterests.length < 3}
                >
                  CONTINUE
                </Button>
              </div>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    </>
  )
}

export default SelectInterestPage
