// UpdatePictureModal.jsx
import { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'

const UpdatePictureModal = ({ show, onClose, onUpdate }) => {
  const [newPictureUrl, setNewPictureUrl] = useState('')

  const handleUpdatePicture = () => {
    onUpdate(newPictureUrl)
    onClose()
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Enter the URL of the new picture</Form.Label>
          <Form.Control type='text' placeholder='Enter URL' onChange={e => setNewPictureUrl(e.target.value)} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button className='secondary-btn' onClick={onClose}>
          Cancel
        </Button>
        <Button className='main-btn' onClick={handleUpdatePicture}>
          Update Picture
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

UpdatePictureModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
}

export default UpdatePictureModal
