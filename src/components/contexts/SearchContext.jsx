import { createContext, useState } from 'react'

export const SearchContext = createContext()

// eslint-disable-next-line react/prop-types
export function SearchProvider({ children }) {
  const [searchResults, setSearchResults] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  function handleSearchResults(results) {
    setSearchResults(results)
  }

  return (
    <SearchContext.Provider
      value={{ searchResults, handleSearchResults, currentPage, setCurrentPage, isLoading, setIsLoading }}
    >
      {children}
    </SearchContext.Provider>
  )
}
