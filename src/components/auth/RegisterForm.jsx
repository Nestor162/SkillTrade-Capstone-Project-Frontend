import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

function RegisterForm() {
  const userRegisterPayload = { username: '', email: '', password: '' }

  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState(null)

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(null)

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(null)

  const [repeatedPassword, setRepeatedPassword] = useState('')
  const [repeatedPasswordError, setRepeatedPasswordError] = useState(null)

  const validateUsername = () => {
    let errorMessage = null
    const pattern = new RegExp(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)
    if (!username) {
      errorMessage = 'Username is required'
    } else if (pattern.test(username)) {
      errorMessage = null
    } else {
      errorMessage = 'Invalid Username'
    }
    setUsernameError(errorMessage)
  }

  const validateEmail = () => {
    let errorMessage = null
    const pattern = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
    if (!email) {
      errorMessage = 'Email is required'
    } else if (pattern.test(email)) {
      errorMessage = null
    } else {
      errorMessage = 'Invalid email address'
    }
    setEmailError(errorMessage)
  }

  const validatePassword = () => {
    let errorMessage = null
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!_#%*?&]{8,}$/
    if (!password) {
      errorMessage = 'Password is required'
    } else if (pattern.test(password)) {
      errorMessage = null
    } else {
      errorMessage = 'Invalid password'
    }
    setPasswordError(errorMessage)
  }

  const validateRepeatedPassword = () => {
    let errorMessage = null
    if (!password) {
      errorMessage = 'Password is required'
    } else if (repeatedPassword !== password) {
      errorMessage = 'Passwords do not match'
    } else {
      errorMessage = null
    }
    setRepeatedPasswordError(errorMessage)
  }

  const handleSubmit = event => {
    event.preventDefault()
    userRegisterPayload.username = username
    userRegisterPayload.email = email
    userRegisterPayload.password = password
    console.log(userRegisterPayload)
  }

  return (
    <>
      <Form className='d-flex flex-column mx-4 mt-4' onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <div className='position-relative'>
            <Form.Control
              type='text'
              placeholder='Username'
              value={username}
              onChange={event => setUsername(event.target.value)}
              onBlur={validateUsername}
              className={usernameError && 'invalid-form'}
            />

            <AlertCircle
              color='var(--tertiary-color)'
              strokeWidth={3}
              className={usernameError ? 'position-absolute top-50 end-0 translate-middle-y me-1' : 'd-none'}
            />
            <CheckCircle2
              color='var(--primary-color)'
              strokeWidth={3}
              className={
                usernameError === null && username !== ''
                  ? 'position-absolute top-50 end-0 translate-middle-y me-1'
                  : 'd-none'
              }
            />
          </div>
        </Form.Group>

        <Form.Group className='mb-3'>
          <div className='position-relative'>
            <Form.Control
              type='email'
              placeholder='Email address'
              value={email}
              onChange={event => {
                setEmail(event.target.value)
              }}
              onBlur={validateEmail}
              className={emailError && 'invalid-form'}
            />
            <AlertCircle
              color='var(--tertiary-color)'
              strokeWidth={3}
              className={emailError ? 'position-absolute top-50 end-0 translate-middle-y me-1' : 'd-none'}
            />
            <CheckCircle2
              color='var(--primary-color)'
              strokeWidth={3}
              className={
                emailError === null && email !== ''
                  ? 'position-absolute top-50 end-0 translate-middle-y me-1'
                  : 'd-none'
              }
            />
          </div>
        </Form.Group>
        <Form.Group className='mb-3'>
          <div className='position-relative'>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={event => {
                setPassword(event.target.value)
              }}
              onBlur={validatePassword}
              className={passwordError && 'invalid-form'}
            />
            <AlertCircle
              color='var(--tertiary-color)'
              strokeWidth={3}
              className={passwordError ? 'position-absolute top-50 end-0 translate-middle-y me-1' : 'd-none'}
            />
            <CheckCircle2
              color='var(--primary-color)'
              strokeWidth={3}
              className={
                passwordError === null && password !== ''
                  ? 'position-absolute top-50 end-0 translate-middle-y me-1'
                  : 'd-none'
              }
            />
          </div>
        </Form.Group>

        <Form.Group className='mb-3'>
          <div className='position-relative'>
            <Form.Control
              type='password'
              placeholder='Repeat password'
              value={repeatedPassword}
              onChange={event => setRepeatedPassword(event.target.value)}
              onBlur={validateRepeatedPassword}
              className={repeatedPasswordError && 'invalid-form'}
            />
            <AlertCircle
              color='var(--tertiary-color)'
              strokeWidth={3}
              className={repeatedPasswordError ? 'position-absolute top-50 end-0 translate-middle-y me-1' : 'd-none'}
            />
            <CheckCircle2
              color='var(--primary-color)'
              strokeWidth={3}
              className={
                repeatedPasswordError === null && repeatedPassword !== ''
                  ? 'position-absolute top-50 end-0 translate-middle-y me-1'
                  : 'd-none'
              }
            />
          </div>
        </Form.Group>

        <Button type='submit' className='mt-3 main-btn'>
          REGISTER
        </Button>
      </Form>
    </>
  )
}

export default RegisterForm
