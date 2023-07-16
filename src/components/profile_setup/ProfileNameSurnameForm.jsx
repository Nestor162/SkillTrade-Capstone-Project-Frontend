import { useEffect, useState } from 'react'
import { Form, Button, Alert, Spinner } from 'react-bootstrap'
import { GetAllLanguages, updateProfile } from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import AnimatedMulti from './AnimatedMulti'

function ProfilenameSurnameForm() {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [langs, setLangs] = useState([])
  const [selectedLang, setSelectedLang] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [options, setOptions] = useState('')

  const [errorMsg, setErrorMsg] = useState(null)
  const navigate = useNavigate()

  async function handleGetAllLanguages() {
    const { data, error } = await GetAllLanguages()
    if (error) {
      console.error(error)
    } else {
      setLangs(data)
      const options = data.map(lang => ({ value: lang.languageCode, label: lang.languageName }))
      setOptions(options)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    handleGetAllLanguages()
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    const languageCodes = selectedLang.map(lang => lang.value)
    const payload = {
      name: name,
      surname: surname,
      langs: languageCodes
    }
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
      {isLoading ? (
        <div className='d-flex align-items-center justify-content-center' style={{ height: '360px' }}>
          <Spinner animation='border' variant='success' />
        </div>
      ) : (
        <Form onSubmit={handleSubmit} className='p-4'>
          <Form.Group controlId='formName' className='mb-4'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your name'
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId='formSurname' className='mb-4'>
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your surname'
              value={surname}
              onChange={e => setSurname(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId='formLanguages' className='mb-4'>
            <Form.Label>Languages</Form.Label>

            <AnimatedMulti options={options} onChange={setSelectedLang} />
          </Form.Group>

          <Button type='submit' className='mt-4 main-btn d-block mx-auto'>
            CONTINUE
          </Button>
        </Form>
      )}
    </>
  )
}

export default ProfilenameSurnameForm
