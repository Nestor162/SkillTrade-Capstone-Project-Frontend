import { useEffect, useState } from 'react'
import { Button, Dropdown, FloatingLabel, Form, Image, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getUserByEmail, isValidImageUrl, registerUser, updateProfile } from '../../utils/api'
import ProfilePicturePlaceholder from '../../assets/img/profile_picture_placeholder_v1.jpg'
import ErrorAlert from '../common/ErrorAlert'
import { useFormik } from 'formik'
import ErrorIcon from '../common/ErrorIcon'
import SuccessIcon from '../common/SuccessIcon'
import { useUserStore } from '../../store/UserStore'
import { useAuthStore } from '../../store/useAuthStore'

function ProfileCreationForm() {
  const { user, name, surname, langs, interests } = useUserStore()
  const handleLogin = useAuthStore(state => state.handleLogin)

  const validate = values => {
    const errors = {}
    if (!values.birthDate) {
      errors.birthDate = (
        <>
          BirthDate is <strong>required</strong>
        </>
      )
    }

    if (!values.location) {
      errors.location = (
        <>
          Location is <strong>required</strong>
        </>
      )
    }

    if (!values.gender) {
      errors.gender = (
        <>
          Gender is <strong>required</strong>
        </>
      )
    }

    if (!values.bio) {
      errors.bio = (
        <>
          Bio is <strong>required</strong>
        </>
      )
    } else if (values.bio.length < 25 || values.bio.length > 500) {
      errors.bio = (
        <>
          Bio must be between <strong>25 and 500 characters</strong>
        </>
      )
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      birthDate: '',
      location: '',
      gender: '',
      bio: '',
      profilePic: ''
    },
    validate,
    onSubmit: values => {
      handleSubmit(values)
    }
  })
  const [errorMsg, setErrorMsg] = useState(null)
  const navigate = useNavigate()

  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
    formik.setFieldValue('profilePic', '')
  }
  const handleShow = () => setShow(true)
  const handleSavePic = async () => {
    if (!(await isValidImageUrl(formik.values.profilePic))) {
      setErrorMsg('Please enter a valid image URL.')
      formik.setFieldValue('profilePic', '')
      return
    }
    setShow(false)
    setErrorMsg(null)
  }

  async function handleSubmit(values) {
    const { data, error } = await registerUser(user)
    if (error || data === null) {
      setErrorMsg(error.message)
    } else {
      // Save token in locale storage
      handleLogin(data.accessToken)
      // Get user info and store it in localstorage for the future
      const userByEmailResponse = await getUserByEmail(user.email)

      // If there is an error in get by email fetch return the error
      if (userByEmailResponse.error) {
        console.error(userByEmailResponse.error)
        return { data: null, error: userByEmailResponse.error }
      }
      // othrewise store the user's ID and profile's ID in local storage
      else {
        localStorage.setItem('userId', userByEmailResponse.data.id)
        localStorage.setItem('profileId', userByEmailResponse.data.profile)
      }
    }

    const profilePayload = {
      name: name,
      surname: surname,
      location: values.location,
      biography: values.bio,
      birthDate: values.birthDate,
      gender: values.gender,
      langs: langs,
      interests: interests,
      profilePicture: values.profilePic || 'https://i.postimg.cc/zBdgkMM3/profile-picture-placeholder-v1.jpg' //default profile picture
    }

    // fetch to save interests in current profile
    const profileId = localStorage.getItem('profileId')
    const response = await updateProfile(profilePayload, profileId)
    if (response.error) {
      setErrorMsg(response.error.message)
    } else {
      navigate('/home')
    }
  }

  // Geoapify autocomplete API
  const [suggestions, setSuggestions] = useState([])

  const handleSuggestionClick = suggestion => {
    formik.setFieldValue('location', suggestion.properties.formatted)
    setSuggestions([])
  }

  const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY

  const handleLocationChange = async (event, formikEvent) => {
    formik.handleChange(formikEvent)
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

  useEffect(() => {
    if (name === '' || surname === '' || langs.length === 0) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {errorMsg && <ErrorAlert>{errorMsg}</ErrorAlert>}
      <Form className='px-5 my-3' onSubmit={formik.handleSubmit}>
        <Image
          src={formik.values.profilePic ? formik.values.profilePic : ProfilePicturePlaceholder}
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
            {errorMsg && <ErrorAlert>{errorMsg}</ErrorAlert>}
            <Form>
              <Form.Group className='my-5'>
                <Form.Label>Paste link here</Form.Label>
                <Form.Control
                  id='profilePic'
                  name='profilePic'
                  value={formik.values.profilePic}
                  type='text'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={formik.touched.profilePic && formik.errors.profilePic ? 'invalid-form' : null}
                  placeholder='https://example.com/image.jpg'
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

        <Form.Group className='mb-3'>
          <Form.Label className='mb-1'>Birth date</Form.Label>
          <div className='position-relative'>
            <Form.Control
              type='date'
              id='birthDate'
              name='birthDate'
              value={formik.values.birthDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.birthDate && formik.errors.birthDate ? 'invalid-form' : null}
            />
            {formik.errors.birthDate && formik.touched.birthDate ? (
              <ErrorIcon message={formik.errors.birthDate} className='me-5' />
            ) : (
              !formik.errors.birthDate && formik.touched.birthDate && <SuccessIcon className='me-5' />
            )}
          </div>
        </Form.Group>
        <Form.Group className='mb-3'>
          <div className='position-relative'>
            <Form.Control
              id='location'
              name='location'
              type='text'
              placeholder='Location'
              onChange={event => handleLocationChange(event, event)}
              onBlur={formik.handleBlur}
              value={formik.values.location}
              className={formik.touched.location && formik.errors.location ? 'invalid-form' : null}
            />
            {formik.errors.location && formik.touched.location ? (
              <ErrorIcon message={formik.errors.location} />
            ) : (
              !formik.errors.location && formik.touched.location && <SuccessIcon />
            )}
          </div>

          <Dropdown.Menu show={suggestions.length > 0}>
            {suggestions.map(suggestion => (
              <Dropdown.Item key={suggestion.properties.formatted} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.properties.formatted}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Form.Group>
        <Form.Group>
          <div className='position-relative'>
            <Form.Select
              name='gender'
              id='gender'
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.gender && formik.errors.gender ? 'invalid-form mb-3' : 'mb-3'}
            >
              <option value='' disabled>
                Choose gender
              </option>
              <option value='MALE'>Male</option>
              <option value='FEMALE'>Female</option>
              <option value='OTHER'>Other</option>
              <option value='PREFER_NOT_TO_SAY'>Prefer not to say</option>
            </Form.Select>
            {formik.errors.gender && formik.touched.gender ? (
              <ErrorIcon message={formik.errors.gender} className='me-5' />
            ) : (
              !formik.errors.gender && formik.touched.gender && <SuccessIcon className='me-5' />
            )}
          </div>
        </Form.Group>

        <FloatingLabel label='Bio'>
          <Form.Control
            as='textarea'
            id='bio'
            name='bio'
            value={formik.values.bio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Introduce yourself...'
            style={{ height: '65px' }}
            className={formik.touched.bio && formik.errors.bio ? 'invalid-form mt-3' : 'mt-3'}
          />
          {formik.errors.bio && formik.touched.bio ? (
            <ErrorIcon message={formik.errors.bio} />
          ) : (
            !formik.errors.bio && formik.touched.bio && <SuccessIcon />
          )}
        </FloatingLabel>
        <Button type='submit' className='mt-3 main-btn d-block mx-auto'>
          REGISTER
        </Button>
      </Form>
    </>
  )
}

export default ProfileCreationForm
