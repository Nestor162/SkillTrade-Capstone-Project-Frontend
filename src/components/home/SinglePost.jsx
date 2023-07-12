import { Card, Col, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { CalendarClock, Signal, Tag } from 'lucide-react'

function SinglePost({ title, content, availability, skillLevel, category }) {
  return (
    <div>
      <Card className='custom-card'>
        {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{content}</Card.Text>
          <div className='d-flex gap-3 small text-secondary'>
            <Row>
              <Col xs={4}>
                <Row className='flex-column align-items-center'>
                  <Col xs='auto'>
                    <Tag size={'18px'} />
                  </Col>
                  <Col xs='auto' className='text-nowrap'>
                    <div>{category}</div>
                  </Col>
                </Row>
              </Col>
              <Col xs={4}>
                <Row className='flex-column align-items-center'>
                  <Col xs='auto'>
                    <CalendarClock size={'18px'} />
                  </Col>
                  <Col xs='auto' className='text-nowrap'>
                    <div>{availability}</div>
                  </Col>
                </Row>
              </Col>
              <Col xs={4}>
                <Row className='flex-column align-items-center'>
                  <Col xs='auto'>
                    <Signal size={'18px'} />
                  </Col>
                  <Col xs='auto' className='text-nowrap'>
                    <div>{skillLevel}</div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          {/* <Button variant='primary'>Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </div>
  )
}
SinglePost.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  skillLevel: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired
}
export default SinglePost
