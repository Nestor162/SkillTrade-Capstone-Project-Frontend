import HomeNavbar from './HomeNavbar'
import MobileBottomMenu from './MobileBottomMenu'
import SearchResultList from './SearchResultList'
import { SearchProvider } from '../contexts/SearchContext'

function Homepage() {
  return (
    <div>
      <SearchProvider>
        <HomeNavbar />
        <SearchResultList />
      </SearchProvider>

      <MobileBottomMenu />
    </div>
  )
}

export default Homepage
