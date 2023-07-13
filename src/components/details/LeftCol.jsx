import { Card, Col } from 'react-bootstrap'

function LeftCol() {
  return (
    <Col xs={4} className='d-none d-md-flex'>
      <Card className='left-col-details ms-5 mt-4 border-0 position-sticky' style={{ top: '95px' }}>
        <Card.Body>
          <div>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nesciunt blanditiis obcaecati officiis
              inventore quidem iure asperiores consequuntur recusandae nam? Neque id voluptas laborum? Eum ipsum
              quibusdam veniam ratione possimus?
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default LeftCol
