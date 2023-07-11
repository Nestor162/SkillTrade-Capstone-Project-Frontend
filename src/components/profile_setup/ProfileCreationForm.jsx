import { useState } from 'react'
import { Alert, Button, Dropdown, FloatingLabel, Form, Image, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '../../utils/api'
import ProfilePicturePlaceholder from '../../assets/img/profile_picture_placeholder_v1.jpg'

function ProfileCreationForm() {
  const [errorMsg, setErrorMsg] = useState(null)
  const navigate = useNavigate()

  const [birthDate, setBirthDate] = useState('')
  const [location, setLocation] = useState('')
  const [gender, setGender] = useState('')
  const [bio, setBio] = useState('')
  const [profilePic, setProfilePic] = useState('')

  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
    setProfilePic('')
  }
  const handleShow = () => setShow(true)
  const handleSavePic = () => setShow(false)

  async function handleSubmit(event) {
    event.preventDefault()

    const profilePayload = {
      birthDate: birthDate,
      location: location,
      gender: gender,
      biography: bio,
      profilePicture: profilePic || 'https://pasteboard.co/1I7zuqwG8cQy.jpg' //default profile picture
    }

    // fetch to save interests in current profile
    const profileId = localStorage.getItem('profileId')
    const response = await updateProfile(profilePayload, profileId)
    if (response.error) {
      setErrorMsg(response.error.message)
      setTimeout(() => {
        setErrorMsg(null)
      }, 3000)
    } else {
      navigate('/home')
    }
  }

  const handleCloseAlert = () => {
    setErrorMsg(null)
  }

  // Geoapify autocomplete API
  const [suggestions, setSuggestions] = useState([])

  const handleSuggestionClick = suggestion => {
    setLocation(suggestion.properties.formatted)
    setSuggestions([])
  }

  const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY

  const handleLocationChange = async event => {
    setLocation(event.target.value)

    if (event.target.value.length > 2) {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${event.target.value}&apiKey=${apiKey}`
      )
      const data = await response.json()
      setSuggestions(data.features)
    } else {
      setSuggestions([])
    }
  }

  return (
    <>
      {errorMsg && (
        <Alert
          key='danger'
          variant='danger'
          className='position-absolute start-0 end-0 top-0 z-3'
          onClick={handleCloseAlert}
        >
          {errorMsg}
        </Alert>
      )}
      <Form className='px-5 my-3' onSubmit={handleSubmit}>
        <Image
          src={profilePic ? profilePic : ProfilePicturePlaceholder}
          roundedCircle
          className='profile-picture-placeholder mx-auto d-block'
          width={'85px'}
          height={'85px'}
        />
        <button type='button' className='secondary-btn mx-auto d-block mt-2 mb-3 small' onClick={handleShow}>
          Change profile picture
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Set your profile picture</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                <Form.Label>Paste link here</Form.Label>
                <Form.Control
                  value={profilePic}
                  type='text'
                  onChange={e => setProfilePic(e.target.value)}
                  placeholder='example-picture-link.jpg'
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' className='negative-btn' onClick={handleClose}>
              Cancel
            </Button>
            <Button variant='primary' className='main-btn' onClick={handleSavePic}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Form.Group className='mb-3' controlId='birthDate'>
          <Form.Label className='mb-1'>Birth date</Form.Label>
          <Form.Control type='date' value={birthDate} onChange={e => setBirthDate(e.target.value)} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='location'>
          <Form.Control type='text' placeholder='Location' value={location} onChange={handleLocationChange} />

          <Dropdown.Menu show={suggestions.length > 0}>
            {suggestions.map(suggestion => (
              <Dropdown.Item key={suggestion.properties.formatted} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.properties.formatted}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Form.Group>
        <Form.Group controlId='gender'>
          <Form.Select value={gender} onChange={e => setGender(e.target.value)}>
            <option disabled>Choose gender</option>
            <option value='MALE'>Male</option>
            <option value='FEMALE'>Female</option>
            <option value='OTHER'>Other</option>
            <option value='PREFER_NOT_TO_SAY'>Prefer not to say</option>
          </Form.Select>
        </Form.Group>
        <FloatingLabel controlId='floatingTextarea2' label='Bio'>
          <Form.Control
            as='textarea'
            placeholder='Introduce yourself...'
            style={{ height: '65px' }}
            className='mt-3'
            value={bio}
            onChange={e => setBio(e.target.value)}
            maxlength={500}
            minLength={25}
          />
        </FloatingLabel>
        <Button type='submit' className='mt-3 main-btn d-block mx-auto'>
          CONTINUE
        </Button>
      </Form>
    </>
  )
}

export default ProfileCreationForm
