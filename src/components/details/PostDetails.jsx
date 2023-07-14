import { Alert, Row, Spinner } from 'react-bootstrap'
import HomeNavbar from '../home/HomeNavbar'
import LeftCol from './LeftCol'
import RightCol from './RightCol'
import { useEffect, useState } from 'react'
import { getPostById, getProfileById } from '../../utils/api'
import { useSearchParams } from 'react-router-dom'

function PostDetails() {
  const [profileData, setProfileData] = useState([])
  const [postData, setPostData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  // eslint-disable-next-line no-unused-vars
  const [show, setShow] = useState(false)

  const [searchParams] = useSearchParams()
  const postId = searchParams.get('id')

  async function handleGetPostById(id) {
    setIsLoading(true)
    const { data, error } = await getPostById(id)
    if (error) {
      setErrorMsg(error.message)
      console.error(errorMsg)
    } else {
      setPostData(data)
      const foundProfile = await getProfileById(data.profile)
      if (foundProfile.error) {
        setErrorMsg(foundProfile.error.message)
        console.error(errorMsg)
      } else {
        setProfileData(foundProfile.data)
        console.log(foundProfile.data)
      }
    }
    setIsLoading(false)
  }

  useEffect(() => {
    handleGetPostById(postId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {errorMsg && <Alert variant='danger' onClose={() => setShow(false)} dismissible />}
      <HomeNavbar />
      <div className='page-content'>
        {isLoading ? (
          <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
            <Spinner animation='border' variant='success' />
          </div>
        ) : (
          <Row>
            <LeftCol
              name={profileData.name}
              surname={profileData.surname}
              profilePicture={profileData.profilePicture}
              biography={profileData.biography}
              averageRating={profileData.averageRating}
              location={profileData.location}
              gender={profileData.gender}
              spokenLanguages={profileData.spokenLanguages}
              interests={profileData.interests}
              profileId={profileData.id}
            />
            <RightCol
              authorName={profileData.name}
              authorSurname={profileData.surname}
              authorId={profileData.id}
              title={postData.title}
              content={postData.content}
              postPhoto={postData.imageUrl}
              availability={postData.availability}
              skillLevel={postData.skillLevel}
              category={postData.category.name}
              publicationDate={postData.publicationDate}
            />
          </Row>
        )}
      </div>
    </>
  )
}

export default PostDetails
