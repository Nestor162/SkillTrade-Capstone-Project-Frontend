import { Row } from 'react-bootstrap'
import HomeNavbar from '../home/HomeNavbar'
import LeftCol from './LeftCol'
import RightCol from './RightCol'

function PostDetails() {
  return (
    <>
      <HomeNavbar />
      <div className='page-content'>
        <Row>
          <LeftCol />
          <RightCol />
        </Row>
      </div>
    </>
  )
}

export default PostDetails
