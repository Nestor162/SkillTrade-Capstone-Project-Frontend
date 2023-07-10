import { useEffect, useState } from 'react'
import SingleInterestBadge from './singleInterestBadge'
import { Alert, Spinner } from 'react-bootstrap'
import { getAllInterests } from '../../utils/api'

function InterestsList() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')
  const [selectedInterests, setSelectedInterests] = useState([])

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

  const handleSelectInterest = name => {
    setSelectedInterests(prevSelectedInterests => {
      if (prevSelectedInterests.includes(name)) {
        // remove the interest from the selectedInterests array
        return prevSelectedInterests.filter(interest => interest !== name)
      } else {
        // add the interest to the selectedInterests array
        return [...prevSelectedInterests, name]
      }
    })
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
        data.map(interest => (
          <SingleInterestBadge key={interest.id} name={interest.name} onSelect={handleSelectInterest} />
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

export default InterestsList
