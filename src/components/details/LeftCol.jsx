import { Card, Col } from 'react-bootstrap'

function LeftCol() {
  return (
    <Col xs={4} className='d-none d-md-flex'>
      <Card className='left-col-details ms-5 mt-4 border-0 position-sticky' style={{ top: '95px' }}>
        <Card.Body>
          <div>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the cards content. Lorem ipsum
              dolor sit, amet consectetur adipisicing elit. Rem ullam dolores perspiciatis delectus itaque suscipit
              odit, eaque nesciunt, placeat molestiae error dolorum est, cum nostrum officiis. Quasi vitae quos
              voluptatem? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, culpa. Voluptatum
              exercitationem facere accusantium earum saepe blanditiis? Facere nihil cupiditate deleniti unde vel amet
              eaque impedit velit magni, eos soluta.
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default LeftCol
