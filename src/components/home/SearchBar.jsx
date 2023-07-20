import { Search } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { getPostByQuery, getProfileById } from '../../utils/api'
import { SearchContext } from '../contexts/SearchContext'

function SearchBar() {
  const { handleSearchResults, currentPage, setIsLoading } = useContext(SearchContext)
  const [query, setQuery] = useState('')
  // const [suggestions, setSuggestions] = useState([])

  async function handlePostSearch(query, page = 0, size = 10) {
    page = currentPage - 1
    size = 10
    setIsLoading(true)
    const { data, error } = await getPostByQuery(query, page, size)
    if (error) {
      console.error(error.message)
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
      handleSearchResults({ ...data, content: postsWithAuthor })
    }
    setIsLoading(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    handlePostSearch(query)
  }

  useEffect(() => {
    handlePostSearch(query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  return (
    <Form onSubmit={handleSubmit} className='main-search-group mx-auto m-3'>
      <InputGroup>
        <Form.Control
          placeholder='Search what you want to learn next...'
          aria-label='Search what you want to learn next...'
          aria-describedby='main-search-bar'
          className='main-search-input'
          value={query}
          onChange={e => {
            setQuery(e.target.value)
          }}
        />
        <Button className='main-btn' onClick={handleSubmit}>
          <Search size={18} color='white' strokeWidth={3} />
        </Button>
      </InputGroup>
    </Form>
  )
}

export default SearchBar
