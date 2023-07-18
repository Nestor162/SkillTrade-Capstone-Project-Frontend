import { Button, Container, Dropdown, Form, Image, InputGroup, Navbar } from 'react-bootstrap'
import SkillTradeLogo from '../../assets/img/skilltrade-logo-with-text-horizontal-cropped-big-text.png'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProfilePicturePlaceholder from '../../assets/img/profile_picture_placeholder_v1.jpg'
import { LogOut, Menu, MessagesSquare, Moon, PlusSquare, Search, Settings2 } from 'lucide-react'
import { getProfileById } from '../../utils/api'
import { User } from 'lucide-react'
import { Bell } from 'lucide-react'
import { History } from 'lucide-react'
import PublishSkillModal from './PublishSkillModal'

function HomeNavbar() {
  const [profilePic, setProfilePic] = useState('')

  const [modalShow, setModalShow] = useState(false)

  async function handleProfilePicFetch() {
    const profileId = localStorage.getItem('profileId')
    const foundProfile = await getProfileById(profileId)
    setProfilePic(foundProfile.data.profilePicture)
    localStorage.setItem('profilePicture', profilePic)
  }

  useEffect(() => {
    handleProfilePicFetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className='light-bg'></div>
      <Navbar fixed='top' className='main-navbar p-1 w-100'>
        <Container fluid className=''>
          <div className='d-none d-md-flex align-items-center gap-3 ms-4 nav-desktop-options'>
            <Menu />
            <Link to={'/home'}>
              <img src={SkillTradeLogo} alt='Logo' width={'140px'} className='user-select-none me-3' />
            </Link>
          </div>
          <InputGroup className='main-search-group mx-auto m-3'>
            <Form.Control
              placeholder='Search what you want to learn next...'
              aria-label='Search what you want to learn next...'
              aria-describedby='main-search-bar'
              className='main-search-input'
            />
            <Button className='main-btn'>
              <Search size={18} color='white' strokeWidth={3} />
            </Button>
          </InputGroup>
          <div className='d-none d-md-flex justify-content-center align-items-center gap-3 me-4'>
            <div className='d-flex gap-2 secondary-btn p-1 px-2 ms-4' onClick={() => setModalShow(true)}>
              <span className='user-select-none text-nowrap'>Publish skill</span>
              <PlusSquare />
            </div>

            <PublishSkillModal show={modalShow} onHide={() => setModalShow(false)} />

            <Dropdown>
              <Dropdown.Toggle id='dropdown-profile-picture'>
                <Image
                  src={profilePic ? profilePic : ProfilePicturePlaceholder}
                  roundedCircle
                  className='profile-picture-placeholder'
                  width={'50px'}
                />
              </Dropdown.Toggle>

              <div className='dropdown-menu-alignment'>
                <Dropdown.Menu>
                  <Dropdown.Item className='text-dark d-flex gap-2 align-items-center' href='#'>
                    <User size={20} />
                    <span>My Profile</span>
                  </Dropdown.Item>
                  <Dropdown.Item className='text-dark d-flex gap-2 align-items-center' href='#/'>
                    <Bell size={20} />
                    <span>Notifications</span>
                  </Dropdown.Item>
                  <Dropdown.Item className='text-dark d-flex gap-2 align-items-center' href='#/'>
                    <Settings2 size={20} />
                    <span>Settings</span>
                  </Dropdown.Item>
                  <Dropdown.Item className='text-dark d-flex gap-2 align-items-center' href='#/'>
                    <Moon size={20} />
                    <span>Dark mode</span>
                  </Dropdown.Item>
                  <Dropdown.Item className='text-dark d-flex gap-2 align-items-center' href='#/'>
                    <History size={20} />
                    <span>History</span>
                  </Dropdown.Item>
                  <Dropdown.Item className='text-dark d-flex gap-2 align-items-center' href='#/'>
                    <MessagesSquare size={20} />
                    <span>Chats</span>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item className='text-dark d-flex gap-2 align-items-center' href='#'>
                    <LogOut size={20} />
                    <span>Logout</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </div>
            </Dropdown>
          </div>
        </Container>
      </Navbar>
    </>
  )
}

export default HomeNavbar
