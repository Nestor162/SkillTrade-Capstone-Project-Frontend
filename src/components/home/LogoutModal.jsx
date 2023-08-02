import { Button, Modal } from 'react-bootstrap'
import GoodbyeImg from '../../assets/img/funny-character-goodbye.png'
import PropTypes from 'prop-types'
import { useAuthStore } from '../../store/useAuthStore'

function LogoutModal({ showModal, handleCloseModal }) {
  const handleLogout = useAuthStore(state => state.handleLogout)

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>Are you sure you want to logout?</div>
        <img src={GoodbyeImg} width={'120px'} alt='funny character saying goodbye' className='mt-3' />
      </Modal.Body>
      <Modal.Footer>
        <Button className='secondary-btn text-dark' onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button className='negative-btn' onClick={handleLogout}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
LogoutModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired
}
export default LogoutModal
