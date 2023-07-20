import { Search } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { getPostByQuery, getPostByTitle, getProfileById } from '../../utils/api'
import { SearchContext } from '../contexts/SearchContext'
import ReactSelect from 'react-select'
import { useNavigate } from 'react-router-dom'

function SearchBar() {
  const { handleSearchResults, currentPage, setIsLoading } = useContext(SearchContext)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState({})
  const [menuIsOpen, setMenuIsOpen] = useState(true)
  const navigate = useNavigate()

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

  async function fetchTitleSuggestions(title, page = 0, size = 10) {
    page = currentPage - 1
    size = 10
    const { data, error } = await getPostByTitle(title, page, size)
    if (error) {
      console.error(error.message)
    } else {
      setSuggestions(data)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    navigate('/home')
    handlePostSearch(query)
  }

  useEffect(() => {
    handlePostSearch(query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  useEffect(() => {
    fetchTitleSuggestions(query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const options = suggestions.content?.map(suggestion => ({
    value: suggestion.id,
    label: suggestion.title
  }))

  function handleSelection(selectedOption) {
    setQuery(selectedOption.label)
    setMenuIsOpen(false)
    // navigate(`?id=${selectedOption.value}`)
  }

  return (
    <>
      <Form onSubmit={handleSubmit} className='position-relative main-search-group mx-auto m-3'>
        <InputGroup>
          <Form.Control
            placeholder='Search what you want to learn next...'
            aria-label='Search what you want to learn next...'
            aria-describedby='main-search-bar'
            className='main-search-input'
            value={query}
            onChange={e => {
              setQuery(e.target.value)
              setMenuIsOpen(true)
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                setMenuIsOpen(false)
              }
            }}
          />
          <Button type='submit' className='main-btn' onClick={handleSubmit}>
            <Search size={18} color='white' strokeWidth={3} />
          </Button>
        </InputGroup>
        {query && suggestions.content && (
          <ReactSelect
            options={options}
            menuIsOpen={menuIsOpen}
            controlShouldRenderValue={false}
            placeholder=''
            isSearchable={false}
            className='search-suggestions'
            onChange={handleSelection}
          />
        )}
      </Form>
    </>
  )
}

export default SearchBar
