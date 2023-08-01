import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import PropTypes from 'prop-types'
import { Alert, Col, Form, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { convertSnakeCaseToCapitalized } from '../../utils/stringUtils'
import { getAllInterests, isValidImageUrl, publishPost } from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import ErrorIcon from '../common/ErrorIcon'
import SuccessIcon from '../common/SuccessIcon'

function PublishSkillModal(props) {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      skillLevel: '',
      postStatus: 'ACTIVE',
      availability: '',
      imageUrl: '',
      categoryId: ''
    },
    validate: values => {
      const errors = {}
      if (!values.title || values.title.length === 0) {
        errors.title = 'Please enter a title.'
      }
      if (values.title.length > 100 || values.title.length < 15) {
        errors.title = 'Title cannot be longer than 100 characters or shorter than 15 characters.'
      }
      if (!values.content || values.content.length === 0) {
        errors.content = 'Please enter some content.'
      }
      if (values.content.length > 700 || values.content.length < 30) {
        errors.content = 'Content cannot be longer than 700 characters or shorter than 30 characters.'
      }
      if (!values.skillLevel || !skillLevels.includes(values.skillLevel)) {
        errors.skillLevel = 'Please select a valid skill level.'
      }
      if (!values.availability || !availabilities.includes(values.availability)) {
        errors.availability = 'Please select a valid availability.'
      }
      // if (values.imageUrl && !(await isValidImageUrl(values.imageUrl))) {
      //   errors.imageUrl = 'Please enter a valid image URL.'
      // }
      if (values.imageUrl.length > 700) {
        errors.imageUrl = 'ImageUrl cannot be longer than 300 characters.'
      }
      if (
        !values.categoryId ||
        !categories.some(e => {
          return Number(e.id) === Number(values.categoryId)
        })
      ) {
        errors.categoryId = 'Please enter a valid category.'
      }
      return errors
    },
    onSubmit: async values => {
      if (values.imageUrl && !(await isValidImageUrl(values.imageUrl))) {
        formik.setErrors({ ...formik.errors, imageUrl: 'Please enter a valid image URL.' })
      } else {
        handlePublishPost(values)
      }
    }
  })

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
        <Form id='publish-skill-form' onSubmit={formik.handleSubmit} className='p-4'>
          <Row>
            <Col>
              <Form.Group className='mb-3'>
                <Form.Label>Title</Form.Label>
                <div className='position-relative'>
                  <Form.Control
                    type='text'
                    id='title'
                    name='title'
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.touched.title && formik.errors.title ? 'invalid-form' : null}
                    placeholder='Skill title here'
                  />
                  {formik.errors.title && formik.touched.title ? (
                    <ErrorIcon message={formik.errors.title} />
                  ) : (
                    !formik.errors.title && formik.touched.title && <SuccessIcon />
                  )}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className='mb-3'>
                <Form.Label>Content</Form.Label>
                <div className='position-relative'>
                  <Form.Control
                    as='textarea'
                    rows={3}
                    id='content'
                    name='content'
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.touched.content && formik.errors.content ? 'invalid-form' : null}
                    placeholder='Tell us about the skill you want to share!'
                  />
                  {formik.errors.content && formik.touched.content ? (
                    <ErrorIcon message={formik.errors.content} />
                  ) : (
                    !formik.errors.content && formik.touched.content && <SuccessIcon />
                  )}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Availability</Form.Label>
                <div className='position-relative'>
                  <Form.Select
                    id='availability'
                    name='availability'
                    value={formik.availability}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.touched.availability && formik.errors.availability ? 'invalid-form' : null}
                  >
                    <option value=''>Select an availability</option>
                    {availabilities.map(availability => (
                      <option key={availability} value={availability}>
                        {convertSnakeCaseToCapitalized(availability)}
                      </option>
                    ))}
                  </Form.Select>
                  {formik.errors.availability && formik.touched.availability ? (
                    <ErrorIcon className='me-1 me-lg-5' message={formik.errors.availability} />
                  ) : (
                    !formik.errors.availability && formik.touched.availability && <SuccessIcon />
                  )}
                </div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Skill Level</Form.Label>
                <div className='position-relative'>
                  <Form.Select
                    id='skillLevel'
                    name='skillLevel'
                    value={formik.values.skillLevel}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.touched.skillLevel && formik.errors.skillLevel ? 'invalid-form' : null}
                  >
                    <option value=''>Select a skill level</option>
                    {skillLevels.map(level => (
                      <option key={level} value={level}>
                        {convertSnakeCaseToCapitalized(level)}
                      </option>
                    ))}
                  </Form.Select>
                  {formik.errors.skillLevel && formik.touched.skillLevel ? (
                    <ErrorIcon message={formik.errors.skillLevel} className='me-1 me-lg-5' />
                  ) : (
                    !formik.errors.skillLevel && formik.touched.skillLevel && <SuccessIcon className='me-1 me-lg-5' />
                  )}
                </div>
                <Form.Control.Feedback type='invalid'>{formik.errors.skillLevel}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className='mt-3'>
                <Form.Label>
                  Image URL <span className='text-secondary fst-italic'>(optional)</span>
                </Form.Label>
                <div className='position-relative'>
                  <Form.Control
                    type='text'
                    id='imageUrl'
                    name='imageUrl'
                    value={formik.values.imageUrl}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.touched.imageUrl && formik.errors.imageUrl ? 'invalid-form' : null}
                    placeholder='Paste image URL here'
                  />
                  {formik.errors.imageUrl && formik.touched.imageUrl ? (
                    <ErrorIcon message={formik.errors.imageUrl} className='me-1 me-lg-5' />
                  ) : (
                    !formik.errors.imageUrl && formik.touched.imageUrl && <SuccessIcon className='me-1 me-lg-5' />
                  )}
                </div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mt-3'>
                <Form.Label>Category</Form.Label>
                <div className='position-relative'>
                  <Form.Select
                    id='categoryId'
                    name='categoryId'
                    value={formik.values.categoryId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.touched.categoryId && formik.errors.categoryId ? 'invalid-form' : null}
                  >
                    <option value=''>Select a category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                  {formik.errors.categoryId && formik.touched.categoryId ? (
                    <ErrorIcon className='me-1 me-lg-5' message={formik.errors.categoryId} />
                  ) : (
                    !formik.errors.categoryId && formik.touched.categoryId && <SuccessIcon className='me-1 me-lg-5' />
                  )}
                </div>
                <Form.Control.Feedback type='invalid'>{formik.errors.categoryId}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between mx-4'>
        <Button className='negative-btn' onClick={props.onHide}>
          Cancel
        </Button>
        <Button className='main-btn' type='submit' form='publish-skill-form'>
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
