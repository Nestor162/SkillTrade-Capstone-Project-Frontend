import { useEffect } from 'react'
import { Alert, Pagination, Spinner } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import SingleReview from './SingleReview'
import { useReviewStore } from '../../store/ReviewStore'

function ReviewList() {
  const [searchParams] = useSearchParams()
  const profileId = searchParams.get('id')
  const logedProfileId = localStorage.getItem('profileId')

  const reviews = useReviewStore(state => state.reviews)
  const isLoading = useReviewStore(state => state.isLoading)
  const errorMsg = useReviewStore(state => state.errorMsg)
  const currentPage = useReviewStore(state => state.currentPage)
  const totalPages = useReviewStore(state => state.totalPages)
  const handleGetReviewsOfProfile = useReviewStore(state => state.handleGetReviewsOfProfile)
  const handlePageClick = useReviewStore(state => state.handlePageClick)

  useEffect(() => {
    handleGetReviewsOfProfile(profileId, currentPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  let items = []
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
          handlePageClick(number)
        }}
        onMouseDown={e => e.preventDefault()}
      >
        {number}
      </Pagination.Item>
    )
  }

  return (
    <div className='mx-4 my-3 d-flex justify-content-center flex-wrap gap-4'>
      {isLoading ? (
        <div className='d-flex align-items-center justify-content-center' style={{ height: '360px' }}>
          <Spinner animation='border' variant='success' />
        </div>
      ) : (
        <>
          {reviews.map(review => (
            <SingleReview
              key={review.id}
              reviewTitle={review.title}
              reviewContent={review.content}
              reviewAuthor={review.reviewAuthor}
              reviewRating={review.rating}
              publicationDate={review.publicationDate}
              contentPreview={review.content.slice(0, 200) + (review.content.length > 100 ? '...' : '')}
            />
          ))}
          {reviews.length !== 0 && <Pagination>{items}</Pagination>}
        </>
      )}

      {reviews.length === 0 && (
        <p className='text-center fst-italic text-muted mb-5'>
          {logedProfileId !== profileId
            ? 'No reviews yet, be the first to leave a review!'
            : 'This is your profile! Showcase your talents and start earning great reviews'}
        </p>
      )}

      {errorMsg && (
        <Alert key='danger' variant='danger'>
          {errorMsg}
        </Alert>
      )}
    </div>
  )
}

export default ReviewList
