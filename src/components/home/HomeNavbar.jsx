import { Button, Container, Form, Image, InputGroup, Navbar } from 'react-bootstrap'
import SkillTradeLogo from '../../assets/img/skilltrade-icon.png'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProfilePicturePlaceholder from '../../assets/img/profile_picture_placeholder_v1.jpg'
import { Menu, PlusSquare, Search } from 'lucide-react'
import { getProfileById } from '../../utils/api'

function HomeNavbar() {
  const [profilePic, setProfilePic] = useState('')

  async function handleProfilePicFetch() {
    const profileId = localStorage.getItem('profileId')
    const foundProfile = await getProfileById(profileId)
    setProfilePic(foundProfile.data.profilePicture)
  }

  useEffect(() => {
    handleProfilePicFetch()
  }, [])

  return (
    <main className='light-bg'>
      <Navbar className='main-navbar mb-3 p-1 w-100'>
        <Container fluid className=''>
          <div className='d-none d-md-flex align-items-center gap-2 ms-4 nav-desktop-options'>
            <Menu />
            <Link to={'/home'}>
              <img src={SkillTradeLogo} alt='Logo' width={'60px'} className='user-select-none me-3' />
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
              <Search size={18} />
            </Button>
          </InputGroup>
          <div className='d-none d-md-flex justify-content-center align-items-center gap-3 me-4'>
            <div className='d-flex gap-2 secondary-btn p-1 px-2 ms-4'>
              <span className='user-select-none text-nowrap'>Publish skill</span>
              <PlusSquare />
            </div>
            <Image
              src={profilePic ? profilePic : ProfilePicturePlaceholder}
              roundedCircle
              className='profile-picture-placeholder'
              width={'50px'}
            />
          </div>
        </Container>
      </Navbar>
    </main>
  )
}

export default HomeNavbar
