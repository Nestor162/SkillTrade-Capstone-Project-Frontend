import { Button, Form } from 'react-bootstrap'

function RegisterForm() {
  return (
    <>
      <Form className='d-flex flex-column mx-4 mt-4'>
        <Form.Group className='mb-3'>
          <Form.Control type='text' placeholder='Username' />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Control type='email' placeholder='Email address' />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Control type='password' placeholder='Password' />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Control type='password' placeholder='Repeat password' />
        </Form.Group>

        <Button type='submit' className='mt-3 main-btn'>
          REGISTER
        </Button>
      </Form>
    </>
  )
}

export default RegisterForm
