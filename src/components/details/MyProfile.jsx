import { Row } from 'react-bootstrap'
import MobileBottomMenu from '../home/MobileBottomMenu'
import HomeNavbar from '../home/HomeNavbar'
import LeftColMyProfile from './LeftColMyProfile'
import RightColMyProfile from './RightColMyProfile'
import { SearchProvider } from '../contexts/SearchContext'

function MyProfile() {
  return (
    <>
      <SearchProvider>
        <HomeNavbar />
        <MobileBottomMenu />
      </SearchProvider>
      <div className='page-content'>
        <Row>
          <LeftColMyProfile />
          <RightColMyProfile />
        </Row>
      </div>
    </>
  )
}

export default MyProfile
