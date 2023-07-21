import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import PropTypes from 'prop-types'
import { Alert, Col, Form, Row } from 'react-bootstrap'
import { useEffect, useRef, useState } from 'react'
import { convertSnakeCaseToCapitalized } from '../../utils/stringUtils'
import { getAllInterests, isValidImageUrl, publishPost } from '../../utils/api'
import { useNavigate } from 'react-router-dom'

function PublishSkillModal(props) {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  const skillLevels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT', 'ALL_LEVELS', 'NOT_APPLICABLE']
  const availabilities = [
    'FULL_TIME',
    'PART_TIME',
    'WEEKDAYS',
    'WEEKENDS',
    'EVENINGS',
    'MORNINGS',
    'FLEXIBLE',
    'BY_APPOINTMENT',
    'REMOTE',
    'NOT_AVAILABLE'
  ]

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    skillLevel: '',
    postStatus: 'ACTIVE',
    availability: '',
    imageUrl: '',
    categoryId: ''
  })

  const [formErrors, setFormErrors] = useState({})

  const formRef = useRef(null)
  const handleButtonClick = () => {
    handleSubmit(new Event('submit'))
  }

  const [errorMsg, setErrorMsg] = useState('')

  async function handlePublishPost(payload) {
    const response = await publishPost(payload)
    if (response.error) {
      setErrorMsg(response.error)
      console.error(response.error)
    } else {
      props.onHide()
      navigate(`/post-details?id=${response.data.id}`)
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    validateForm()
    let errors = validateForm()
    if (formData.imageUrl && !(await isValidImageUrl(formData.imageUrl))) {
      errors = { ...errors, imageUrl: 'Please enter a valid image URL.' }
    }
    setFormErrors(errors)
    if (Object.keys(errors).length === 0) {
      try {
        handlePublishPost(formData)
      } catch (error) {
        setErrorMsg(error.message)
      }
    }
  }

  const handleChange = event => {
    const { id, value } = event.target
    setFormData(prevFormData => ({ ...prevFormData, [id]: value }))
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.title || formData.title.length === 0) {
      errors.title = 'Please enter a title.'
    }
    if (formData.title.length > 100) {
      errors.title = 'Title cannot be longer than 100 characters.'
    }
    if (!formData.content || formData.content.length === 0) {
      errors.content = 'Please enter some content.'
    }
    if (formData.content.length > 700) {
      errors.content = 'Content cannot be longer than 700 characters.'
    }
    if (!formData.skillLevel || !skillLevels.includes(formData.skillLevel)) {
      errors.skillLevel = 'Please select a valid skill level.'
    }
    if (!formData.availability || !availabilities.includes(formData.availability)) {
      errors.availability = 'Please select a valid availability.'
    }
    // if (formData.imageUrl && !(await isValidImageUrl(formData.imageUrl))) {
    //   errors.imageUrl = 'Please enter a valid image URL.'
    // }
    if (formData.imageUrl.length > 700) {
      errors.imageUrl = 'ImageUrl cannot be longer than 300 characters.'
    }
    if (
      !formData.categoryId ||
      !categories.some(e => {
        return Number(e.id) === Number(formData.categoryId)
      })
    ) {
      errors.categoryId = 'Please enter a valid category.'
    }
    setFormErrors(errors)
    return errors
  }

  // CATEGORIES HANDLING
  async function handleGetAllInterests() {
    const { data, error } = await getAllInterests()
    if (error) {
      console.error(error)
    } else {
      setCategories(data)
    }
  }

  useEffect(() => {
    handleGetAllInterests()
  }, [])

  return (
    <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Post your abilities and start exchanging</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMsg && (
          <Alert variant='danger' onClose={() => setErrorMsg(false)} dismissible>
            <Alert.Heading>Error on publication</Alert.Heading>
            {errorMsg}
          </Alert>
        )}
        <Form noValidate onSubmit={handleSubmit} ref={formRef} className='p-4'>
          <Row>
            <Col>
              <Form.Group controlId='title' className='mb-3'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type='text'
                  value={formData.title}
                  onChange={handleChange}
                  isInvalid={!!formErrors.title}
                  placeholder='Skill title here'
                />
                <Form.Control.Feedback type='invalid'>{formErrors.title}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId='content' className='mb-3'>
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  value={formData.content}
                  onChange={handleChange}
                  isInvalid={!!formErrors.content}
                  placeholder='Tell us about the skill you want to share!'
                />
                <Form.Control.Feedback type='invalid'>{formErrors.content}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId='availability'>
                <Form.Label>Availability</Form.Label>
                <Form.Select
                  value={formData.availability}
                  onChange={handleChange}
                  isInvalid={!!formErrors.availability}
                >
                  <option value=''>Select an availability</option>
                  {availabilities.map(availability => (
                    <option key={availability} value={availability}>
                      {convertSnakeCaseToCapitalized(availability)}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{formErrors.availability}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='skillLevel'>
                <Form.Label>Skill Level</Form.Label>
                <Form.Select value={formData.skillLevel} onChange={handleChange} isInvalid={!!formErrors.skillLevel}>
                  <option value=''>Select a skill level</option>
                  {skillLevels.map(level => (
                    <option key={level} value={level}>
                      {convertSnakeCaseToCapitalized(level)}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{formErrors.skillLevel}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId='imageUrl' className='mt-3'>
                <Form.Label>
                  Image URL <span className='text-secondary fst-italic'>(optional)</span>
                </Form.Label>
                <Form.Control
                  type='text'
                  value={formData.imageUrl}
                  onChange={handleChange}
                  isInvalid={!!formErrors.imageUrl}
                  placeholder='Paste image URL here'
                />
                <Form.Control.Feedback type='invalid'>{formErrors.imageUrl}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='categoryId' className='mt-3'>
                <Form.Label>Category</Form.Label>
                <Form.Select value={formData.categoryId} onChange={handleChange} isInvalid={!!formErrors.categoryId}>
                  <option value=''>Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{formErrors.categoryId}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between mx-4'>
        <Button className='negative-btn' onClick={props.onHide}>
          Cancel
        </Button>
        <Button className='main-btn' onClick={handleButtonClick}>
          Publish
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

PublishSkillModal.propTypes = {
  onHide: PropTypes.func.isRequired
}

export default PublishSkillModal
