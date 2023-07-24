import { Alert, Button, Card, Col } from 'react-bootstrap'
import ExtraInfoWithIcons from '../home/ExtraInfoWithIcons'
import { convertSnakeCaseToCapitalized } from '../../utils/stringUtils'
import PropTypes from 'prop-types'
import { Link, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { changePostStatus } from '../../utils/api'
import { Clock4 } from 'lucide-react'

function RightColPost({
  title,
  content,
  postPhoto,
  availability,
  skillLevel,
  category,
  authorName,
  authorSurname,
  authorId,
  postStatus
}) {
  const [clicked, setClicked] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const [searchParams] = useSearchParams()
  const postId = searchParams.get('id')

  const logedProfileId = localStorage.getItem('profileId')

  const handleClick = async () => {
    setClicked(!clicked)
    const payload = clicked ? { postStatus: 'ACTIVE' } : { postStatus: 'PENDING' }
    try {
      const response = await changePostStatus(payload, postId)
      if (response.error) {
        setErrorMsg(response.error)
        console.error(response.error)
      } else {
        setData(response.data)
      }
    } catch (error) {
      setErrorMsg(error.message)
    }
  }

  useEffect(() => {
    // If the post status retrieved from the API is "PENDING", then we set the "clicked" state to true to show the clicked button style.
    setClicked(postStatus === 'PENDING')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Col xs={10} md={7} className='mx-auto mx-lg-3 mx-xl-0 mt-4 mb-4'>
      <Card className='right-col-details border-0'>
        {postPhoto && <Card.Img variant='top' src={postPhoto} />}
        <Card.Body>
          <Card.Title className='mb-0 fs-3'>{title}</Card.Title>
          <Link to={`/profile-details?id=${authorId}`} className='text-decoration-none'>
            <div className='mb-3 small text-dark hover-underline '>{authorName + ' ' + authorSurname}</div>
          </Link>
          <Card.Text className='fs-5'>{content}</Card.Text>
          <div className='d-flex gap-3 small text-secondary mt-4'>
            <ExtraInfoWithIcons
              availability={convertSnakeCaseToCapitalized(availability)}
              skillLevel={convertSnakeCaseToCapitalized(skillLevel)}
              category={category}
            />
          </div>

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
          {authorId !== logedProfileId && (
            <Button
              className={`main-btn d-block mt-4 mx-auto fw-medium ${clicked ? 'clicked' : ''}`}
              onClick={handleClick}
              variant='success'
            >
              {clicked ? (
                <>
                  Pending <Clock4 size={16} />
                </>
              ) : (
                'I’m Interested!'
              )}
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  )
}

RightColPost.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  skillLevel: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  postPhoto: PropTypes.string.isRequired,
  publicationDate: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorSurname: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired,
  postStatus: PropTypes.string.isRequired
}

export default RightColPost
