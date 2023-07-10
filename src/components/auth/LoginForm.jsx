import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../utils/api.js'

function LoginForm() {
  const navigate = useNavigate()
  const userLoginPayload = { email: '', password: '' }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    userLoginPayload.email = email
    userLoginPayload.password = password
    handleLogin(userLoginPayload)
    setTimeout(() => setErrorMsg(null), 4000)
  }

  // ---- PASSWORD SHOW/HIDE ----
  const [hidePassword, setHidePassword] = useState(true)

  async function handleLogin(payload) {
    const { data, error } = await loginUser(payload)
    if (error || data === null) {
      setErrorMsg(error)
    } else {
      localStorage.setItem('token', data.accessToken)
      navigate('/home')
    }
  }

  // ERRROR ALERT SHOW/HIDE
  const [errorMsg, setErrorMsg] = useState(null)

  return (
    <Form className='d-flex flex-column mx-4 mt-4' onSubmit={handleSubmit}>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Control
          type='email'
          placeholder='Enter your email'
          onChange={event => {
            setEmail(event.target.value)
          }}
          value={email}
          required
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <div className='position-relative'>
          <Form.Control
            type={hidePassword ? 'password' : 'text'}
            placeholder='Enter your password'
            onChange={event => {
              setPassword(event.target.value)
            }}
            value={password}
            required
          />
          <Eye
            className={hidePassword ? 'd-none' : 'position-absolute top-50 end-0 translate-middle-y me-2'}
            onClick={() => setHidePassword(true)}
            style={{ cursor: 'pointer' }}
          />
          <EyeOff
            className={hidePassword ? 'position-absolute top-50 end-0 translate-middle-y me-2' : 'd-none'}
            onClick={() => setHidePassword(false)}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </Form.Group>

      <OverlayTrigger
        show={errorMsg !== null}
        transition={false}
        placement='bottom'
        overlay={
          <Popover id='popover-basic'>
            <Popover.Header as='h3' className='text-center' style={{ backgroundColor: '#a04a35' }}>
              <span className='text-light'>LOGIN ERROR</span>
            </Popover.Header>
            <Popover.Body className='text-center' style={{ backgroundColor: '#B2523B' }}>
              <span className='text-light'> {errorMsg}</span>
            </Popover.Body>
          </Popover>
        }
      >
        <Button type='submit' className='mt-3 main-btn'>
          LOGIN
        </Button>
      </OverlayTrigger>
    </Form>
  )
}

export default LoginForm
