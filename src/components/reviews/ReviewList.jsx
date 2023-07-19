import { useEffect, useState } from 'react'
import { Alert, Pagination, Spinner } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import { getReviewsOfProfile } from '../../utils/api'
import SingleReview from './SingleReview'

function ReviewList() {
  const [searchParams] = useSearchParams()
  const profileId = searchParams.get('id')

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  async function handleGetReviewsOfProfile(id, page) {
    setIsLoading(true)
    const { data, error } = await getReviewsOfProfile(id, page - 1)
    if (error) {
      setErrorMsg(error.message)
    } else {
      setData(data)
      setTotalPages(data.totalPages)
    }
    setIsLoading(false)
  }

  const handlePageClick = pageNumber => {
    setCurrentPage(pageNumber)
  }

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
          {data.content.map(review => (
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
          <Pagination>{items}</Pagination>
        </>
      )}

      {data.length !== 0 && data.content.length === 0 && (
        <p className='text-center fst-italic text-muted mb-5'>No reviews yet, be the first to leave a review! </p>
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
