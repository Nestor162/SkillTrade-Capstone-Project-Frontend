import { Spinner } from 'react-bootstrap'

function LoadingSpinner() {
  return (
    <div>
      <div className='d-flex align-items-center justify-content-center' style={{ height: '360px' }}>
        <Spinner animation='border' variant='success' />
      </div>
    </div>
  )
}

export default LoadingSpinner
