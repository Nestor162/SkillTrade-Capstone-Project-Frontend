import { Card, Col } from 'react-bootstrap'

function LeftColMyProfile() {
  return (
    <Col xs={4} className='d-none d-md-flex'>
      <Card className='left-col-details ms-5 mt-4 border-0 position-sticky' style={{ top: '95px' }}>
        <Card.Body className='text-dark'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, placeat quidem nihil voluptas deleniti,
          officiis doloribus mollitia sint nisi quisquam earum! Odit nesciunt totam distinctio consequatur quis
          inventore suscipit ullam. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum dolorem earum nemo
          maxime perferendis voluptas sed veritatis consectetur recusandae soluta neque odit quidem aliquid, repellat
          odio blanditiis autem cum dicta.
        </Card.Body>
      </Card>
    </Col>
  )
}

export default LeftColMyProfile
