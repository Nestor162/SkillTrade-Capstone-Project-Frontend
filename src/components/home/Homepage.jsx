import HomeNavbar from './HomeNavbar'
import MobileBottomMenu from './MobileBottomMenu'
import PostList from './PostsList'

function Homepage() {
  return (
    <div>
      <HomeNavbar />
      <PostList />
      <MobileBottomMenu />
    </div>
  )
}

export default Homepage
