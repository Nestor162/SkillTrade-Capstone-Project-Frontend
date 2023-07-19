import LeftColProfile from './LeftColProfile'
import RightColProfile from './RightColProfile'
import { Row } from 'react-bootstrap'
import MobileBottomMenu from '../home/MobileBottomMenu'
import HomeNavbar from '../home/HomeNavbar'

function ProfileDetails() {
  return (
    <>
      <HomeNavbar />
      <div className='page-content'>
        <Row>
          <LeftColProfile />
          <RightColProfile />
          <MobileBottomMenu />
        </Row>
      </div>
    </>
  )
}

export default ProfileDetails
