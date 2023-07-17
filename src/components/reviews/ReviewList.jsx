import { useEffect, useState } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import { getReviewsOfProfile } from '../../utils/api'
import SingleReview from './SingleReview'

function ReviewList() {
  const [searchParams] = useSearchParams()
  const profileId = searchParams.get('id')

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleGetReviewsOfProfile(id) {
    setIsLoading(true)
    const { data, error } = await getReviewsOfProfile(id)
    if (error) {
      setErrorMsg(error.message)
    } else {
      setData(data)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    handleGetReviewsOfProfile(profileId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='mx-4 my-3 d-flex justify-content-center flex-wrap gap-4'>
      {isLoading ? (
        <div className='d-flex align-items-center justify-content-center' style={{ height: '360px' }}>
          <Spinner animation='border' variant='success' />
        </div>
      ) : (
        data.map(review => (
          <SingleReview
            key={review.id}
            reviewTitle={review.title}
            reviewContent={review.content}
            reviewAuthor={review.reviewAuthor}
            reviewRating={review.rating}
            publicationDate={review.publicationDate}
            contentPreview={review.content.slice(0, 200) + (review.content.length > 100 ? '...' : '')}
          />
        ))
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
