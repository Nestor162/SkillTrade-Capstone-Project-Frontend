import { Card, Image } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import ProfilePicturePlaceholder from '../../assets/img/profile_picture_placeholder_v1.jpg'
import { Link } from 'react-router-dom'
import ExtraInfoWithIcons from './ExtraInfoWithIcons'
import TruncateText from '../../utils/TruncateText'
import { getProfileById } from '../../utils/api'

function SinglePost({
  title,
  content,
  availability,
  skillLevel,
  category,
  publicationDate,
  authorName,
  authorSurname,
  postPhoto,
  postId,
  authorId
}) {
  const [profilePic, setProfilePic] = useState('')

  async function getProfilePic() {
    const { data, error } = await getProfileById(authorId)
    if (error) {
      console.error(error.message)
    } else {
      setProfilePic(data.profilePicture)
    }
  }

  useEffect(() => {
    getProfilePic()
  }, [])
  return (
    <Card className='custom-card'>
      <Card.Header className='d-flex'>
        <Image
          src={profilePic ? profilePic : ProfilePicturePlaceholder}
          roundedCircle
          className='profile-picture-placeholder'
          width={'40px'}
          height={'40px'}
        />
        <div>
          <Link to={`/profile-details?id=${authorId}`} className='text-decoration-none'>
            <div className='fw-medium ms-2 text-dark hover-underline'>{authorName + ' ' + authorSurname}</div>
          </Link>
          <div className='small text-secondary ms-2'>{publicationDate}</div>
        </div>
      </Card.Header>
      <Link to={`/post-details?id=${postId}`} className='text-decoration-none'>
        {postPhoto && <Card.Img variant='top' className='rounded-0' src={postPhoto} />}
        <Card.Body>
          <Card.Title className='text-black hover-underline'>{title}</Card.Title>
          <div className='text-body mb-3'>
            <TruncateText text={content} maxLines={3} className='text-body' />
          </div>
          <div className='d-flex gap-3 small text-secondary'>
            <ExtraInfoWithIcons category={category} availability={availability} skillLevel={skillLevel} />
          </div>
          {/* <Button variant='primary'>Go somewhere</Button> */}
        </Card.Body>
      </Link>
    </Card>
  )
}
SinglePost.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  skillLevel: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorSurname: PropTypes.string.isRequired,
  postPhoto: PropTypes.string.isRequired,
  publicationDate: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired
}
export default SinglePost
