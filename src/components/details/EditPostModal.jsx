import { CalendarClock, Pen, Signal, Tag } from 'lucide-react'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Modal, Button, Card, Form } from 'react-bootstrap'
import Select from 'react-select'
import { getAllInterests, isValidImageUrl } from '../../utils/api'

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

  useEffect(() => {
    getAllCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [editedTitle, setEditedTitle] = useState(title)
  const [editedContent, setEditedContent] = useState(content)
  const [availableCategories, setAvailableCategories] = useState([])
  const [editedAvailability, setEditedAvailability] = useState({
    label: availability,
    value: availability.replace(/ /g, '_').toUpperCase()
  })
  const [editedSkillLevel, setEditedSkillLevel] = useState({
    label: skillLevel,
    value: skillLevel.replace(/ /g, '_').toUpperCase()
  })

  const [editedCategory, setEditedCategory] = useState({})
  const [editedPostPhoto, setEditedPostPhoto] = useState('')

  const getMatchingCategory = () => {
    const matchingCategory = availableCategories.find(category => category.label === currentCategory)
    if (matchingCategory) {
      setEditedCategory({ label: matchingCategory.label, value: matchingCategory.value })
    } else {
      setEditedCategory({})
    }
  }
  const [validated, setValidated] = useState(false)
  const [isTitleValid, setIsTitleValid] = useState(true)
  const [isContentValid, setIsContentValid] = useState(true)
  const [isImageUrlValid, setIsImageUrlValid] = useState(true)

  const handleSubmit = async event => {
    event.preventDefault()
    const isTitleValid = editedTitle && editedTitle.length <= 100
    const isContentValid = editedContent && editedContent.length <= 700
    const isImageUrlValid = await handleImageValidation()
    setIsTitleValid(isTitleValid)
    setIsContentValid(isContentValid)
    setIsImageUrlValid(isImageUrlValid)
    if (isTitleValid && isContentValid && isImageUrlValid) {
      setValidated(true)
      const payload = {
        title: editedTitle,
        content: editedContent,
        skillLevel: editedSkillLevel.value,
        availability: editedAvailability.value,
        imageUrl: editedPostPhoto,
        categoryId: editedCategory.value,
        postStatus: 'ACTIVE'
      }
      handleEdit(payload)
      onHide()
    } else {
      setValidated(false)
    }
  }

  async function handleImageValidation() {
    if (editedPostPhoto) {
      return await isValidImageUrl(editedPostPhoto)
    } else {
      return true
    }
  }

  useEffect(() => {
    getMatchingCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableCategories])

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
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Card.Title className='text-black d-flex justify-content-between'>
                <Form.Control
                  type='text'
                  value={editedTitle}
                  onChange={e => setEditedTitle(e.target.value)}
                  isInvalid={!isTitleValid}
                />
                <Form.Control.Feedback type='invalid'>
                  Please enter a title with at most 100 characters
                </Form.Control.Feedback>
              </Card.Title>

              <div className='text-body mb-3'>
                <Form.Control
                  as='textarea'
                  value={editedContent}
                  onChange={e => setEditedContent(e.target.value)}
                  rows='6'
                  className='w-100'
                  isInvalid={!isContentValid}
                />
                <Form.Control.Feedback type='invalid'>
                  Please enter content with at most 700 characters
                </Form.Control.Feedback>
              </div>

              <div className='d-flex justify-content-center align-items-center gap-3'>
                <div>
                  <div className='d-flex flex-column align-items-center small text-secondary'>
                    <Signal size={'18px'} />
                  </div>
                  <div className='d-flex gap-2 align-items-center mt-2'>
                    <Select
                      defaultValue={[editedSkillLevel]}
                      options={skillLevels}
                      className='skillLevel'
                      classNamePrefix='edit-post'
                      placeholder='Skill Level'
                      menuPlacement='auto'
                      onChange={selectedOption => setEditedSkillLevel(selectedOption)}
                    />
                  </div>
                </div>

                <div className='d-flex flex-column align-items-center small text-secondary'>
                  <CalendarClock size={'18px'} />
                  <div className='d-flex gap-2 align-items-center mt-2'>
                    <Select
                      defaultValue={[editedAvailability]}
                      options={availabilityOptions}
                      className='Availability'
                      classNamePrefix='edit-post'
                      placeholder='Availability'
                      menuPlacement='auto'
                      onChange={selectedOption => setEditedAvailability(selectedOption)}
                    />
                  </div>
                </div>

                <div className='d-flex flex-column align-items-center small text-secondary'>
                  <Tag size={'18px'} />
                  <div className='d-flex gap-2 align-items-center mt-2'>
                    <Select
                      value={editedCategory}
                      className='Category'
                      classNamePrefix='edit-post'
                      placeholder='Category'
                      menuPlacement='auto'
                      options={availableCategories}
                      onChange={selectedOption => setEditedCategory(selectedOption)}
                    />
                  </div>
                </div>
              </div>
              <Form.Control
                type='text'
                placeholder='Image URL'
                className='mt-4'
                value={editedPostPhoto}
                onChange={e => setEditedPostPhoto(e.target.value)}
                isInvalid={!isImageUrlValid}
              />
              <Form.Control.Feedback type='invalid'>Please enter a valid image URL</Form.Control.Feedback>
            </Form>
          </Card.Body>

          <Card.Footer>
            <div className='small text-secondary ms-2'>Published on: {publicationDate}</div>
          </Card.Footer>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <div className='secondary-btn' onClick={onHide} style={{ padding: '6px' }}>
          Cancel
        </div>
        <Button className='main-btn' onClick={handleSubmit}>
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
