import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { GetAllLanguages, getAllInterests } from '../../utils/api'
import Select from 'react-select'

function EditProfileModal({
  show,
  handleClose,
  handleUpdateProfile,
  currentName,
  currentSurname,
  currentGender,
  currentBirthDate,
  currentSpokenLanguages,
  currentInterests
}) {
  const [name, setName] = useState(currentName)
  const [surname, setSurname] = useState(currentSurname)
  const [gender, setGender] = useState(currentGender)
  const [birthDate, setBirthDate] = useState(currentBirthDate)
  const [spokenLanguages, setSpokenLanguages] = useState(currentSpokenLanguages.map(lang => lang.languageCode))

  const [interests, setInterests] = useState(currentInterests.map(interest => interest.id))
  const [availableLanguages, setAvailableLanguages] = useState([])
  const [availableInterests, setAvailableInterests] = useState([])

  useEffect(() => {
    // Fetch available languages and interests
    fetchLanguages()
    fetchInterests()
  }, [])

  const fetchLanguages = async () => {
    const response = await GetAllLanguages()
    setAvailableLanguages(response.data)
  }

  const fetchInterests = async () => {
    const response = await getAllInterests()
    setAvailableInterests(response.data)
  }

  const handleSubmit = event => {
    event.preventDefault()
    console.log(spokenLanguages)
    handleUpdateProfile({ name, surname, gender, birthDate, spokenLanguages, interests })
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' value={name} onChange={event => setName(event.target.value)} />
            </Form.Group>
            <Form.Group as={Col} controlId='surname'>
              <Form.Label>Surname</Form.Label>
              <Form.Control type='text' value={surname} onChange={event => setSurname(event.target.value)} />
            </Form.Group>
          </Row>
          <Form.Group className='mb-3' controlId='gender'>
            <Form.Label>Gender</Form.Label>
            <Form.Select value={gender} onChange={event => setGender(event.target.value)}>
              <option value=''>Select...</option>
              <option value='MALE'>Male</option>
              <option value='FEMALE'>Female</option>
              <option value='OTHER'>Other</option>
              <option value='PREFER_NOT_TO_SAY'>Prefer not to say</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className='mb-3' controlId='birthDate'>
            <Form.Label>Birth Date</Form.Label>
            <Form.Control type='date' value={birthDate} onChange={event => setBirthDate(event.target.value)} />
          </Form.Group>

          <Form.Group className='mb-3' controlId='spokenLanguages'>
            <Form.Label>Spoken Languages</Form.Label>
            <Select
              isMulti
              options={availableLanguages.map(language => ({
                value: language.languageCode,
                label: language.languageName
              }))}
              value={spokenLanguages
                .map(languageId => availableLanguages.find(language => language.languageCode === languageId))
                .map(language => (language ? { value: language.languageCode, label: language.languageName } : null))}
              onChange={selectedOptions => {
                setSpokenLanguages(selectedOptions.map(option => option.value))
              }}
              menuPlacement='auto'
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='interests'>
            <Form.Label>Interests</Form.Label>
            <Select
              isMulti
              options={availableInterests.map(interest => ({
                value: interest.id,
                label: interest.name
              }))}
              value={interests
                .map(interestid => availableInterests.find(interest => interest.id === interestid))
                .map(interest => (interest ? { value: interest.id, label: interest.name } : null))}
              onChange={selectedOptions => setInterests(selectedOptions.map(option => option.value))}
              menuPlacement='auto'
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button className='secondary-btn' onClick={handleClose}>
            Close
          </Button>
          <Button className='main-btn' type='submit'>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

EditProfileModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleUpdateProfile: PropTypes.func.isRequired,
  currentName: PropTypes.string,
  currentSurname: PropTypes.string,
  currentBio: PropTypes.string,
  currentInterests: PropTypes.array,
  currentSpokenLanguages: PropTypes.array,
  currentBirthDate: PropTypes.string,
  currentGender: PropTypes.string
}

export default EditProfileModal
