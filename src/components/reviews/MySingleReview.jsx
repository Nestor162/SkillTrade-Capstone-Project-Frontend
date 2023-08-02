import { Alert, Button, Card, Dropdown } from 'react-bootstrap'
import StarRatings from 'react-star-ratings'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { deleteReview, editReview } from '../../utils/api'
import { formatDate } from '../../utils/stringUtils'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'
import DeleteReviewModal from './DeleteReviewModal'
import EditReviewModal from './EditReviewModal'
import { useReviewStore } from '../../store/ReviewStore'

function MySingleReview({
  reviewRating,
  reviewTitle,
  reviewContent,
  contentPreview,
  publicationDate,
  reviewId,
  profileReviewed
}) {
  const [deleteShow, setDeleteShow] = useState(false)
  const removeReview = useReviewStore(state => state.removeReview)

  async function handleDelete(selectedReviewId) {
    console.log(selectedReviewId)
    const response = await deleteReview(selectedReviewId)
    if (response.error) {
      setErrorMsg(response.error.message)
      console.error(response.error)
    } else {
      removeReview(selectedReviewId)
      console.log('aliminato')
      setDeleteShow(false)
    }
  }

  const [editShow, setEditShow] = useState(false)
  async function handleEditReview(reviewPayload) {
    const response = await editReview(reviewPayload, reviewId)
    if (response.error) {
      setErrorMsg(response.error.message)
      console.error(response.error)
    } else {
      setEditShow(false)
    }
  }

  const [errorMsg, setErrorMsg] = useState('')

  const [showMore, setShowMore] = useState(false)

  return (
    <>
      <Card className='review-card w-100'>
        {errorMsg && (
          <Alert key='danger' variant='danger'>
            {errorMsg}
          </Alert>
        )}
        <Card.Body>
          <Card.Title className='text-black d-flex justify-content-between'>
            <div className='w-75'>{reviewTitle}</div>
            <Dropdown className='position-relative'>
              <Dropdown.Toggle as='div' id='dropdown-basic'>
                <MoreVertical size={'22px'} className='cursor-pointer' />
              </Dropdown.Toggle>
              <Dropdown.Menu className='card-options-dropdown'>
                <Dropdown.Item
                  onClick={() => {
                    setEditShow(true)
                  }}
                >
                  <Pencil size={'16px'} />
                  <span>Edit review</span>
                </Dropdown.Item>
                <Dropdown.Item
                  className='trash-hover'
                  onClick={() => {
                    setDeleteShow(true)
                  }}
                >
                  <Trash2 size={'16px'} />
                  <span>Delete review</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Title>
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
          <div className='text-muted'>
            <small>Published on date {formatDate(publicationDate)}</small>
          </div>
        </Card.Footer>
      </Card>
      <DeleteReviewModal
        show={deleteShow}
        onClose={() => {
          setDeleteShow(false)
        }}
        handleDelete={handleDelete}
        title={reviewTitle}
        content={reviewContent}
        reviewRating={reviewRating}
        publicationDate={publicationDate}
        reviewId={reviewId}
      />
      <EditReviewModal
        show={editShow}
        onClose={() => setEditShow(false)}
        initialValues={{
          title: reviewTitle,
          content: reviewContent,
          rating: reviewRating,
          profileReviewed: profileReviewed
        }}
        handleSubmit={handleEditReview}
      />
    </>
  )
}

MySingleReview.propTypes = {
  reviewRating: PropTypes.number.isRequired,
  reviewTitle: PropTypes.string.isRequired,
  reviewContent: PropTypes.string.isRequired,
  contentPreview: PropTypes.string.isRequired,
  publicationDate: PropTypes.string.isRequired,
  profileReviewed: PropTypes.string.isRequired,
  reviewId: PropTypes.string.isRequired
}

export default MySingleReview
