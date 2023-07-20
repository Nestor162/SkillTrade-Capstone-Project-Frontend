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
        <MobileBottomMenu />
      </SearchProvider>
    </div>
  )
}

export default Homepage
