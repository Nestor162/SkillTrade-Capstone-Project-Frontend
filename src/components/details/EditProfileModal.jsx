import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Form, Row, Col, Dropdown } from 'react-bootstrap'
import { GetAllLanguages, getAllInterests } from '../../utils/api'
import Select from 'react-select'
import { useFormik } from 'formik'
import ErrorIcon from '../common/ErrorIcon'
import SuccessIcon from '../common/SuccessIcon'

function EditProfileModal({
  show,
  handleClose,
  handleUpdateProfile,
  currentName,
  currentSurname,
  currentGender,
  currentBirthDate,
  currentSpokenLanguages,
  currentInterests,
  currentBio,
  currentLocation
}) {
  const [availableLanguages, setAvailableLanguages] = useState([])
  const [availableInterests, setAvailableInterests] = useState([])

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

  const validate = values => {
    const errors = {}

    const patternNameSurname = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s[a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/

    if (!values.name) {
      errors.name = (
        <>
          Name is <strong>required</strong>
        </>
      )
    } else if (!patternNameSurname.test(values.name)) {
      errors.name = (
        <>
          The name is <strong>not valid</strong>
        </>
      )
    }

    if (!values.surname) {
      errors.surname = (
        <>
          Surname is <strong>required</strong>
        </>
      )
    } else if (!patternNameSurname.test(values.surname)) {
      errors.surname = (
        <>
          The surname is <strong>not valid</strong>
        </>
      )
    }

    if (!values.gender) {
      errors.gender = 'Gender is required'
    }
    if (!values.birthDate) {
      errors.birthDate = 'Birth date is required'
    }
    if (!values.spokenLanguages || values.spokenLanguages.length === 0) {
      errors.spokenLanguages = 'Select at least one language'
    }
    if (!values.interests || values.interests.length === 0) {
      errors.interests = 'Select at least one interest'
    }
    if (!values.spokenLanguages || values.spokenLanguages.length === 0) {
      errors.spokenLanguages = 'Select at least one language'
    }
    if (!values.interests || values.interests.length === 0) {
      errors.interests = 'Select at least one interest'
    }

    if (!values.biography) {
      errors.biography = (
        <>
          Bio is <strong>required</strong>
        </>
      )
    } else if (values.biography.length < 25 || values.biography.length > 500) {
      errors.biography = (
        <>
          Bio must be between <strong>25 and 500 characters</strong>
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
    return errors
  }

  const formik = useFormik({
    initialValues: {
      name: currentName,
      surname: currentSurname,
      gender: currentGender,
      birthDate: currentBirthDate,
      spokenLanguages: currentSpokenLanguages.map(lang => lang.languageCode),
      interests: currentInterests.map(interest => interest.id),
      biography: currentBio,
      location: currentLocation
    },
    validate,
    onSubmit: values => {
      handleUpdateProfile({
        name: values.name,
        surname: values.surname,
        gender: values.gender,
        birthDate: values.birthDate,
        spokenLanguages: values.spokenLanguages,
        interests: values.interests,
        biography: values.biography,
        location: values.location
      })
      handleClose()
    }
  })

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

  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose()
      }}
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className='mb-3'>
            <Form.Group as={Col}>
              <Form.Label>Name</Form.Label>
              <div className='position-relative'>
                <Form.Control
                  type='text'
                  id='name'
                  name='name'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={formik.errors.name && formik.touched.name ? 'invalid-form' : null}
                />
                {formik.errors.name && formik.touched.name ? (
                  <ErrorIcon message={formik.errors.name} />
                ) : (
                  !formik.errors.name && formik.touched.name && <SuccessIcon />
                )}
              </div>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Surname</Form.Label>
              <div className='position-relative'>
                <Form.Control
                  type='text'
                  id='surname'
                  name='surname'
                  value={formik.values.surname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={formik.errors.surname && formik.touched.surname ? 'invalid-form' : null}
                />
                {formik.errors.surname && formik.touched.surname ? (
                  <ErrorIcon message={formik.errors.surname} />
                ) : (
                  !formik.errors.surname && formik.touched.surname && <SuccessIcon />
                )}
              </div>
            </Form.Group>
          </Row>

          <Form.Group as={Col} className='mb-3'>
            <Form.Label>Location</Form.Label>
            <div className='position-relative'>
              <Form.Control
                type='text'
                id='location'
                name='location'
                value={formik.values.location}
                onChange={event => handleLocationChange(event, event)}
                onBlur={formik.handleBlur}
                className={formik.errors.location && formik.touched.location ? 'invalid-form' : null}
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

          <Form.Group as={Col} className='mb-3'>
            <Form.Label>Biography</Form.Label>
            <div className='position-relative'>
              <Form.Control
                as='textarea'
                type='text'
                id='biography'
                name='biography'
                value={formik.values.biography}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.errors.biography && formik.touched.biography ? 'invalid-form' : null}
              />
              {formik.errors.biography && formik.touched.biography ? (
                <ErrorIcon message={formik.errors.biography} />
              ) : (
                !formik.errors.biography && formik.touched.biography && <SuccessIcon />
              )}
            </div>
          </Form.Group>

          <Row className='mb-3'>
            <Form.Group as={Col}>
              <Form.Label>Gender</Form.Label>
              <Form.Select
                id='gender'
                name='gender'
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.errors.gender && formik.touched.gender ? 'invalid-form' : null}
              >
                <option value=''>Select...</option>
                <option value='MALE'>Male</option>
                <option value='FEMALE'>Female</option>
                <option value='OTHER'>Other</option>
                <option value='PREFER_NOT_TO_SAY'>Prefer not to say</option>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{formik.errors.gender}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                type='date'
                id='birthDate'
                name='birthDate'
                value={formik.values.birthDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.errors.birthDate && formik.touched.birthDate ? 'invalid-form' : null}
              />
              <Form.Control.Feedback type='invalid'>{formik.errors.birthDate}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Form.Group className='mb-3'>
            <Form.Label>Spoken Languages</Form.Label>
            <div className='position-relative'>
              <Select
                isMulti
                id='spokenLanguages'
                name='spokenLanguages'
                className={formik.errors.spokenLanguages && formik.touched.spokenLanguages ? 'invalid-form' : null}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    borderColor: state.isFocused ? 'var(--primary-color-light)' : provided.borderColor,
                    boxShadow: state.isFocused ? '0 0 0 0.2rem var(--primary-color-dark)' : provided.boxShadow
                  })
                }}
                options={availableLanguages.map(language => ({
                  value: language.languageCode,
                  label: language.languageName
                }))}
                value={formik.values.spokenLanguages
                  .map(languageId => availableLanguages.find(language => language.languageCode === languageId))
                  .map(language => (language ? { value: language.languageCode, label: language.languageName } : null))}
                onChange={selectedOptions => {
                  formik.setFieldValue(
                    'spokenLanguages',
                    selectedOptions.map(option => option.value)
                  )
                }}
                onBlur={() => formik.setFieldTouched('spokenLanguages', true)}
              />
              {formik.errors.spokenLanguages && formik.touched.spokenLanguages ? (
                <ErrorIcon message={formik.errors.spokenLanguages} className='me-5' />
              ) : (
                !formik.errors.spokenLanguages && formik.touched.spokenLanguages && <SuccessIcon className='me-6' />
              )}
            </div>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Interests</Form.Label>
            <div className='position-relative'>
              <Select
                isMulti
                id='interests'
                name='interests'
                className={formik.errors.interests && formik.touched.interests ? 'invalid-form' : null}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    borderColor: state.isFocused ? 'var(--primary-color-light)' : provided.borderColor,
                    boxShadow: state.isFocused ? '0 0 0 0.2rem var(--primary-color-dark)' : provided.boxShadow
                  })
                }}
                options={availableInterests.map(interest => ({
                  value: interest.id,
                  label: interest.name
                }))}
                value={formik.values.interests
                  .map(interestid => availableInterests.find(interest => interest.id === interestid))
                  .map(interest => (interest ? { value: interest.id, label: interest.name } : null))}
                onChange={selectedOptions => {
                  formik.setFieldValue(
                    'interests',
                    selectedOptions.map(option => option.value)
                  )
                }}
                onBlur={() => formik.setFieldTouched('interests', true)}
                menuPlacement='auto'
              />
              {formik.errors.interests && formik.touched.interests ? (
                <ErrorIcon message={formik.errors.interests} className='me-5' />
              ) : (
                !formik.errors.interests && formik.touched.interests && <SuccessIcon className='me-6' />
              )}
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className='secondary-btn'
            onClick={() => {
              handleClose()
              formik.resetForm()
            }}
          >
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
  currentGender: PropTypes.string,
  currentLocation: PropTypes.string
}

export default EditProfileModal
