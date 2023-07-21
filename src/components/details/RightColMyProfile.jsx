import { Alert, Badge, Card, Col, Image, Spinner } from 'react-bootstrap'
import { getPostByAuthorId, getProfileById, updateProfile } from '../../utils/api'
import { useEffect, useState } from 'react'
import { convertSnakeCaseToCapitalized, formatDate, getAge } from '../../utils/stringUtils'
import ProfilePicturePlaceholder from '../../assets/img/profile_picture_placeholder_v1.jpg'
import { MapPin, PenBox } from 'lucide-react'
import StarRatings from 'react-star-ratings'
import YourSinglePost from './YourSinglePost'
import EditProfileModal from './EditProfileModal'

function RightColMyProfile() {
  const [profileData, setProfileData] = useState(null)
  const [postData, setPostData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [errorMsg, setErrorMsg] = useState('')

  const profileId = localStorage.getItem('profileId')

  const handleGetProfileById = async id => {
    setIsLoading(true)
    const { data, error } = await getProfileById(id)
    if (error) {
      setErrorMsg(error.message)
      console.error(errorMsg)
    } else {
      setProfileData(data)
      const foundPosts = await getPostByAuthorId(data.id)
      if (foundPosts.error) {
        setErrorMsg(foundPosts.error.message)
        console.error(errorMsg)
      } else {
        setPostData(foundPosts.data)
      }
    }
    setIsLoading(false)
  }

  // EDIT PROFILE
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)

  const handleUpdateProfile = async updatedData => {
    const payload = {
      ...updatedData,
      langs: updatedData.spokenLanguages
    }
    const response = await updateProfile(payload, profileId)

    if (response.error) {
      setErrorMsg(response.error)
    } else {
      handleGetProfileById(profileId)
    }
  }

  // Function to update postData state
  const handlePostDelete = postId => {
    // Remove the deleted post from the postData array
    const updatedPosts = postData.filter(post => post.id !== postId)
    // Update the state with the new array
    setPostData(updatedPosts)
  }

  useEffect(() => {
    handleGetProfileById(profileId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  return (
    <Col xs={10} md={7} className='mx-auto mx-lg-3 mx-xl-0 mt-4 mb-4'>
      {isLoading ? (
        <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
          <Spinner animation='border' variant='success' />
        </div>
      ) : (
        <Card className='right-col-details border-0'>
          <div
            className='edit-profile-btn p-1 px-2 d-flex justify-content-center align-items-center gap-2'
            onClick={() => setShowEditProfileModal(true)}
          >
            <span>
              Edit<span className='d-none d-sm-inline'> Profile</span>
            </span>
            <PenBox size={'18px'} />
          </div>

          <EditProfileModal
            show={showEditProfileModal}
            handleClose={() => setShowEditProfileModal(false)}
            handleUpdateProfile={handleUpdateProfile}
            currentName={profileData.name}
            currentSurname={profileData.surname}
            currentBio={profileData.biography}
            currentInterests={profileData.interests}
            currentSpokenLanguages={profileData.spokenLanguages}
            currentBirthDate={profileData.birthDate}
            currentGender={profileData.gender}
          />

          <Card.Body>
            <Image
              src={profileData.profilePicture ? profileData.profilePicture : ProfilePicturePlaceholder}
              roundedCircle
              className='profile-picture-placeholder mx-auto d-block mt-3'
              width={'85px'}
              height={'85px'}
            />
            <Card.Title className='mb-0 fs-3 text-center mt-3'>
              {profileData.name + ' ' + profileData.surname}
            </Card.Title>
            <div className='text-center'>
              <div className='d-flex justify-content-center align-items-center mt-1'>
                <MapPin size={'22px'} />
                <span className='fs-5 mb-2 mt-2'>{profileData.location}</span>
              </div>
              <div className='d-flex align-items-end justify-content-center'>
                <StarRatings
                  rating={profileData.averageRating}
                  starRatedColor='var(--tertiary-color)'
                  numberOfStars={5}
                  starDimension='30px'
                  starSpacing='2px'
                />
                {profileData.averageRating !== 0 && (
                  <div className='text-muted mt-2 fs-5'>({profileData.averageRating.toFixed(1)})</div>
                )}
              </div>
              {profileData.averageRating === 0 && <div className='text-muted mt-1 d-block'>(not rated yet)</div>}
            </div>
            <div
              className='mt-5 mx-3 mx-md-5 fs-6'
              style={{ position: 'relative', borderRadius: '10px', border: '1px solid black', padding: '20px' }}
            >
              <div
                className='fs-4'
                style={{ position: 'absolute', top: '-20px', left: '20px', background: 'white', padding: '0 10px' }}
              >
                Biography
              </div>
              {profileData.biography}
            </div>

            <div className='mt-5 mx-5'>
              <h5 className='mb-1'>Gender</h5>
              <span className='fs-5'>{convertSnakeCaseToCapitalized(profileData.gender)}</span>
            </div>

            <div className='mt-4 mx-5'>
              <h5 className='mb-1'>Birth Date</h5>
              <span className='fs-5'>
                <span>{formatDate(profileData.birthDate)}&nbsp;</span>
                <span className='small text-muted'>&#40;{getAge(profileData.birthDate) + ' y/o'}&#41;</span>
              </span>
            </div>

            <div className='mt-4 mx-5'>
              <h5>Spoken Languages</h5>
              <div className='d-flex gap-2 fs-5 flex-wrap'>
                {profileData.spokenLanguages.map(language => (
                  <Badge className='badge-secondary' key={language.languageCode}>
                    {language.languageName}
                  </Badge>
                ))}
              </div>
            </div>

            <div className='mt-4 mb-5 mx-5'>
              <h5>Interests</h5>
              <div className='d-flex gap-2 fs-5 flex-wrap'>
                {profileData.interests.map(interest => (
                  <Badge className='badge-secondary' key={interest.id}>
                    {interest.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className='mt-5 mx-0 mx-md-5'>
              <h5 className='mb-3'>Your Posts</h5>
              {postData && postData.length > 0 ? (
                <>
                  {postData.map(post => (
                    <YourSinglePost
                      key={post.id}
                      postId={post.id}
                      title={post.title}
                      content={post.content}
                      availability={convertSnakeCaseToCapitalized(post.availability)}
                      skillLevel={convertSnakeCaseToCapitalized(post.skillLevel)}
                      category={post.category.name}
                      authorName={post.authorName}
                      authorSurname={post.authorSurname}
                      publicationDate={formatDate(post.publicationDate)}
                      handlePostDelete={handlePostDelete}
                    />
                  ))}
                </>
              ) : (
                <p>You don’t have any posts yet</p>
              )}
            </div>

            {errorMsg && (
              <Alert
                className='position-fixed top-0 start-0 w-100'
                style={{ zIndex: 9999 }}
                variant='danger'
                onClose={() => setErrorMsg(null)}
                dismissible
              >
                <Alert.Heading>Error!</Alert.Heading>
                {errorMsg}
              </Alert>
            )}
          </Card.Body>
        </Card>
      )}
    </Col>
  )
}

export default RightColMyProfile
