import { useEffect, useState } from 'react'
import { getProfileById } from '../../utils/api'
import NewReviewAccordion from '../reviews/NewReviewAccordion'
import ReviewList from '../reviews/ReviewList'
import LeftColProfile from './LeftColProfile'
import RightColProfile from './RightColProfile'
import { useSearchParams } from 'react-router-dom'
import { Alert, Row, Spinner } from 'react-bootstrap'
import HomeNavbar from '../home/HomeNavbar'

function ProfileDetails() {
  const [profileData, setProfileData] = useState([])
  const [postData, setPostData] = useState([])
  const [isLoading, setIsLoading] = useState(false) //remind to change to true
  const [errorMsg, setErrorMsg] = useState('')

  return (
    <>
      {errorMsg && <Alert variant='danger' onClose={() => setErrorMsg('')} dismissible />}
      <HomeNavbar />
      <div className='page-content'>
        {isLoading ? (
          <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
            <Spinner animation='border' variant='success' />
          </div>
        ) : (
          <Row>
            <LeftColProfile />
            <RightColProfile />
          </Row>
        )}
      </div>
    </>
  )
}

export default ProfileDetails
