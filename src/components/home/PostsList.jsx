import { Alert, Row, Spinner } from 'react-bootstrap'
import SinglePost from './SinglePost'
import { useEffect, useState } from 'react'
import { getAllPosts } from '../../utils/api'
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
      setData(data)
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
