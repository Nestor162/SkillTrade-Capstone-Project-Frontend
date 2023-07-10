import { useEffect, useState } from 'react'
import SingleInterestBadge from './singleInterestBadge'
import { Alert, Spinner } from 'react-bootstrap'
import { getAllInterests } from '../../utils/api'

function InterestsList() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleGetAllInterests() {
    setIsLoading(true)
    const { data, error } = await getAllInterests()
    if (error) {
      setErrorMsg(error.message)
    } else {
      setData(data)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    handleGetAllInterests()
  }, [])

  return (
    <div className='mx-4 my-3 d-flex justify-content-center flex-wrap'>
      {isLoading ? (
        <div className='d-flex align-items-center justify-content-center' style={{ height: '360px' }}>
          <Spinner animation='border' variant='success' />
        </div>
      ) : (
        data.map(interest => <SingleInterestBadge key={interest.id} name={interest.name} />)
      )}
      {errorMsg && (
        <Alert key='danger' variant='danger'>
          {errorMsg}
        </Alert>
      )}
    </div>
  )
}

export default InterestsList
