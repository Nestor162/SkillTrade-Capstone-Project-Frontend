import { Bell, Menu, Sun, User, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import logo from '../../assets/img/skilltrade-logo-only-text-cropped.png'
import { LogOut, MessagesSquare, Moon, Settings2 } from 'lucide-react'
import { History } from 'lucide-react'
import { Button, Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import GoodbyeImg from '../../assets/img/funny-character-goodbye.png'

function LeftOffCanvasMenu() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [darkMode, setDarkMode] = useState(false)

  const [showModal, setShowModal] = useState(false)

  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = () => setShowModal(true)

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  // Dark mode, not working yet
  useEffect(() => {
    const savedColorMode = localStorage.getItem('theme')
    if (savedColorMode === 'dark') {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-color-mode', 'dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-color-mode')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  return (
    <>
      <span onClick={handleShow} style={{ cursor: 'pointer' }}>
        <Menu />
      </span>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton={false}>
          <img src={logo} width={'170px'} height={'51.5px'} className='mx-auto mt-0' />
          <div className='custom-close-btn' onClick={handleClose}>
            <XCircle size={'27px'} />
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='left-menu d-flex flex-column gap-4 pt-3 h-100 ms-4'>
            <Link to={'/me'} className='text-decoration-none text-dark'>
              <div>
                <User size={20} />
                <span>My Profile</span>
              </div>
            </Link>
            <div>
              <Bell size={20} />
              <OverlayTrigger placement='right' overlay={<Tooltip id='notifications-tooltip'>Coming soon!</Tooltip>}>
                <span>Notifications</span>
              </OverlayTrigger>
            </div>

            <div>
              <Settings2 size={20} />
              <OverlayTrigger placement='right' overlay={<Tooltip id='notifications-tooltip'>Coming soon!</Tooltip>}>
                <span>Settings</span>
              </OverlayTrigger>
            </div>
            <div>
              <History size={20} />
              <OverlayTrigger placement='right' overlay={<Tooltip id='notifications-tooltip'>Coming soon!</Tooltip>}>
                <span>History</span>
              </OverlayTrigger>
            </div>
            <div>
              <MessagesSquare size={20} />
              <OverlayTrigger placement='right' overlay={<Tooltip id='notifications-tooltip'>Coming soon!</Tooltip>}>
                <span>Chats</span>
              </OverlayTrigger>
            </div>

            <span className='d-flex flex-column align-items-start mt-auto gap-3'>
              <OverlayTrigger placement='right' overlay={<Tooltip id='notifications-tooltip'>Coming soon!</Tooltip>}>
                <div className='d-flex align-items-center'>
                  {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                  <span style={{ width: '81px' }}>{darkMode ? 'Dark mode' : 'Light mode'}</span>
                  <Form.Check
                    disabled
                    type='switch'
                    id='dark-mode-switch'
                    className='ms-auto'
                    onChange={() => setDarkMode(!darkMode)}
                  />
                </div>
              </OverlayTrigger>

              <div onClick={handleShowModal}>
                <LogOut size={20} />
                <span>Logout</span>
              </div>
            </span>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
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
    </>
  )
}

export default LeftOffCanvasMenu
