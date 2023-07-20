import { createContext, useState } from 'react'

export const SearchContext = createContext()

// eslint-disable-next-line react/prop-types
export function SearchProvider({ children }) {
  const [searchResults, setSearchResults] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(undefined)

  function handleSearchResults(results) {
    setSearchResults(results)
  }

  const resetSearch = () => {
    setSearchResults({})
    setCurrentPage(1)
  }

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        handleSearchResults,
        currentPage,
        setCurrentPage,
        isLoading,
        setIsLoading,
        resetSearch,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
