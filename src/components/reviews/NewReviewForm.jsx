import StarsRating from './StarsRating'
import { Button, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { publishReview } from '../../utils/api'
import { useSearchParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { useState } from 'react'
import ErrorAlert from '../common/ErrorAlert'
import ErrorIcon from '../common/ErrorIcon'
import SuccesIcon from '../common/SuccessIcon'

function NewReviewForm({ onClose }) {
  const [errorMsg, setErrorMsg] = useState('')
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
      title: '',
      content: '',
      rating: 0
    },
    validate,
    onSubmit: async values => {
      handleSubmit(values)
    }
  })

  const [searchParams] = useSearchParams()
  const profileId = searchParams.get('id')

  async function handleSubmit(values) {
    const payload = {
      title: values.title,
      content: values.content,
      rating: values.rating,
      profileReviewed: profileId
    }

    // eslint-disable-next-line no-unused-vars
    const { data, error } = await publishReview(payload)
    if (error) {
      console.error(error.message)
      setErrorMsg(error.message)
    }
    formik.resetForm()
    onClose()
  }

  return (
    <>
      {<ErrorAlert>{errorMsg}</ErrorAlert>}
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label className='me-3 mb-0'>Rating</Form.Label>
          <StarsRating
            id='rating'
            name='rating'
            rating={formik.values.rating}
            onChange={value => formik.setFieldValue('rating', value)}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rating && formik.touched.rating && (
            <div className='small mt-2' style={{ color: 'var(--tertiary-color)' }}>
              {formik.errors.rating}
            </div>
          )}
        </Form.Group>
        <Form.Group controlId='title' className='mb-3'>
          <Form.Label>Title</Form.Label>
          <div className='position-relative'>
            <Form.Control
              type='text'
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.errors.title && formik.touched.title ? 'invalid-form mb-3' : null}
            />
            {formik.errors.title && formik.touched.title ? (
              <ErrorIcon message={formik.errors.title} />
            ) : (
              !formik.errors.title && formik.touched.title && <SuccesIcon />
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
              rows={3}
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.errors.content && formik.touched.content ? 'invalid-form mb-3' : null}
            />
            {formik.errors.content && formik.touched.content ? (
              <ErrorIcon message={formik.errors.content} />
            ) : (
              !formik.errors.content && formik.touched.content && <SuccesIcon />
            )}
          </div>
        </Form.Group>
        <Button className='main-btn text-dark me-3' type='submit'>
          Publish
        </Button>
        <Button className='negative-btn' type='button' onClick={onClose}>
          Cancel
        </Button>
      </Form>
    </>
  )
}
NewReviewForm.propTypes = {
  onClose: PropTypes.func.isRequired
}
export default NewReviewForm
