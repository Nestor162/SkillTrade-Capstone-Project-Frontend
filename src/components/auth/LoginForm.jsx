import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function LoginForm() {
  const userLoginPayload = { email: '', password: '' }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    userLoginPayload.email = email
    userLoginPayload.password = password
    console.log(userLoginPayload)
  }

  // ---- PASSWORD SHOW/HIDE ----
  const [hidePassword, setHidePassword] = useState(true)

  return (
    <Form className='d-flex flex-column mx-4 mt-4' onSubmit={handleSubmit}>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter your email'
          onChange={event => {
            setEmail(event.target.value)
          }}
          value={email}
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <div className='position-relative'>
          <Form.Control
            type={hidePassword ? 'password' : 'text'}
            placeholder='Enter your password'
            onChange={event => {
              setPassword(event.target.value)
            }}
            value={password}
          />
          <Eye
            className={hidePassword ? 'd-none' : 'position-absolute top-50 end-0 translate-middle-y me-2'}
            onClick={() => setHidePassword(true)}
          />
          <EyeOff
            className={hidePassword ? 'position-absolute top-50 end-0 translate-middle-y me-2' : 'd-none'}
            onClick={() => setHidePassword(false)}
          />
        </div>
      </Form.Group>
      <Button type='submit' className='mt-3 main-btn'>
        LOGIN
      </Button>
    </Form>
  )
}

export default LoginForm
