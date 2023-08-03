import Masonry from 'react-masonry-css'
import SinglePost from './SinglePost'
import { convertSnakeCaseToCapitalized, formatDate } from '../../utils/stringUtils'
import { Dropdown, OverlayTrigger, Pagination, Spinner, Tooltip } from 'react-bootstrap'
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, ChevronsUpDown, RotateCcw } from 'lucide-react'
import noContentImg from '../../assets/img/no-content-guy.png'
import { SearchContext } from '../contexts/SearchContext'
import { useContext } from 'react'
import PostList from './PostsList'
import { getProfileById, sortPosts } from '../../utils/api'

function SearchResultList() {
  const { searchResults, currentPage, setCurrentPage, isLoading, searchQuery, resetSearch, handleSearchResults } =
    useContext(SearchContext)

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

  if (Object.keys(searchResults).length === 0 || searchResults.content.length === 0) {
    return <PostList />
  }

  // SORTING
  async function handleSort(sort) {
    const result = await sortPosts({ sort, query: searchQuery })
    if (result.error) {
      console.error(result.error)
    } else {
      // I create a copy of array data.content
      const postsWithAuthor = [...result.data.content]
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
      handleSearchResults({ ...result.data, content: postsWithAuthor })
    }
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
                <div className='ms-3 ms-sm-5 fs-5 mb-0 pt-3 d-flex align-items-center'>
                  <p className='mb-0'>
                    Viewing results for: <em>&quot;{searchQuery}&quot;</em>
                  </p>
                  <span className='ms-3 reset-search-icon' onClick={resetSearch}>
                    <OverlayTrigger placement='right' overlay={<Tooltip id='reset-tooltip'>Reset search</Tooltip>}>
                      <RotateCcw size={'20px'} />
                    </OverlayTrigger>
                  </span>
                  <Dropdown className='position-relative'>
                    <Dropdown.Toggle id='dropdown-sort' as='button'>
                      <div className='fs-6 ms-2 secondary-btn py-1 px-2'>
                        <ChevronsUpDown size={'16px'} className='ms-1' />
                        <span className='pe-2'> Sort By </span>
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='position-absolute' id='sort-dropdown-menu'>
                      <Dropdown.Item onClick={() => handleSort('newest')}>Date (Newest to Oldest) </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleSort('oldest')}>Date (Oldest to Newest)</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleSort('alphabetical')}>Alphabetical (A to Z) </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleSort('reverseAlphabetical')}>
                        Alphabetical (Z to A)
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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
