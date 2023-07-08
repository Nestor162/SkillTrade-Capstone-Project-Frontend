import { useEffect } from 'react'

function InterestsList() {
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
    }
  }

  useEffect(() => {
    getAllInterests()
  }, [])

  return <></>
}

export default InterestsList
