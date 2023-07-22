import { Card, Col, Image, Spinner } from 'react-bootstrap'
import { getAllProfiles } from '../../utils/api'
import { useEffect, useState } from 'react'
import ProfilePicturePlaceholder from '../../assets/img/profile_picture_placeholder_v1.jpg'
import { Link, useSearchParams } from 'react-router-dom'
import { truncateText } from '../../utils/stringUtils'

function LeftColPost() {
  const [recommendedProfiles, setRecommendedProfiles] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [searchParams] = useSearchParams()

  async function getRecommendedProfiles() {
    const { data, error } = await getAllProfiles()
    if (error) {
      console.error(error.message)
    } else {
      const currentUserId = searchParams.get('id')
      let profiles = data.content.filter(profile => profile.id !== currentUserId)
      const randomProfiles = []
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * profiles.length)
        randomProfiles.push(profiles[randomIndex])
        profiles.splice(randomIndex, 1)
      }
      setRecommendedProfiles(randomProfiles)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getRecommendedProfiles()
  }, [])

  return (
    <>
      {isLoading ? (
        <div className='d-flex align-items-center justify-content-center' style={{ height: '360px' }}>
          <Spinner animation='border' variant='success' />
        </div>
      ) : (
        <Col xs={4} className='d-none d-md-flex'>
          <Card className='left-col-details ms-5 border-0 mt-4'>
            <Card.Body className='text-dark'>
              <h4 className='mb-4'>More interesting profiles</h4>
              {recommendedProfiles.map(profile => (
                <Link key={profile.id} to={`/profile-details?id=${profile.id}`} className='text-decoration-none'>
                  <Card className='mb-3'>
                    <Image
                      src={profile.profilePicture ? profile.profilePicture : ProfilePicturePlaceholder}
                      roundedCircle
                      className='profile-picture-placeholder d-block mx-auto mt-3'
                      width={'55px'}
                    />
                    <Card.Body>
                      <Card.Title>
                        {profile.name} {profile.surname}
                      </Card.Title>
                      <Card.Text>{truncateText(profile.biography, 100)}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              ))}
            </Card.Body>
          </Card>
        </Col>
      )}
    </>
  )
}

export default LeftColPost
