import { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { updateProfile } from '../../utils/api'
import { useNavigate } from 'react-router-dom'

function ProfilenameSurnameForm() {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')

  const [errorMsg, setErrorMsg] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    const payload = { name, surname }
    // fetch to save name and surname in current profile
    const profileId = localStorage.getItem('profileId')
    const response = await updateProfile(payload, profileId)
    if (response.error) {
      setErrorMsg(response.error)
    } else {
      navigate('/profile-creation')
    }
    console.log(payload)
  }

  const handleCloseAlert = () => {
    setErrorMsg(null)
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
      <Form onSubmit={handleSubmit} className='p-4'>
        <Form.Group controlId='formName' className='mb-4'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formSurname' className='mb-4'>
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your surname'
            value={surname}
            onChange={e => setSurname(e.target.value)}
          />
        </Form.Group>
        <Button type='submit' className='mt-4 main-btn d-block mx-auto'>
          CONTINUE
        </Button>
      </Form>
    </>
  )
}

export default ProfilenameSurnameForm
