import { Row } from 'react-bootstrap'
import MobileBottomMenu from '../home/MobileBottomMenu'
import HomeNavbar from '../home/HomeNavbar'
import LeftColMyProfile from './LeftColMyProfile'
import RightColMyProfile from './RightColMyProfile'

function MyProfile() {
  return (
    <>
      <HomeNavbar />
      <div className='page-content'>
        <Row>
          <LeftColMyProfile />
          <RightColMyProfile />
          <MobileBottomMenu />
        </Row>
      </div>
    </>
  )
}

export default MyProfile
