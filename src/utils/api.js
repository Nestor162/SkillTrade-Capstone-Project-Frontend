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

async function deleteUser(userId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3001/users/` + userId, {
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
async function getAllInterests() {
  try {
    const response = await fetch('http://localhost:3001/interests', {
      method: 'GET'
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

// ---- {LANGUAGE ENDPOINT } ----
async function GetAllLanguages() {
  try {
    const response = await fetch('http://localhost:3001/langs', {
      method: 'GET'
    })
    const data = await response.json()
    return { data, error: null }
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

async function getAllProfiles(page = 0, size = 10, sortValue = 'id') {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3001/profiles?page=${page}&size=${size}&sort=${sortValue}`, {
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
async function getAllPosts(page = 0, size = 10, sortValue = 'id') {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3001/posts?page=${page}&size=${size}&sort=${sortValue}`, {
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

async function getPostByAuthorId(authorId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3001/posts?author=` + authorId, {
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

async function getPostByQuery(query, page = 0, size = 10) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3001/posts/filters?query=${query}&page=${page}&size=${size}`, {
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

async function getPostByTitle(title, page = 0, size = 10) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3001/posts/filters?query=${title}&page=${page}&size=${size}`, {
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

async function deletePost(postId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3001/posts/` + postId, {
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

async function editPost(payload, postId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3001/posts/` + postId, {
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

async function sortPosts({
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

    const response = await fetch(`http://localhost:3001/posts/filters?${queryString}`, {
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
async function getAllReviews() {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3001/reviews', {
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

async function getReviewsOfProfile(profileId, page = 0, sortBy = 'publicationDate') {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3001/reviews?profile=${profileId}&page=${page}&sortBy=${sortBy}`, {
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

async function publishReview(payload) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3001/reviews', {
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

async function getReviewsStarsCount(profileId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3001/reviews/stars/' + profileId, {
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

async function getReviewsByAuthor(authorId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3001/reviews?author=` + authorId, {
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

async function deleteReview(reviewId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3001/reviews/` + reviewId, {
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

async function editReview(payload, reviewId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3001/reviews/` + reviewId, {
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
  publishPost,
  GetAllLanguages,
  getAllReviews,
  getReviewsOfProfile,
  getPostByAuthorId,
  publishReview,
  getPostByQuery,
  getPostByTitle,
  deletePost,
  getAllProfiles,
  editPost,
  getReviewsStarsCount,
  sortPosts,
  getReviewsByAuthor,
  editReview,
  deleteReview,
  deleteUser
}
