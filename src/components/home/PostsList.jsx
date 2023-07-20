import { Alert, Pagination, Spinner } from 'react-bootstrap'
import SinglePost from './SinglePost'
import { useEffect, useState } from 'react'
import { getAllPosts, getProfileById } from '../../utils/api'
import { convertSnakeCaseToCapitalized } from '../../utils/stringUtils'
import Masonry from 'react-masonry-css'
import { formatDate } from '../../utils/stringUtils'
import noContentImg from '../../assets/img/no-content-guy.png'
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react'

function PostList() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  async function handleGetAllPosts(page) {
    setIsLoading(true)
    const { data, error } = await getAllPosts(page - 1)
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
        post.authorId = author.data.id
      }
      // I set the content with the updated data
      setData({ ...data, content: postsWithAuthor })
      setTotalPages(data.totalPages)
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
    handleGetAllPosts(currentPage)
  }, [currentPage])

  // PAGINATION
  let items = []
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
        {number}
      </Pagination.Item>
    )
  }

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
                postId={post.id}
                authorId={post.authorId}
              />
            ))}
          </Masonry>
          {data.content.length === 0 && (
            <>
              <h4 className='text-center px-3 py-4'>
                This page is currently empty. Be the first to share your knowledge and skills by creating a post!
              </h4>
              <img width={'220px'} className='d-block mx-auto' src={noContentImg} alt='Sad gray guy' />
            </>
          )}
          <div className='d-flex justify-content-center'>
            <Pagination>
              <Pagination.First onClick={() => setCurrentPage(1)}>
                <ChevronFirst size={'18px'} />
              </Pagination.First>
              <Pagination.Prev onClick={() => setCurrentPage(currentPage => Math.max(currentPage - 1, 1))}>
                <ChevronLeft size={'18px'} />
              </Pagination.Prev>
              {items}
              <Pagination.Next onClick={() => setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages))}>
                <ChevronRight size={'18px'} />
              </Pagination.Next>
              <Pagination.Last onClick={() => setCurrentPage(totalPages)}>
                <ChevronLast size={'18px'} />
              </Pagination.Last>
            </Pagination>
          </div>
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
