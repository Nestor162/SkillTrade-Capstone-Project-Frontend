import { Card, Col } from 'react-bootstrap'
import ExtraInfoWithIcons from '../home/ExtraInfoWithIcons'
import { convertSnakeCaseToCapitalized } from '../../utils/stringUtils'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function RightCol({
  title,
  content,
  postPhoto,
  availability,
  skillLevel,
  category,
  authorName,
  authorSurname,
  authorId
}) {
  return (
    <Col xs={10} md={7} className='mx-auto mx-lg-3 mx-xl-0 mt-4'>
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
          {/* <Button variant='primary'>Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </Col>
  )
}

RightCol.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  skillLevel: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  postPhoto: PropTypes.string.isRequired,
  publicationDate: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorSurname: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired
}

export default RightCol
