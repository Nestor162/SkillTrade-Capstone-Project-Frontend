async function loginUser(payload) {
  try {
    const response = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const data = await response.json()
    if (response.ok) {
      return { data, error: null }
    } else {
      console.log(data.message)
      return { data: null, error: data.message }
    }
  } catch (error) {
    return { data: null, error }
  }
}

export { loginUser }
