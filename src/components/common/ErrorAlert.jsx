import { Alert } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useState } from 'react'

function ErrorAlert({ children, onClose }) {
  const [show, setShow] = useState(true)

  return (
    <Alert
      show={show}
      key='danger'
      variant='danger'
      className='position-absolute start-0 end-0 top-0 z-3'
      onClick={() => {
        setShow(false)
        onClose()
      }}
    >
      {children}
    </Alert>
  )
}

ErrorAlert.propTypes = {
  children: PropTypes.string.isRequired,
  onClose: PropTypes.func
}
export default ErrorAlert
