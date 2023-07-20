import LeftColProfile from './LeftColProfile'
import RightColProfile from './RightColProfile'
import { Row } from 'react-bootstrap'
import MobileBottomMenu from '../home/MobileBottomMenu'
import HomeNavbar from '../home/HomeNavbar'
import { SearchProvider } from '../contexts/SearchContext'

function ProfileDetails() {
  return (
    <>
      <SearchProvider>
        <HomeNavbar />
        <MobileBottomMenu />
      </SearchProvider>
      <div className='page-content'>
        <Row>
          <LeftColProfile />
          <RightColProfile />
        </Row>
      </div>
    </>
  )
}

export default ProfileDetails
