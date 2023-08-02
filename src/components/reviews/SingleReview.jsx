import { Alert, Button, Card, Spinner } from 'react-bootstrap'
import StarRatings from 'react-star-ratings'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { getProfileById } from '../../utils/api'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/stringUtils'

function SingleReview({ reviewRating, reviewTitle, reviewContent, reviewAuthor, contentPreview, publicationDate }) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleGetReviewAuthor(id) {
    setIsLoading(true)
    const { data, error } = await getProfileById(id)
    if (error) {
      setErrorMsg(error.message)
    } else {
      setData(data)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    handleGetReviewAuthor(reviewAuthor)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [showMore, setShowMore] = useState(false)

  return (
    <Card className='review-card w-100'>
      {errorMsg && (
        <Alert key='danger' variant='danger'>
          {errorMsg}
        </Alert>
      )}
      <Card.Body>
        <Card.Title>{reviewTitle}</Card.Title>
        <div className='mb-3'>
          <StarRatings
            rating={reviewRating}
            starRatedColor='var(--tertiary-color)'
            numberOfStars={5}
            starDimension='20px'
            starSpacing='2px'
          />
        </div>
        <Card.Text className='m-0'>{showMore ? reviewContent : contentPreview}</Card.Text>
        {reviewContent.length > 100 && (
          <Button
            className='p-0 bg-transparent border-0'
            style={{ color: 'var(--secondary-color)' }}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'show less' : 'show more'}
          </Button>
        )}
      </Card.Body>
      <Card.Footer>
        {isLoading ? (
          <Spinner variant='success' />
        ) : (
          <div className='text-muted'>
            <small className='d-block'>
              Reviewed by <Link to={`/profile-details?id=${reviewAuthor}`}> {data.name + ' ' + data.surname}</Link>
            </small>
            <small>On date {formatDate(publicationDate)}</small>
          </div>
        )}
      </Card.Footer>
    </Card>
  )
}

SingleReview.propTypes = {
  reviewRating: PropTypes.number.isRequired,
  reviewTitle: PropTypes.string.isRequired,
  reviewContent: PropTypes.string.isRequired,
  reviewAuthor: PropTypes.string.isRequired,
  contentPreview: PropTypes.string.isRequired,
  publicationDate: PropTypes.string.isRequired
}

export default SingleReview
