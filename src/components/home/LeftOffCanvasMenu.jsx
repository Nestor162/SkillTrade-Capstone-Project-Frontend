import { Bell, Menu, Sun, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import logo from '../../assets/img/skilltrade-logo-only-text-cropped.png'
import { LogOut, MessagesSquare, Moon, Settings2 } from 'lucide-react'
import { History } from 'lucide-react'
import { Form } from 'react-bootstrap'

function LeftOffCanvasMenu() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-color-mode', 'dark')
    } else {
      document.documentElement.removeAttribute('data-color-mode')
    }
  }, [darkMode])

  return (
    <>
      <span onClick={handleShow} style={{ cursor: 'pointer' }}>
        <Menu />
      </span>

      <Offcanvas show={show} closeButton={false} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <img src={logo} width={'170px'} height={'51.5px'} className='mx-auto mt-0' />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='left-menu d-flex flex-column gap-4 pt-3 h-100'>
            <div>
              <User size={20} />
              <span>My Profile</span>
            </div>
            <div>
              <Bell size={20} />
              <span>Notifications</span>
            </div>
            <div>
              <Settings2 size={20} />
              <span>Settings</span>
            </div>
            <div>
              <History size={20} />
              <span>History</span>
            </div>
            <div>
              <MessagesSquare size={20} />
              <span>Chats</span>
            </div>

            <div className='d-flex flex-column align-items-start mt-auto'>
              <div className='d-flex align-items-center'>
                {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                <span className='ms-2' style={{ width: '81px' }}>
                  {darkMode ? 'Dark mode' : 'Light mode'}
                </span>
                <Form.Check
                  type='switch'
                  id='dark-mode-switch'
                  className='ms-auto'
                  onChange={() => setDarkMode(!darkMode)}
                />
              </div>

              <div>
                <LogOut size={20} />
                <span>Logout</span>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default LeftOffCanvasMenu
