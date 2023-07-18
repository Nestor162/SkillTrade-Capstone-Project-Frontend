import { History, LogOut, MessagesSquare, Settings2 } from 'lucide-react'
import { Bell, PlusCircle, User } from 'lucide-react'
import { Navbar } from 'react-bootstrap'

function MobileBottomMenu() {
  return (
    <div>
      <Navbar
        fixed='bottom'
        className='nav-bottom d-flex d-md-none justify-content-center align-items-center pb-2 gap-5'
      >
        <div>
          <User />
          <span>Profile</span>
        </div>

        <div>
          <Settings2 />
          <span>Settings</span>
        </div>

        <div className='middle-icon'>
          <PlusCircle size={'35px'} />
          <span>New skill</span>
        </div>

        {/* Separator */}
        <div></div>

        <div>
          <Bell />
          <span>Notifications</span>
        </div>

        <div>
          <MessagesSquare />
          <span>Chats</span>
        </div>

        {/* <div>
          <History />
          <span>History</span>
        </div> */}

        {/* <div>
          <LogOut />
          <span>Logout</span>
        </div> */}
      </Navbar>
    </div>
  )
}

export default MobileBottomMenu
