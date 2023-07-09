import { useEffect, useState } from 'react'
import SingleInterestBadge from './singleInterestBadge'

function InterestsList() {
  const [data, setData] = useState([])

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
  }

  useEffect(() => {
    getAllInterests()
  }, [])

  return (
    <div className='mx-4 my-3 d-flex justify-content-center flex-wrap'>
      {data.map(interest => (
        <SingleInterestBadge key={interest.id} name={interest.name} />
      ))}
    </div>
  )
}

export default InterestsList
