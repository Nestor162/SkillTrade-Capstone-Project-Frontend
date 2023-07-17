import { useState } from 'react'
import StarsRating from './StarsRating'
import { Button, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { publishReview } from '../../utils/api'
import { useSearchParams } from 'react-router-dom'

function NewReviewForm({ onClose, onFormSubmit }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(0)

  const [searchParams] = useSearchParams()
  const profileId = searchParams.get('id')

  function handleTitleChange(event) {
    setTitle(event.target.value)
  }

  function handleContentChange(event) {
    setContent(event.target.value)
  }

  function handleRatingChange(newRating) {
    setRating(newRating)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const payload = {
      title: title,
      content: content,
      rating: rating,
      profileReviewed: profileId
    }

    // eslint-disable-next-line no-unused-vars
    const { data, error } = await publishReview(payload)
    if (error) {
      console.error(error)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='title' className='mb-3'>
        <Form.Label className='me-3 mb-0'>Rating</Form.Label>
        <StarsRating rating={rating} onRatingChange={handleRatingChange} />
      </Form.Group>
      <Form.Group controlId='title' className='mb-3'>
        <Form.Label>Title</Form.Label>
        <Form.Control type='text' value={title} onChange={handleTitleChange} />
      </Form.Group>
      <Form.Group controlId='content' className='mb-3'>
        <Form.Label>Content</Form.Label>
        <Form.Control as='textarea' value={content} onChange={handleContentChange} />
      </Form.Group>
      <Button className='main-btn text-dark me-3' type='submit' onClick={onFormSubmit}>
        Publish
      </Button>
      <Button className='negative-btn' type='button' onClick={onClose}>
        Cancel
      </Button>
    </Form>
  )
}

NewReviewForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired
}
export default NewReviewForm
