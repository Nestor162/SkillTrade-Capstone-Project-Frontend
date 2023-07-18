import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import TruncateText from '../../utils/TruncateText'
import { CalendarClock, Signal, Tag } from 'lucide-react'
import { convertSnakeCaseToCapitalized } from '../../utils/stringUtils'

function ProfilePostsCarousel({
  title,
  content,
  skillLevel,
  // postStatus,
  availability,
  imageUrl,
  category,
  publicationDate,
  postId
}) {
  return (
    <Card className='custom-card' style={{ width: '100%', height: 'max-content' }}>
      <Link to={`/post-details?id=${postId}`} className='text-decoration-none'>
        {imageUrl && <Card.Img variant='top' className='rounded-0 narrow-img-top' src={imageUrl} />}
        <Card.Body>
          <Card.Title className='text-black hover-underline'>{title}</Card.Title>
          <div className='text-body mb-3'>
            <TruncateText text={content} maxLines={3} className='text-body' />
          </div>
          <div className='d-flex gap-3 small text-secondary'>
            <div className='d-flex align-items-center flex-wrap gap-3'>
              <div className='d-flex'>
                <Tag size={'18px'} />
                <div className='ms-1'>{category}</div>
              </div>
              <div className='d-flex'>
                <CalendarClock size={'18px'} />
                <div className='ms-1'>{convertSnakeCaseToCapitalized(availability)}</div>
              </div>
              <div className='d-flex'>
                <Signal size={'18px'} />
                <div className='ms-1'>{convertSnakeCaseToCapitalized(skillLevel)}</div>
              </div>
            </div>
          </div>
        </Card.Body>
        <Card.Footer className='d-flex'>
          <div>
            <div className='small text-secondary ms-2'>Published on: {publicationDate}</div>
          </div>
        </Card.Footer>
      </Link>
    </Card>
  )
}

ProfilePostsCarousel.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  skillLevel: PropTypes.string.isRequired,
  // postStatus: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  publicationDate: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired
}

export default ProfilePostsCarousel
