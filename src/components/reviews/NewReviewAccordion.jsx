import { Accordion, Col, Row } from 'react-bootstrap'
import NewReviewForm from './NewReviewForm'
import { useState } from 'react'
import { Pencil } from 'lucide-react'

function NewReviewAccordion() {
  const [activeKey, setActiveKey] = useState(null)

  function handleButtonClick() {
    setActiveKey(activeKey === '0' ? null : '0')
  }

  function handleClose() {
    setActiveKey(null)
  }

  return (
    <>
      <button className='secondary-btn px-2' onClick={handleButtonClick} style={{ maxWidth: 'fit-content' }}>
        <span className='d-flex align-items-center gap-1'>
          Write a review <Pencil size={'15px'} />
        </span>
      </button>
      <Accordion activeKey={activeKey}>
        <Accordion.Item eventKey='0' className='border-0'>
          <Accordion.Body>
            <Row className='d-flex justify-content-center mt-5'>
              <Col xs={8}>
                <NewReviewForm onClose={handleClose} />
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  )
}

export default NewReviewAccordion
