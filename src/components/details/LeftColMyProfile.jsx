import { Card, Col, Spinner } from 'react-bootstrap'
import { getReviewsStarsCount } from '../../utils/api'
import { useEffect, useState } from 'react'

function LeftColMyProfile() {
  const [data, setData] = useState(null)

  const profileId = localStorage.getItem('profileId')
  const [isLoading, setIsLoading] = useState(true)

  async function getStarsHandler() {
    const response = await getReviewsStarsCount(profileId)
    if (response.error) {
      console.error(response.error.message)
    } else {
      setData(response.data)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getStarsHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Col xs={4} className='d-none d-md-flex'>
      <Card className='left-col-details ms-5 mt-4 border-0 position-sticky' style={{ top: '95px' }}>
        <Card.Body className='text-dark'>
          {isLoading ? (
            <div className='d-flex align-items-center justify-content-center' style={{ height: '360px' }}>
              <Spinner animation='border' variant='success' />
            </div>
          ) : (
            <>
              <h5 className='mb-3'>Rating</h5>
              {(() => {
                const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
                data.forEach(([rating, count]) => {
                  counts[rating] = count
                })
                return Object.entries(counts)
                  .reverse()
                  .map(([rating, count]) => (
                    <div key={rating} className='d-flex flex-column'>
                      <span>
                        {rating} stars <span className='small text-secondary'>({count})</span>
                      </span>
                      <div className='mt-1 mb-2' style={{ position: 'relative', height: '7px' }}>
                        <div
                          className='rounded shadow-sm'
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'lightgray'
                          }}
                        />
                        <div
                          className='rounded shadow-sm'
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: `${count * 20}px`,
                            backgroundColor: 'var(--tertiary-color)'
                          }}
                        />
                      </div>
                    </div>
                  ))
              })()}
            </>
          )}
        </Card.Body>
      </Card>
    </Col>
  )
}

export default LeftColMyProfile
