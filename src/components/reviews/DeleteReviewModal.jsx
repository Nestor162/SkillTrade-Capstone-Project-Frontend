import { AlertTriangle } from 'lucide-react'
import { Modal, Button, Card } from 'react-bootstrap'
import TruncateText from '../../utils/TruncateText'
import PropTypes from 'prop-types'
import { formatDate } from '../../utils/stringUtils'

function DeleteReviewModal({ show, onClose, handleDelete, title, content, publicationDate, reviewId }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <AlertTriangle color='var(--tertiary-color)' />
          <span className='ms-3'>Delete Review</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span className='ms-1'>Are you sure you want to delete this review?</span>
        <Card className='custom-card mt-3'>
          <Card.Body>
            <Card.Title className='text-black d-flex justify-content-between'>
              <span>{title}</span>
            </Card.Title>

            <div className='text-body mb-3'>
              <TruncateText text={content} maxLines={3} className='text-body' />
            </div>
          </Card.Body>

          <Card.Footer>
            <div className='small text-secondary ms-2'>Published on: {formatDate(publicationDate)}</div>
          </Card.Footer>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <div className='secondary-btn' onClick={onClose} style={{ padding: '6px' }}>
          Cancel
        </div>
        <Button className='negative-btn' onClick={() => handleDelete(reviewId)}>
          DELETE!
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
DeleteReviewModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  publicationDate: PropTypes.string.isRequired,
  reviewRating: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  reviewId: PropTypes.string.isRequired
}
export default DeleteReviewModal
