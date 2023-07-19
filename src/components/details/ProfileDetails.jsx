import LeftColProfile from './LeftColProfile'
import RightColProfile from './RightColProfile'
import { Row } from 'react-bootstrap'
import MobileBottomMenu from '../home/MobileBottomMenu'

function ProfileDetails() {
  return (
    <Row>
      <LeftColProfile />
      <RightColProfile />
      <MobileBottomMenu />
    </Row>
  )
}

export default ProfileDetails
