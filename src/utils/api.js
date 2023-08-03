const BASE_URL = 'https://skilltrade.onrender.com'

// ---- {USER ENDPOINTS} ----
export async function loginUser(payload) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
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

export async function registerUser(payload) {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
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

export async function getUserByEmail(email) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/users?email=${email}`, {
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

export async function deleteUser(userId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/users/` + userId, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 204) {
      // The post was successfully deleted
      return { data: response, error: null }
    } else {
      const data = await response.json()
      if (response.ok) {
        return { data, error: null }
      } else {
        return { data: null, error: data.message }
      }
    }
  } catch (error) {
    return { data: null, error }
  }
}

// ---- {INTEREST ENDPOINT} ----
export async function getAllInterests() {
  try {
    const response = await fetch(`${BASE_URL}/interests`, {
      method: 'GET'
    })
    const data = await response.json()
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export async function getInterestById(interestId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/interests/` + interestId, {
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

// ---- {LANGUAGE ENDPOINT } ----
export async function GetAllLanguages() {
  try {
    const response = await fetch(`${BASE_URL}/langs`, {
      method: 'GET'
    })
    const data = await response.json()
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

// ---- {PROFILE ENDPOINTS} ----
export async function updateProfile(payload, profileId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/profiles/` + profileId, {
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

export async function getProfileById(profileId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/profiles/` + profileId, {
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

export async function getAllProfiles(page = 0, size = 10, sortValue = 'id') {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/profiles?page=${page}&size=${size}&sort=${sortValue}`, {
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

// ---- {POSTS ENDPOINTS} ----
export async function getAllPosts(page = 0, size = 10, sortValue = 'id') {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/posts?page=${page}&size=${size}&sort=${sortValue}`, {
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

export async function getPostById(postId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/posts/` + postId, {
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

export async function getPostByAuthorId(authorId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/posts?author=` + authorId, {
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

export async function changePostStatus(payload, postId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/posts/` + postId, {
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

export async function publishPost(payload) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/posts`, {
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

export async function getPostByQuery(query, page = 0, size = 10) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/posts/filters?query=${query}&page=${page}&size=${size}`, {
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

export async function getPostByTitle(title, page = 0, size = 10) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/posts/filters?query=${title}&page=${page}&size=${size}`, {
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

export async function deletePost(postId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/posts/` + postId, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 204) {
      // The post was successfully deleted
      return { data: 'Post deleted', error: null }
    } else {
      const data = await response.json()
      if (response.ok) {
        return { data, error: null }
      } else {
        return { data: null, error: data.message }
      }
    }
  } catch (error) {
    return { data: null, error }
  }
}

export async function editPost(payload, postId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/posts/` + postId, {
      method: 'PUT',
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

export async function sortPosts({
  query,
  page = 0,
  size = 10,
  availability,
  category,
  skillLevel,
  status,
  title,
  sort,
  location
} = {}) {
  try {
    const token = localStorage.getItem('token')
    let queryString = `page=${page}&size=${size}`
    if (query) queryString += `&query=${query}`
    if (availability) queryString += `&availability=${availability}`
    if (category) queryString += `&category=${category}`
    if (skillLevel) queryString += `&skillLevel=${skillLevel}`
    if (status) queryString += `&status=${status}`
    if (title) queryString += `&title=${title}`
    if (sort) queryString += `&sort=${sort}`
    if (location) queryString += `&location=${location}`

    const response = await fetch(`${BASE_URL}/posts/filters?${queryString}`, {
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

// ---- { REVIEWS ENDPOINT } ----
export async function getAllReviews() {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/reviews`, {
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

export async function getReviewsOfProfile(profileId, page = 0, sortBy = 'publicationDate') {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/reviews?profile=${profileId}&page=${page}&sortBy=${sortBy}`, {
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

export async function publishReview(payload) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/reviews`, {
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

export async function getReviewsStarsCount(profileId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/reviews/stars/` + profileId, {
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

export async function getReviewsByAuthor(authorId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/reviews?author=` + authorId, {
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

export async function deleteReview(reviewId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/reviews/` + reviewId, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 204) {
      // The post was successfully deleted
      return { data: 'Post deleted', error: null }
    } else {
      const data = await response.json()
      if (response.ok) {
        return { data, error: null }
      } else {
        return { data: null, error: data.message }
      }
    }
  } catch (error) {
    return { data: null, error }
  }
}

export async function editReview(payload, reviewId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/reviews/` + reviewId, {
      method: 'PUT',
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
