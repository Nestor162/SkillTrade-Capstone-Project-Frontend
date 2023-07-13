import { Alert, Spinner } from 'react-bootstrap'
import SinglePost from './SinglePost'
import { useEffect, useState } from 'react'
import { getAllPosts, getProfileById } from '../../utils/api'
import { convertSnakeCaseToCapitalized } from '../../utils/stringUtils'
import Masonry from 'react-masonry-css'
import { formatDate } from '../../utils/stringUtils'

function PostList() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleGetAllPosts() {
    setIsLoading(true)
    const { data, error } = await getAllPosts()
    if (error) {
      setErrorMsg(error.message)
    } else {
      // I create a copy of array data.content
      const postsWithAuthor = [...data.content]
      // For each post
      for (let i = 0; i < postsWithAuthor.length; i++) {
        const post = postsWithAuthor[i]
        const author = await getProfileById(post.profile)
        // I add the author namea nd surname to the post object
        post.authorName = author.data.name
        post.authorSurname = author.data.surname
      }
      // I set the content with the updated data
      setData({ ...data, content: postsWithAuthor })
    }
    setIsLoading(false)
  }

  const breakpointColumnsObj = {
    default: 4,
    1400: 3,
    1200: 3,
    992: 2,
    768: 2,
    576: 1
  }

  useEffect(() => {
    handleGetAllPosts()
  }, [])

  return (
    <div className='page-content'>
      {isLoading ? (
        <div className='d-flex align-items-center justify-content-center' style={{ height: '360px' }}>
          <Spinner animation='border' variant='success' />
        </div>
      ) : (
        <div className='pt-3 mx-5'>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className='my-masonry-grid'
            columnClassName='my-masonry-grid_column'
          >
            {data.content.map(post => (
              <SinglePost
                key={post.id}
                title={post.title}
                content={post.content}
                availability={convertSnakeCaseToCapitalized(post.availability)}
                skillLevel={convertSnakeCaseToCapitalized(post.skillLevel)}
                category={post.category.name}
                authorName={post.authorName}
                authorSurname={post.authorSurname}
                publicationDate={formatDate(post.publicationDate)}
                postPhoto={post.imageUrl}
              />
            ))}
          </Masonry>
        </div>
      )}
      {errorMsg && (
        <Alert key='danger' variant='danger'>
          {errorMsg}
        </Alert>
      )}
    </div>
  )
}

export default PostList
