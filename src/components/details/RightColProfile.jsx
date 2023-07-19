import { Alert, Badge, Card, Col, Image, Spinner } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getPostByAuthorId, getProfileById } from '../../utils/api'
import ReviewList from '../reviews/ReviewList'
import NewReviewAccordion from '../reviews/NewReviewAccordion'
import ProfilePicturePlaceholder from '../../assets/img/profile_picture_placeholder_v1.jpg'
import { MapPin } from 'lucide-react'
import StarRatings from 'react-star-ratings'
import { convertSnakeCaseToCapitalized, formatDate, getAge } from '../../utils/stringUtils'
import ProfilePostsCarousel from './ProfilePostsCarousel'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

function RightColProfile() {
  const [profileData, setProfileData] = useState(null)
  const [postData, setPostData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const [searchParams] = useSearchParams()
  const profileId = searchParams.get('id')

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
        setPostData(foundPosts.data.content)
      }
    }
    setIsLoading(false)
  }

  useEffect(() => {
    handleGetProfileById(profileId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  // react-multi-carousel configuration
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }

  return (
    <Col xs={10} md={7} className='mx-auto mx-lg-3 mx-xl-0 mt-4 mb-4'>
      {isLoading ? (
        <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
          <Spinner animation='border' variant='success' />
        </div>
      ) : (
        <Card className='right-col-details border-0'>
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

          <div className='mt-5 mx-5'>
            <h5 className='mb-3'>More posts from this profile</h5>
            {postData ? (
              <div className='position-relative mb-5'>
                <div className='opacity-layout-start'></div>
                <Carousel
                  responsive={responsive}
                  swipeable={true}
                  infinite={true}
                  keyBoardControl={true}
                  removeArrowOnDeviceType={['tablet', 'mobile']}
                  showDots={true}
                >
                  {postData.map(post => (
                    <ProfilePostsCarousel
                      key={post.id}
                      title={post.title}
                      content={post.content}
                      skillLevel={post.skillLevel}
                      availability={post.availability}
                      imageUrl={post.imageUrl}
                      category={post.category.name}
                      postId={post.id}
                      publicationDate={formatDate(post.publicationDate)}
                    />
                  ))}
                </Carousel>
                <div className='opacity-layout-end'></div>
              </div>
            ) : (
              <p className='text-center fst-italic text-muted mb-5'>No posts yet</p>
            )}
          </div>

          <div className='ms-5 ps-3'>
            <NewReviewAccordion />
          </div>
          <ReviewList />
        </Card>
      )}
    </Col>
  )
}

export default RightColProfile
