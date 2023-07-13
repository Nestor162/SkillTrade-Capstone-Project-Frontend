import { Card, Col, Image, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { CalendarClock, Signal, Tag } from 'lucide-react'
import { useEffect, useState } from 'react'
import ProfilePicturePlaceholder from '../../assets/img/profile_picture_placeholder_v1.jpg'

function SinglePost({
  title,
  content,
  availability,
  skillLevel,
  category,
  publicationDate,
  authorName,
  authorSurname,
  postPhoto
}) {
  const [profilePic, setProfilePic] = useState('')

  useEffect(() => {
    setProfilePic(localStorage.getItem('profilePicture'))
  }, [])
  return (
    <Card className='custom-card'>
      <Card.Header className='d-flex'>
        <Image
          src={profilePic ? profilePic : ProfilePicturePlaceholder}
          roundedCircle
          className='profile-picture-placeholder'
          width={'40px'}
          height={'40px'}
        />
        <div className=''>
          <div className='fw-medium ms-2'>{authorName + ' ' + authorSurname}</div>
          <div className='small text-secondary ms-2'>{publicationDate}</div>
        </div>
      </Card.Header>
      {postPhoto && <Card.Img variant='top' className='rounded-0' src={postPhoto} />}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>
        <div className='d-flex gap-3 small text-secondary'>
          <Row>
            <Col xs={'auto'}>
              <Row className='flex-column align-items-center'>
                <Col xs='auto'>
                  <Tag size={'18px'} />
                </Col>
                <Col xs='auto'>
                  <div>{category}</div>
                </Col>
              </Row>
            </Col>
            <Col xs={'auto'}>
              <Row className='flex-column align-items-center'>
                <Col xs='auto'>
                  <CalendarClock size={'18px'} />
                </Col>
                <Col xs='auto'>
                  <div>{availability}</div>
                </Col>
              </Row>
            </Col>
            <Col xs={'auto'}>
              <Row className='flex-column align-items-center'>
                <Col xs='auto'>
                  <Signal size={'18px'} />
                </Col>
                <Col xs='auto'>
                  <div>{skillLevel}</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        {/* <Button variant='primary'>Go somewhere</Button> */}
      </Card.Body>
    </Card>
  )
}
SinglePost.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  skillLevel: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorSurname: PropTypes.string.isRequired,
  postPhoto: PropTypes.string.isRequired,
  publicationDate: PropTypes.instanceOf(Date).isRequired
}
export default SinglePost
