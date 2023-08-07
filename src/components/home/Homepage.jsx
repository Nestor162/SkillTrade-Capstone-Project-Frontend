import HomeNavbar from './HomeNavbar'
import MobileBottomMenu from './MobileBottomMenu'
import SearchResultList from './SearchResultList'
import { SearchProvider } from '../contexts/SearchContext'
import ServerStatusChecker from '../common/ServerStatusChecker'

function Homepage() {
  return (
    <div>
      <SearchProvider>
        <HomeNavbar />
        <SearchResultList />
        <ServerStatusChecker />
        <MobileBottomMenu />
      </SearchProvider>
    </div>
  )
}

export default Homepage
