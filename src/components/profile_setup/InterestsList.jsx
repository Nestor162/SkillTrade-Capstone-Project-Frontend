import { useEffect, useState } from 'react'
import SingleInterestBadge from './singleInterestBadge'
import { Spinner } from 'react-bootstrap'

function InterestsList() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function getAllInterests(payload) {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3001/interests', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
    const data = await response.json()
    console.log(data)

    if (!response.ok) {
      //manage error
      console.error(response)
    } else {
      setData(data)
    }
    setIsLoading(false)
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
    </div>
  )
}

export default InterestsList
