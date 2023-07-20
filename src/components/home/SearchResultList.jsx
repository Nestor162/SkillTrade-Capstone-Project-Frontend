import Masonry from 'react-masonry-css'
import SinglePost from './SinglePost'
import { convertSnakeCaseToCapitalized, formatDate } from '../../utils/stringUtils'
import { Pagination, Spinner } from 'react-bootstrap'
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react'
import noContentImg from '../../assets/img/no-content-guy.png'
import { SearchContext } from '../contexts/SearchContext'
import { useContext } from 'react'
import PostList from './PostsList'

function SearchResultList() {
  const { searchResults, currentPage, setCurrentPage, isLoading } = useContext(SearchContext)

  const breakpointColumnsObj = {
    default: 4,
    1400: 3,
    1200: 3,
    992: 2,
    768: 2,
    576: 1
  }

  // PAGINATION
  let items = []
  for (let number = 1; number <= searchResults.totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
        {number}
      </Pagination.Item>
    )
  }

  if (Object.keys(searchResults).length === 0) {
    return <PostList />
  }

  return (
    <div className='page-content'>
      {isLoading ? (
        <div
          className='d-flex align-items-center justify-content-center'
          style={{ height: '360px', zIndex: '999999999999999' }}
        >
          <Spinner animation='border' variant='success' />
        </div>
      ) : (
        <>
          {searchResults.numberOfElements > 0 ? (
            <>
              <div className='pt-3 mx-5'>
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className='my-masonry-grid'
                  columnClassName='my-masonry-grid_column'
                >
                  {searchResults.content.map(post => (
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
              </div>
              {searchResults.totalPages > 1 && (
                <div className='d-flex justify-content-center'>
                  <Pagination>
                    <Pagination.First onClick={() => setCurrentPage(1)}>
                      <ChevronFirst size={'18px'} />
                    </Pagination.First>
                    <Pagination.Prev onClick={() => setCurrentPage(currentPage => Math.max(currentPage - 1, 1))}>
                      <ChevronLeft size={'18px'} />
                    </Pagination.Prev>
                    {items}
                    <Pagination.Next
                      onClick={() => setCurrentPage(currentPage => Math.min(currentPage + 1, searchResults.totalPages))}
                    >
                      <ChevronRight size={'18px'} />
                    </Pagination.Next>
                    <Pagination.Last onClick={() => setCurrentPage(searchResults.totalPages)}>
                      <ChevronLast size={'18px'} />
                    </Pagination.Last>
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <>
              <h4 className='text-center px-3s py-4'>
                No results found for your search. Please try different keywords or check your spelling.
              </h4>
              <img width={'220px'} className='d-block mx-auto' src={noContentImg} alt='Sad gray guy' />
            </>
          )}
        </>
      )}
    </div>
  )
}

export default SearchResultList
