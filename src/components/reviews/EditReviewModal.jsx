import { Modal, Button, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import PropTypes from 'prop-types'
import StarsRating from './StarsRating'
import ErrorIcon from '../common/ErrorIcon'
import SuccessIcon from '../common/SuccessIcon'

function EditReviewModal({ show, onClose, initialValues, handleSubmit }) {
  const validate = values => {
    const errors = {}

    if (!values.title) {
      errors.title = (
        <>
          Title is <strong>reqiuired</strong>
        </>
      )
    } else if (values.title.length < 10 || values.title.length > 150) {
      errors.title = (
        <>
          Title must be <strong> 5 - 150 </strong> characters length
        </>
      )
    }

    if (!values.content) {
      errors.content = (
        <>
          Content is <strong>reqiuired</strong>
        </>
      )
    } else if (values.content.length < 50 || values.content.length > 700) {
      errors.content = (
        <>
          Content must be <strong>50 - 150</strong> characters length
        </>
      )
    }

    if (!values.rating) {
      errors.rating = (
        <>
          Rating is <strong>reqiuired</strong>
        </>
      )
    } else if (values.rating < 1 || values.rating > 5) {
      errors.rating = (
        <>
          Rating must be <strong>1 - 5</strong>
        </>
      )
    }
    return errors
  }

  const formik = useFormik({
    initialValues: {
      title: initialValues.title,
      content: initialValues.content,
      rating: initialValues.rating
    },
    validate,
    onSubmit: values => {
      const reviewPayload = {
        title: values.title,
        content: values.content,
        rating: values.rating,
        profileReviewed: initialValues.profileReviewed
      }
      handleSubmit(reviewPayload)
    }
  })

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label className='me-4'>Rating</Form.Label>
            <StarsRating
              id='rating'
              name='rating'
              rating={formik.values.rating}
              onChange={value => formik.setFieldValue('rating', value)}
              onBlur={formik.handleBlur}
            />
            {formik.touched.rating && formik.errors.rating && (
              <div className='small mt-2' style={{ color: 'var(--tertiary-color)' }}>
                {formik.errors.rating}
              </div>
            )}
          </Form.Group>

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
                className={formik.touched.title && formik.errors.title ? 'invalid-form' : ''}
              />
              {formik.touched.title && formik.errors.title ? (
                <ErrorIcon message={formik.errors.title} />
              ) : (
                !formik.errors.title && formik.touched.title && <SuccessIcon />
              )}
            </div>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Content</Form.Label>
            <div className='position-relative'>
              <Form.Control
                as='textarea'
                id='content'
                name='content'
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.content && formik.errors.content ? 'invalid-form' : ''}
                rows={5}
              />
              {formik.touched.content && formik.errors.content ? (
                <ErrorIcon message={formik.errors.content} />
              ) : (
                !formik.errors.content && formik.touched.content && <SuccessIcon />
              )}
            </div>
          </Form.Group>

          <Modal.Footer>
            <Button
              className='secondary-btn'
              variant='secondary'
              onClick={() => {
                onClose()
                formik.resetForm()
              }}
            >
              Cancel
            </Button>
            <Button className='main-btn' type='submit'>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

EditReviewModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default EditReviewModal
