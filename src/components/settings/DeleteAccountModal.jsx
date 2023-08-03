import { AlertTriangle } from 'lucide-react'
import { Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { deleteUser } from '../../utils/api'
import { useAuthStore } from '../../store/useAuthStore'

// eslint-disable-next-line react/prop-types
function DeleteAccountModal({ show, onHide }) {
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate()
  const handleLogout = useAuthStore(state => state.handleLogout)

  const handleDelete = async () => {
    const response = await deleteUser(userId)
    if (response.data.status === 204) {
      handleLogout()
      navigate('/')
    }
  }
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          <AlertTriangle color='var(--tertiary-color)' />
          <span className='ms-3'>Delete account</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span className='ms-1'>Are you sure you want to DELETE your account?</span>
      </Modal.Body>
      <Modal.Footer>
        <div className='secondary-btn' onClick={onHide} style={{ padding: '6px' }}>
          Cancel
        </div>
        <Button className='negative-btn' onClick={() => handleDelete(userId)}>
          DELETE!
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteAccountModal
