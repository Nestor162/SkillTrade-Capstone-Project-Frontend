import { Container, Form, Image, Navbar } from 'react-bootstrap'
import SkillTradeLogo from '../../assets/img/skilltrade-icon.png'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProfilePicturePlaceholder from '../../assets/img/profile_picture_placeholder_v1.jpg'
import { Menu, PlusSquare } from 'lucide-react'
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
        <Container fluid>
          <Menu />
          <Link to={'/home'}>
            <img src={SkillTradeLogo} alt='Logo' width={'60px'} />
          </Link>
          <Form>
            <Form.Control
              type='search'
              className='me-2'
              aria-label='Search'
              placeholder='Search what you want to learn next...'
            />
          </Form>
          <PlusSquare />
          <Image
            src={profilePic ? profilePic : ProfilePicturePlaceholder}
            roundedCircle
            className='profile-picture-placeholder'
            width={'50px'}
          />
        </Container>
      </Navbar>
    </main>
  )
}

export default HomeNavbar
