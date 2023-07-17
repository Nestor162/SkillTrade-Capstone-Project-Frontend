import { Card, Col, Image } from 'react-bootstrap'
import PropTypes from 'prop-types'
import ProfilePicturePlaceholder from '../../assets/img/profile_picture_placeholder_v1.jpg'
import { MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings'

function LeftColPost({ name, surname, profilePicture, biography, averageRating, location, profileId }) {
  return (
    <Col xs={4} className='d-none d-md-flex'>
      <Card className='left-col-details ms-5 mt-4 border-0 position-sticky' style={{ top: '95px' }}>
        <Link to={`/profile-details?id=${profileId}`} className='text-decoration-none'>
          <Card.Body className='text-dark'>
            <Image
              src={profilePicture ? profilePicture : ProfilePicturePlaceholder}
              roundedCircle
              className='profile-picture-placeholder d-block mx-auto'
              width={'70px'}
            />
            <div className='text-center'>
              <div className='d-flex justify-content-center align-items-center gap-1s mt-1'>
                <MapPin size={'15px'} />
                {location}
              </div>
              <div className='d-flex align-items-end justify-content-center'>
                <StarRatings
                  rating={averageRating}
                  starRatedColor='var(--tertiary-color)'
                  numberOfStars={5}
                  starDimension='20px'
                  starSpacing='2px'
                />
                {averageRating !== 0 && <div className='text-muted small mt-2'>({averageRating.toFixed(1)})</div>}
              </div>
              {averageRating === 0 && <div className='text-muted small mt-1 d-block'>(not rated yet)</div>}
            </div>
            <hr className='border border-success border-1 opacity-50' />

            <Card.Title className='text-dark hover-underline'>{name + ' ' + surname}</Card.Title>
            <Card.Text className='fs-6'>{biography}</Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </Col>
  )
}

LeftColPost.propTypes = {
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  profilePicture: PropTypes.string,
  biography: PropTypes.string.isRequired,
  averageRating: PropTypes.number,
  location: PropTypes.string,
  gender: PropTypes.string,
  profileId: PropTypes.string,
  interests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  spokenLanguages: PropTypes.arrayOf(
    PropTypes.shape({
      languageCode: PropTypes.string.isRequired,
      languageName: PropTypes.string.isRequired
    })
  )
}

export default LeftColPost
