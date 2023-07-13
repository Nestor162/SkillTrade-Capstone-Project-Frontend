import { Alert, Row, Spinner } from 'react-bootstrap'
import SinglePost from './SinglePost'
import { useEffect, useState } from 'react'
import { getAllPosts, getProfileById } from '../../utils/api'
import { convertSnakeCaseToCapitalized } from '../../utils/stringUtils'

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
        <Row xs={1} sm={2} md={2} lg={3} xxl={4} className='g-4 mt-3 mx-4'>
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
              publicationDate={post.publicationDate}
              postPhoto={post.imageUrl}
            />
          ))}
        </Row>
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
