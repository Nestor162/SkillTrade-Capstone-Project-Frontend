import Masonry from 'react-masonry-css'
import SinglePost from './SinglePost'
import { convertSnakeCaseToCapitalized, formatDate } from '../../utils/stringUtils'
import { OverlayTrigger, Pagination, Spinner, Tooltip } from 'react-bootstrap'
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import noContentImg from '../../assets/img/no-content-guy.png'
import { SearchContext } from '../contexts/SearchContext'
import { useContext } from 'react'
import PostList from './PostsList'

function SearchResultList() {
  const { searchResults, currentPage, setCurrentPage, isLoading, searchQuery, resetSearch } = useContext(SearchContext)

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
        <div className='d-flex align-items-center justify-content-center' style={{ height: '360px', zIndex: '999' }}>
          <Spinner animation='border' variant='success' />
        </div>
      ) : (
        <>
          {searchResults.numberOfElements > 0 ? (
            <>
              {searchQuery !== ' ' && searchQuery !== undefined && (
                <div className='ms-3 ms-md-5 fs-5 mb-0 pt-3 d-flex'>
                  <p>
                    Viewing results for: <em>&quot;{searchQuery}&quot;</em>
                  </p>
                  <span className='ms-3 reset-search-icon' onClick={resetSearch}>
                    <OverlayTrigger placement='right' overlay={<Tooltip id='reset-tooltip'>Reset search</Tooltip>}>
                      <RotateCcw size={'20px'} />
                    </OverlayTrigger>
                  </span>
                </div>
              )}

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
              <p className='text-center px-3 py-4 fs-4'>
                No results found for your search &quot;<strong>{searchQuery}</strong>&quot;. Please try different
                keywords or check your spelling.
              </p>
              <img width={'220px'} className='d-block mx-auto' src={noContentImg} alt='Sad gray guy' />
            </>
          )}
        </>
      )}
    </div>
  )
}

export default SearchResultList
