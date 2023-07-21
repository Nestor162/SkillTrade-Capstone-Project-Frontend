import { Bell, Code2, Menu, Sun, User, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import logo from '../../assets/img/skilltrade-logo-only-text-cropped.png'
import { LogOut, MessagesSquare, Moon, Settings2 } from 'lucide-react'
import { History } from 'lucide-react'
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LogoutModal from './LogoutModal'
import Character from '../../assets/img/pixel-avatar/pixel-avatar-cropped.png'
import Bubble1 from '../../assets/img/pixel-avatar/sepach-bubble-1.png'
import Bubble2 from '../../assets/img/pixel-avatar/sepach-bubble-2.png'
import LinkedinLogo from '../../assets/img/pixel-avatar/linkedin-pixel-logo.png'
import GitHubLogo from '../../assets/img/pixel-avatar/github-pixel-logo.png'

function LeftOffCanvasMenu() {
  const [show, setShow] = useState(false)

  const [characterShow, setCharacterShow] = useState(false)
  const [characterClicked, setCharacterClicked] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [darkMode, setDarkMode] = useState(false)

  const [showModal, setShowModal] = useState(false)

  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = () => setShowModal(true)

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
          <div className='left-menu d-flex flex-column gap-4 h-100 ms-4'>
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

            <span className='d-flex flex-column align-items-start mt-auto gap-3 position-relative'>
              <img
                src={Character}
                width={'85px'}
                alt='pixel art representaiton of the developer'
                className={characterShow ? 'slide-in-left' : 'd-none'}
                id='character'
                onClick={() => {
                  setCharacterClicked(!characterClicked)
                }}
              />
              <a
                href='https://www.linkedin.com/in/nestor-cicardini-fullstack-developer/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-dark text-decoration-none'
              >
                <img
                  src={Bubble1}
                  className={characterShow ? 'bubble1 wobble-hor-bottom' : 'd-none'}
                  alt='pixel speach bubble'
                  width={'100px'}
                />
                <img
                  src={LinkedinLogo}
                  className={characterShow ? 'linkedinLogo wobble-hor-bottom' : 'd-none'}
                  alt='pixel art linkedin logo'
                  width={'20px'}
                />
                <span
                  className={characterShow ? 'pixel-text position-absolute wobble-hor-bottom' : 'd-none'}
                  style={{ top: '-18px', right: '24px' }}
                >
                  LinkedIn
                </span>
              </a>
              <a
                href='https://github.com/Nestor162'
                target='_blank'
                rel='noopener noreferrer'
                className='text-dark text-decoration-none'
              >
                <img
                  src={Bubble2}
                  className={characterShow ? 'slide-in-left bubble2 wobble-hor-bottom' : 'd-none'}
                  alt='pixel speach bubble'
                  width={'95px'}
                />
                <img
                  src={GitHubLogo}
                  className={characterShow ? 'github-logo wobble-hor-bottom' : 'd-none'}
                  alt='pixel art linkedin logo'
                  width={'22px'}
                />
                <span
                  className={characterShow ? 'pixel-text position-absolute wobble-hor-bottom' : 'd-none'}
                  style={{ top: '44px', right: '16px' }}
                >
                  GitHub
                </span>
              </a>
              <div className='mt-auto mb-0' onClick={() => setCharacterShow(!characterShow)}>
                <Code2 />
                <span>About the dev</span>
              </div>
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
      <LogoutModal showModal={showModal} handleCloseModal={handleCloseModal} />
    </>
  )
}

export default LeftOffCanvasMenu
