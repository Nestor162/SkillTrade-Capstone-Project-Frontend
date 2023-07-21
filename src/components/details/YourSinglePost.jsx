import { Alert, Button, Card, Dropdown, Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ExtraInfoWithIcons from '../home/ExtraInfoWithIcons'
import TruncateText from '../../utils/TruncateText'
import { AlertTriangle, MoreVertical, Trash2 } from 'lucide-react'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { deletePost } from '../../utils/api'

function YourSinglePost({
  title,
  content,
  availability,
  skillLevel,
  category,
  publicationDate,
  postPhoto,
  postId,
  handlePostDelete
}) {
  const [show, setShow] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleDelete(postId) {
    const response = await deletePost(postId)
    if (response.error) {
      setErrorMsg(response.error.message)
      console.error(response.error)
    } else {
      console.log('deleted!')
      handlePostDelete(postId)
      setShow(false)
    }
  }

  return (
    <>
      <Card className='custom-card mt-3'>
        {postPhoto && <Card.Img variant='top' className='rounded-0' src={postPhoto} />}
        <Card.Body>
          <Card.Title className='text-black d-flex justify-content-between'>
            <Link to={`/post-details?id=${postId}`} className='text-decoration-none text-dark'>
              <span className='hover-underline'>{title}</span>
            </Link>
            <Dropdown className='position-relative'>
              <Dropdown.Toggle as='div' id='dropdown-basic'>
                <MoreVertical size={'22px'} className='cursor-pointer' />
              </Dropdown.Toggle>
              <Dropdown.Menu className='card-options-dropdown'>
                <Dropdown.Item>
                  <Pencil size={'16px'} />
                  <span>Edit post</span>
                </Dropdown.Item>
                <Dropdown.Item
                  className='trash-hover'
                  onClick={() => {
                    setShow(true)
                  }}
                >
                  <Trash2 size={'16px'} />
                  <span>Delete post</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Title>
          <Link to={`/post-details?id=${postId}`} className='text-decoration-none'>
            <div className='text-body mb-3'>
              <TruncateText text={content} maxLines={3} className='text-body' />
            </div>
            <div className='d-flex gap-3 small text-secondary'>
              <ExtraInfoWithIcons category={category} availability={availability} skillLevel={skillLevel} />
            </div>
          </Link>
        </Card.Body>
        <Link to={`/post-details?id=${postId}`} className='text-decoration-none'>
          <Card.Footer>
            <div className='small text-secondary ms-2'>Published on: {publicationDate}</div>
          </Card.Footer>
        </Link>
      </Card>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <AlertTriangle color='var(--tertiary-color)' />
            <span className='ms-3'>Delete Post</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this post?
          <Card className='custom-card mt-3'>
            {postPhoto && <Card.Img variant='top' className='rounded-0' src={postPhoto} />}
            <Card.Body>
              <Card.Title className='text-black d-flex justify-content-between'>
                <span>{title}</span>
              </Card.Title>

              <div className='text-body mb-3'>
                <TruncateText text={content} maxLines={3} className='text-body' />
              </div>
              <div className='d-flex gap-3 small text-secondary'>
                <ExtraInfoWithIcons category={category} availability={availability} skillLevel={skillLevel} />
              </div>
            </Card.Body>

            <Card.Footer>
              <div className='small text-secondary ms-2'>Published on: {publicationDate}</div>
            </Card.Footer>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <div className='secondary-btn' onClick={() => setShow(false)} style={{ padding: '6px' }}>
            Cancel
          </div>
          <Button className='negative-btn' onClick={() => handleDelete(postId)}>
            DELETE!
          </Button>
        </Modal.Footer>
      </Modal>
      {errorMsg && (
        <Alert
          className='position-fixed top-0 start-0 w-100'
          style={{ zIndex: 9999 }}
          variant='danger'
          onClose={() => setErrorMsg(null)}
          dismissible
        >
          <Alert.Heading>Error!</Alert.Heading>
          {errorMsg}
        </Alert>
      )}
    </>
  )
}
YourSinglePost.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  skillLevel: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  postPhoto: PropTypes.string,
  publicationDate: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  handlePostDelete: PropTypes.func.isRequired
}
export default YourSinglePost
