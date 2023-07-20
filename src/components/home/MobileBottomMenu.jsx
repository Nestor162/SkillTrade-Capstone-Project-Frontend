import { HomeIcon, LogOut, Settings2 } from 'lucide-react'
import { PlusCircle, User } from 'lucide-react'
import { useState, useContext } from 'react'
import { Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import PublishSkillModal from './PublishSkillModal'
import LogoutModal from './LogoutModal'
import { SearchContext } from '../contexts/SearchContext'

function MobileBottomMenu() {
  const navigate = useNavigate()
  const { resetSearch } = useContext(SearchContext)

  const handleLinkClick = route => {
    navigate(route)
  }

  const handleReset = () => {
    navigate('/home')
    resetSearch
  }
  const [modalShow, setModalShow] = useState(false)

  const [showModal, setShowModal] = useState(false)
  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = () => setShowModal(true)

  return (
    <div>
      <Navbar
        fixed='bottom'
        className='nav-bottom d-flex d-md-none justify-content-center align-items-center pb-2 gap-5'
      >
        <div onClick={handleReset}>
          <HomeIcon />
          <span>Home</span>
        </div>

        <div onClick={() => handleLinkClick('/me')}>
          <User />
          <span>Profile</span>
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

        <div onClick={handleShowModal}>
          <LogOut />
          <span>Logout</span>
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
