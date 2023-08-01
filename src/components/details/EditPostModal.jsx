import { CalendarClock, Pen, Signal, Tag } from 'lucide-react'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Modal, Button, Card, Form } from 'react-bootstrap'
import Select from 'react-select'
import { getAllInterests, isValidImageUrl } from '../../utils/api'
import { useFormik } from 'formik'
import ErrorIcon from '../common/ErrorIcon'
import SuccessIcon from '../common/SuccessIcon'

function EditPostModal({
  show,
  onHide,
  title,
  content,
  currentCategory,
  availability,
  skillLevel,
  publicationDate,
  postPhoto,
  handleEdit
}) {
  const skillLevels = [
    { label: 'Beginner', value: 'BEGINNER' },
    { label: 'Intermediate', value: 'INTERMEDIATE' },
    { label: 'Advanced', value: 'ADVANCED' },
    { label: 'Expert', value: 'EXPERT' },
    { label: 'All Levels', value: 'ALL_LEVELS' },
    { label: 'Not Applicable', value: 'NOT_APPLICABLE' }
  ]

  const availabilityOptions = [
    { label: 'Full Time', value: 'FULL_TIME' },
    { label: 'Part Time', value: 'PART_TIME' },
    { label: 'Weekdays', value: 'WEEKDAYS' },
    { label: 'Weekends', value: 'WEEKENDS' },
    { label: 'Evenings', value: 'EVENINGS' },
    { label: 'Mornings', value: 'MORNINGS' },
    { label: 'Flexible', value: 'FLEXIBLE' },
    { label: 'By Appointment', value: 'BY_APPOINTMENT' },
    { label: 'Remote', value: 'REMOTE' },
    { label: 'Not Available', value: 'NOT_AVAILABLE' }
  ]

  async function getAllCategories() {
    const response = await getAllInterests()
    if (response.error) {
      console.error(response.error.message)
    } else {
      const categories = response.data.map(category => ({ label: category.name, value: category.id }))
      setAvailableCategories(categories)
    }
  }

  const [availableCategories, setAvailableCategories] = useState([])

  const getMatchingCategory = () => {
    const matchingCategory = availableCategories.find(category => category.label === currentCategory)
    if (matchingCategory) {
      formik.setFieldValue('categoryId', { label: matchingCategory.label, value: matchingCategory.value })
    } else {
      formik.setFieldValue('categoryId', {})
    }
  }

  const formik = useFormik({
    initialValues: {
      title: title,
      content: content,
      skillLevel: {
        label: skillLevel,
        value: skillLevel.replace(/ /g, '_').toUpperCase()
      },
      postStatus: 'ACTIVE',
      availability: {
        label: availability,
        value: availability.replace(/ /g, '_').toUpperCase()
      },
      imageUrl: postPhoto,
      categoryId: currentCategory
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
      if (values.imageUrl.length > 700) {
        errors.imageUrl = 'ImageUrl cannot be longer than 300 characters.'
      }
      return errors
    },
    onSubmit: async values => {
      if (values.imageUrl && !(await isValidImageUrl(values.imageUrl))) {
        formik.setErrors({ ...formik.errors, imageUrl: 'Please enter a valid image URL.' })
      } else {
        const payload = {
          title: values.title,
          content: values.content,
          skillLevel: values.skillLevel.value,
          availability: values.availability.value,
          imageUrl: values.imageUrl,
          categoryId: values.categoryId.value,
          postStatus: 'ACTIVE'
        }
        handleEdit(payload)
        onHide()
      }
    }
  })

  useEffect(() => {
    getMatchingCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableCategories])

  useEffect(() => {
    getAllCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Pen color='var(--primary-color-dark)' />
          <span className='ms-3'>Edit Post</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card className='custom-card my-2'>
          {postPhoto && <Card.Img variant='top' className='rounded-0' src={postPhoto} />}
          <Card.Body>
            <Form onSubmit={formik.handleSubmit}>
              <Card.Title className='text-black d-flex justify-content-between'>
                <span className='position-relative'>
                  <Form.Control
                    type='text'
                    id='title'
                    name='title'
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.touched.title && formik.errors.title ? 'invalid-form' : ''}
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <ErrorIcon message={formik.errors.title} />
                  ) : (
                    !formik.errors.title && formik.touched.title && <SuccessIcon />
                  )}
                </span>
              </Card.Title>

              <div className='text-body mb-3 position-relative'>
                <Form.Control
                  as='textarea'
                  id='content'
                  name='content'
                  value={formik.values.content}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={formik.touched.content && formik.errors.content ? 'invalid-form' : ''}
                />
                {formik.touched.content && formik.errors.content ? (
                  <ErrorIcon message={formik.errors.content} />
                ) : (
                  !formik.errors.content && formik.touched.content && <SuccessIcon />
                )}
              </div>

              <div className='d-flex justify-content-center align-items-center gap-3'>
                <div>
                  <div className='d-flex flex-column align-items-center small text-secondary'>
                    <Signal size={'18px'} />
                  </div>
                  <div className='d-flex gap-2 align-items-center mt-2'>
                    <Select
                      options={skillLevels}
                      id='skillLevel'
                      className='skillLevel'
                      classNamePrefix='edit-post'
                      placeholder='Skill Level'
                      menuPlacement='auto'
                      value={formik.values.skillLevel}
                      onChange={selectedOption => formik.setFieldValue('skillLevel', selectedOption)}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>

                <div className='d-flex flex-column align-items-center small text-secondary'>
                  <CalendarClock size={'18px'} />
                  <div className='d-flex gap-2 align-items-center mt-2'>
                    <Select
                      options={availabilityOptions}
                      id='availability'
                      name='availability'
                      className='Availability'
                      classNamePrefix='edit-post'
                      placeholder='Availability'
                      menuPlacement='auto'
                      onChange={selectedOption => formik.setFieldValue('availability', selectedOption)}
                      onBlur={formik.handleBlur}
                      value={formik.values.availability}
                    />
                  </div>
                </div>

                <div className='d-flex flex-column align-items-center small text-secondary'>
                  <Tag size={'18px'} />
                  <div className='d-flex gap-2 align-items-center mt-2'>
                    <Select
                      id='categoryId'
                      name='categoryId'
                      className='Category'
                      classNamePrefix='edit-post'
                      placeholder='Category'
                      menuPlacement='auto'
                      options={availableCategories}
                      onChange={selectedOption => formik.setFieldValue('categoryId', selectedOption)}
                      onBlur={formik.handleBlur}
                      value={formik.values.categoryId}
                    />
                  </div>
                </div>
              </div>
              <div className='position-relative'>
                <Form.Control
                  type='text'
                  id='imageUrl'
                  name='imageUrl'
                  placeholder='Image URL'
                  value={formik.values.imageUrl}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={formik.touched.imageUrl && formik.errors.imageUrl ? 'invalid-form mt-4' : 'mt-4'}
                />
                {formik.touched.imageUrl && formik.errors.imageUrl ? (
                  <ErrorIcon message={formik.errors.imageUrl} />
                ) : (
                  !formik.errors.imageUrl && formik.touched.imageUrl && <SuccessIcon />
                )}
              </div>
            </Form>
          </Card.Body>

          <Card.Footer>
            <div className='small text-secondary ms-2'>Published on: {publicationDate}</div>
          </Card.Footer>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <div
          className='secondary-btn'
          onClick={() => {
            formik.resetForm()
            onHide()
          }}
          style={{ padding: '6px' }}
        >
          Cancel
        </div>
        <Button className='main-btn' onClick={formik.submitForm}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

EditPostModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  currentCategory: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  skillLevel: PropTypes.string.isRequired,
  publicationDate: PropTypes.string.isRequired,
  postPhoto: PropTypes.string,
  postId: PropTypes.string,
  handleEdit: PropTypes.func.isRequired
}

export default EditPostModal
