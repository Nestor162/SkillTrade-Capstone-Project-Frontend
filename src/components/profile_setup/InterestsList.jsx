import { useEffect, useState } from 'react'
import SingleInterestBadge from './singleInterestBadge'
import { Alert, Spinner } from 'react-bootstrap'

function InterestsList() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  async function getAllInterests() {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:3001/interests', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      console.log(data)

      if (!response.ok) {
        setErrorMsg(response)
      } else {
        setData(data)
      }
    } catch (error) {
      console.error(error)
      setErrorMsg(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getAllInterests()
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
