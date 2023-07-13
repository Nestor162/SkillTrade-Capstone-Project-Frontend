import { CalendarClock, Signal, Tag } from 'lucide-react'
import { Col, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'

function ExtraInfoWithIcons({ category, availability, skillLevel }) {
  return (
    <Row>
      <Col xs={'auto'}>
        <Row className='flex-column align-items-center'>
          <Col xs='auto'>
            <Tag size={'18px'} />
          </Col>
          <Col xs='auto'>
            <div>{category}</div>
          </Col>
        </Row>
      </Col>
      <Col xs={'auto'}>
        <Row className='flex-column align-items-center'>
          <Col xs='auto'>
            <CalendarClock size={'18px'} />
          </Col>
          <Col xs='auto'>
            <div>{availability}</div>
          </Col>
        </Row>
      </Col>
      <Col xs={'auto'}>
        <Row className='flex-column align-items-center'>
          <Col xs='auto'>
            <Signal size={'18px'} />
          </Col>
          <Col xs='auto'>
            <div>{skillLevel}</div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

ExtraInfoWithIcons.propTypes = {
  category: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  skillLevel: PropTypes.string.isRequired
}

export default ExtraInfoWithIcons
