import { CheckCircle2 } from 'lucide-react'
import PropTypes from 'prop-types'

function SuccessIcon({ className = 'me-1' }) {
  return (
    <CheckCircle2
      color='var(--primary-color)'
      strokeWidth={3}
      className={`position-absolute top-50 end-0 translate-middle-y ${className}`}
    />
  )
}
SuccessIcon.propTypes = {
  className: PropTypes.string
}

export default SuccessIcon
