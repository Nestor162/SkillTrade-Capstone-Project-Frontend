import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function LoginForm() {
  return (
    <Form className='d-flex flex-column mx-4 mt-4'>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Email</Form.Label>
        <Form.Control type='email' placeholder='Enter your email' />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Enter your password' />
      </Form.Group>
      <Button type='submit' className='mt-3 main-btn'>
        LOGIN
      </Button>
    </Form>
  )
}

export default LoginForm
