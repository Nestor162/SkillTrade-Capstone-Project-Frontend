import { AlertCircle } from 'lucide-react'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import PropTypes from 'prop-types'

function ErrorIcon({ message, className = 'me-1' }) {
  return (
    <OverlayTrigger
      trigger={['hover', 'focus', 'click']}
      placement='top'
      overlay={
        <Popover>
          <Popover.Header as='h3'>Invalid value</Popover.Header>
          <Popover.Body>{message}</Popover.Body>
        </Popover>
      }
    >
      <AlertCircle
        tabIndex={0}
        color='var(--tertiary-color)'
        strokeWidth={3}
        className={`position-absolute top-50 end-0 translate-middle-y ${className}`}
      />
    </OverlayTrigger>
  )
}
ErrorIcon.propTypes = {
  message: PropTypes.object,
  className: PropTypes.string
}

export default ErrorIcon
