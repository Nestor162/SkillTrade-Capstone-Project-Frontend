import { HomeIcon, LogOut, Settings2 } from 'lucide-react'
import { PlusCircle, User } from 'lucide-react'
import { useState, useContext } from 'react'
import { Navbar } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import PublishSkillModal from './PublishSkillModal'
import LogoutModal from './LogoutModal'
import { SearchContext } from '../contexts/SearchContext'

function MobileBottomMenu() {
  const navigate = useNavigate()
  const { resetSearch } = useContext(SearchContext)

  const handleLinkClick = route => {
    navigate(route)
    setActivePage(route)
  }
  const handleReset = () => {
    navigate('/home')
    setActivePage('/home')
    resetSearch
  }
  const [modalShow, setModalShow] = useState(false)

  const [showModal, setShowModal] = useState(false)
  const handleCloseModal = () => {
    setActivePage(location.pathname)
    setShowModal(false)
  }
  const handleShowModal = () => {
    setActivePage('/logout')
    setShowModal(true)
  }

  const location = useLocation()
  const [activePage, setActivePage] = useState(location.pathname)

  return (
    <div>
      <Navbar
        fixed='bottom'
        className='nav-bottom d-flex d-md-none justify-content-center align-items-center pb-2 gap-5'
      >
        <div onClick={handleReset} className='position-relative'>
          <HomeIcon color={activePage === '/home' ? 'var(--primary-color-dark)' : undefined} />
          <span>Home</span>
          <div className={activePage === '/home' ? 'active-bar' : ''} />
        </div>

        <div onClick={() => handleLinkClick('/me')} className='position-relative'>
          <User color={activePage === '/me' ? 'var(--primary-color-dark)' : undefined} />
          <span>Profile</span>
          <div className={activePage === '/me' ? 'active-bar' : ''} />
        </div>

        <div className='middle-icon' onClick={() => setModalShow(true)}>
          <PlusCircle size={'35px'} />
          <span>New skill</span>
        </div>
        <PublishSkillModal show={modalShow} onHide={() => setModalShow(false)} />

        {/* Separator */}
        <div></div>

        <div>
          <Settings2 color={'var(--neutral-color-borders) '} />
          <span>Settings</span>
        </div>

        <div onClick={handleShowModal} className='position-relative'>
          <LogOut color={activePage === '/logout' ? 'var(--primary-color-dark)' : undefined} />
          <span>Logout</span>
          <div className={activePage === '/logout' ? 'active-bar' : ''} />
        </div>

        <LogoutModal showModal={showModal} handleCloseModal={handleCloseModal} />

        {/* <div>
          <Bell />
          <span>Notifications</span>
        </div> */}

        {/* <div>
          <MessagesSquare />
          <span>Chats</span>
        </div> */}

        {/* <div>
          <History />
          <span>History</span>
        </div> */}
      </Navbar>
    </div>
  )
}

export default MobileBottomMenu
