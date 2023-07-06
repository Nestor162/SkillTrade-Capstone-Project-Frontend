import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import { useState } from 'react'
import googleBtn from '../../assets/img/btn_google_signin_light_normal_web@2x.png'

function GoogleSignBtn() {
  const [showToast, setShowToast] = useState(false)

  const toggleShowToast = () => setShowToast(!showToast)

  return (
    <Row>
      <Col md={6} className='mb-2 mt-1 w-100 position-relative'>
        <div className='d-flex justify-content-center mt-3' onClick={toggleShowToast}>
          <img
            src={googleBtn}
            alt='sign in with google button'
            width={'185px'}
            className='mx-auto'
            style={{ filter: 'opacity(0.60) contrast(0.6) blur(0.8px)' }}
          />
        </div>

        <div className='mt-3 position-absolute' style={{ left: '50%', transform: 'translateX(-50%)' }}>
          <Toast show={showToast} onClose={toggleShowToast} style={{ left: '50%', transform: 'translateY(-100%)' }}>
            <Toast.Header>
              <strong className='me-auto'>Don&apos;t panic!</strong>
            </Toast.Header>
            <Toast.Body>This feature will be implemented soon</Toast.Body>
          </Toast>
        </div>
      </Col>
    </Row>
  )
}

export default GoogleSignBtn
