import { Alert, Card, Dropdown } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import ExtraInfoWithIcons from '../home/ExtraInfoWithIcons'
import TruncateText from '../../utils/TruncateText'
import { MoreVertical, Trash2 } from 'lucide-react'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { deletePost, editPost } from '../../utils/api'
import DeletePostModal from './DeletePostModal'
import EditPostModal from './EditPostModal'

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
  const [deleteShow, setDeleteShow] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  async function handleDelete(postId) {
    const response = await deletePost(postId)
    if (response.error) {
      setErrorMsg(response.error.message)
      console.error(response.error)
    } else {
      handlePostDelete(postId)
      setDeleteShow(false)
    }
  }

  const [editShow, setEditShow] = useState(false)
  async function handleEdit(payload) {
    const response = await editPost(payload, postId)
    if (response.error) {
      setErrorMsg(response.error.message)
      console.error(response.error)
    } else {
      navigate(`/post-details?id=${postId}`)
      setEditShow(false)
    }
  }

  return (
    <>
      <Card className='custom-card mb-5'>
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
                <Dropdown.Item
                  onClick={() => {
                    setEditShow(true)
                  }}
                >
                  <Pencil size={'16px'} />
                  <span>Edit post</span>
                </Dropdown.Item>
                <Dropdown.Item
                  className='trash-hover'
                  onClick={() => {
                    setDeleteShow(true)
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

      <DeletePostModal
        show={deleteShow}
        onHide={() => setDeleteShow(false)}
        title={title}
        content={content}
        category={category}
        availability={availability}
        skillLevel={skillLevel}
        publicationDate={publicationDate}
        postPhoto={postPhoto}
        postId={postId}
        handleDelete={handleDelete}
      />

      <EditPostModal
        show={editShow}
        onHide={() => setEditShow(false)}
        title={title}
        content={content}
        currentCategory={category}
        availability={availability}
        skillLevel={skillLevel}
        publicationDate={publicationDate}
        postId={postId}
        handleEdit={handleEdit}
      />

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
