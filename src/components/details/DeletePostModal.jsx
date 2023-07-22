import { AlertTriangle } from 'lucide-react'
import { Modal, Button, Card } from 'react-bootstrap'
import TruncateText from '../../utils/TruncateText'
import ExtraInfoWithIcons from '../home/ExtraInfoWithIcons'
import PropTypes from 'prop-types'

function DeletePostModal({
  show,
  onHide,
  title,
  content,
  category,
  availability,
  skillLevel,
  publicationDate,
  postPhoto,
  postId,
  handleDelete
}) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          <AlertTriangle color='var(--tertiary-color)' />
          <span className='ms-3'>{'Delete Post'}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span className='ms-1'>Are you sure you want to delete this post?</span>
        <Card className='custom-card mt-3'>
          {postPhoto && <Card.Img variant='top' className='rounded-0' src={postPhoto} />}
          <Card.Body>
            <Card.Title className='text-black d-flex justify-content-between'>
              <span>{title}</span>
            </Card.Title>

            <div className='text-body mb-3'>
              <TruncateText text={content} maxLines={3} className='text-body' />
            </div>
            <div className='d-flex gap-3 small text-secondary'>
              <ExtraInfoWithIcons category={category} availability={availability} skillLevel={skillLevel} />
            </div>
          </Card.Body>

          <Card.Footer>
            <div className='small text-secondary ms-2'>Published on: {publicationDate}</div>
          </Card.Footer>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <div className='secondary-btn' onClick={onHide} style={{ padding: '6px' }}>
          Cancel
        </div>
        <Button className='negative-btn' onClick={() => handleDelete(postId)}>
          DELETE!
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
DeletePostModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  skillLevel: PropTypes.string.isRequired,
  publicationDate: PropTypes.string.isRequired,
  postPhoto: PropTypes.string,
  postId: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired
}
export default DeletePostModal
