// ---- {USER ENDPOINTS} ----
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
      return { data: null, error: data.message }
    }
  } catch (error) {
    return { data: null, error }
  }
}

async function registerUser(payload) {
  try {
    const response = await fetch('http://localhost:3001/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const data = await response.json()
    if (response.ok) {
      const userLoginResponse = await loginUser({ email: payload.email, password: payload.password })
      if (userLoginResponse.error) {
        console.error(userLoginResponse.error)
        return { data: null, error: userLoginResponse.error }
      } else {
        return { data: userLoginResponse.data, error: null }
      }
    } else {
      console.log(data.message)
      return { data: null, error: data.message }
    }
  } catch (error) {
    return { data: null, error }
  }
}

async function getUserByEmail(email) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3001/users?email=${email}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()
    if (response.ok) {
      localStorage.setItem('userId', data.id)
      localStorage.setItem('profileId', data.profile)
      return { data, error: null }
    }
  } catch (error) {
    return { data: null, error }
  }
}

// ---- {INTEREST ENDPOINT} ----
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
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

async function getInterestById(interestId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3001/interests/` + interestId, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    if (response.ok) {
      return { data, error: null }
    } else {
      return { data: null, error: data.message }
    }
  } catch (error) {
    return { data: null, error }
  }
}

// ---- {PROFILE ENDPOINTS} ----
async function updateProfile(payload, profileId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3001/profiles/` + profileId, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const data = await response.json()
    if (response.ok) {
      return { data, error: null }
    } else {
      return { data: null, error: data.message }
    }
  } catch (error) {
    return { data: null, error }
  }
}

async function getProfileById(profileId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3001/profiles/` + profileId, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    if (response.ok) {
      return { data, error: null }
    } else {
      return { data: null, error: data.message }
    }
  } catch (error) {
    return { data: null, error }
  }
}

// ---- {POSTS ENDPOINTS} ----
async function getAllPosts() {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3001/posts', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

async function getPostById(postId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3001/posts/` + postId, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    if (response.ok) {
      return { data, error: null }
    } else {
      return { data: null, error: data.message }
    }
  } catch (error) {
    return { data: null, error }
  }
}

async function changePostStatus(payload, postId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3001/posts/` + postId, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const data = await response.json()
    if (response.ok) {
      return { data, error: null }
    } else {
      return { data: null, error: data.message }
    }
  } catch (error) {
    return { data: null, error }
  }
}

async function publishPost(payload) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3001/posts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const data = await response.json()
    if (response.ok) {
      return { data, error: null }
    } else {
      return { data: null, error: data.message }
    }
  } catch (error) {
    return { data: null, error }
  }
}

// Check if a certaing image URL is valid or not
export async function isValidImageUrl(url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return false
  }
  const response = await fetch(url, { method: 'HEAD' })
  const contentType = response.headers.get('Content-Type')
  return contentType.startsWith('image/')
}

export {
  loginUser,
  registerUser,
  getAllInterests,
  getUserByEmail,
  updateProfile,
  getProfileById,
  getAllPosts,
  getInterestById,
  getPostById,
  changePostStatus,
  publishPost
}
