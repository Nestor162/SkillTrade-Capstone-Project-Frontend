import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Button, Form, OverlayTrigger, Popover } from 'react-bootstrap'

function RegisterForm() {
  const userRegisterPayload = { username: '', email: '', password: '' }

  // FIELDS STATES
  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState(null)

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(null)

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(null)

  const [repeatedPassword, setRepeatedPassword] = useState('')
  const [repeatedPasswordError, setRepeatedPasswordError] = useState(null)

  // ---- INPUT FIELDS VALIDATION ----
  const validateUsername = () => {
    let errorMessage = null
    const pattern = new RegExp(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)
    if (!username) {
      errorMessage = (
        <>
          Username is <strong>reqiuired</strong>
        </>
      )
    } else if (pattern.test(username)) {
      errorMessage = null
    } else {
      errorMessage = (
        <>
          Username must be <strong>8-20 characters</strong> long, with
          <strong> no spaces</strong> or <strong>consecutive special characters</strong>
        </>
      )
    }
    setUsernameError(errorMessage)
  }

  const validateEmail = () => {
    let errorMessage = null
    const pattern = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
    if (!email) {
      errorMessage = (
        <>
          Email is <strong>reqiuired</strong>
        </>
      )
    } else if (pattern.test(email)) {
      errorMessage = null
    } else {
      errorMessage = (
        <>
          <strong>Invalid email format.</strong> Please enter a valid email address
        </>
      )
    }
    setEmailError(errorMessage)
  }

  const validatePassword = () => {
    let errorMessage = null
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!_#%*?&]{8,}$/
    if (!password) {
      errorMessage = (
        <>
          Password is <strong>reqiuired</strong>
        </>
      )
    } else if (pattern.test(password)) {
      errorMessage = null
    } else {
      errorMessage = (
        <>
          Password must be at least <strong>8 characters</strong> long and include an <strong>uppercase</strong> letter,
          a <strong>lowercase</strong> letter, a <strong>number</strong>, and a <strong>special character</strong> (
          <em>@$!_#%*?&</em>)
        </>
      )
    }
    setPasswordError(errorMessage)
  }

  const validateRepeatedPassword = () => {
    let errorMessage = null
    if (!password) {
      errorMessage = (
        <>
          Password is <strong>reqiuired</strong>
        </>
      )
    } else if (repeatedPassword !== password) {
      errorMessage = 'Passwords do not match'
    } else {
      errorMessage = null
    }
    setRepeatedPasswordError(errorMessage)
  }

  // ---- PASSWORD SHOW/HIDE ----
  const [hidePassword, setHidePassword] = useState(true)
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true)

  // ---- SUBMIT HANDLER----
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
            <OverlayTrigger
              trigger={['hover', 'focus', 'click']}
              placement='top'
              overlay={
                <Popover>
                  <Popover.Header as='h3'>Invalid value</Popover.Header>
                  <Popover.Body>{usernameError}</Popover.Body>
                </Popover>
              }
            >
              <AlertCircle
                tabIndex={0}
                color='var(--tertiary-color)'
                strokeWidth={3}
                className={usernameError ? 'position-absolute top-50 end-0 translate-middle-y me-1' : 'd-none'}
              />
            </OverlayTrigger>
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
            <OverlayTrigger
              trigger={['hover', 'focus', 'click']}
              placement='top'
              overlay={
                <Popover>
                  <Popover.Header as='h3'>Invalid value</Popover.Header>
                  <Popover.Body>{emailError}</Popover.Body>
                </Popover>
              }
            >
              <AlertCircle
                tabIndex={0}
                color='var(--tertiary-color)'
                strokeWidth={3}
                className={emailError ? 'position-absolute top-50 end-0 translate-middle-y me-1' : 'd-none'}
              />
            </OverlayTrigger>
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
              type={hidePassword ? 'password' : 'text'}
              placeholder='Password'
              value={password}
              onChange={event => {
                setPassword(event.target.value)
              }}
              onBlur={validatePassword}
              className={passwordError && 'invalid-form'}
            />
            <OverlayTrigger
              trigger={['hover', 'focus', 'click']}
              placement='top'
              overlay={
                <Popover>
                  <Popover.Header as='h3'>Invalid value</Popover.Header>
                  <Popover.Body>{passwordError}</Popover.Body>
                </Popover>
              }
            >
              <AlertCircle
                tabIndex={0}
                color='var(--tertiary-color)'
                strokeWidth={3}
                className={passwordError ? 'position-absolute top-50 end-0 translate-middle-y me-1' : 'd-none'}
              />
            </OverlayTrigger>
            <CheckCircle2
              color='var(--primary-color)'
              strokeWidth={3}
              className={
                passwordError === null && password !== ''
                  ? 'position-absolute top-50 end-0 translate-middle-y me-1'
                  : 'd-none'
              }
            />
            <Eye
              className={
                hidePassword
                  ? 'd-none'
                  : `position-absolute top-50 end-0 translate-middle-y ${
                      passwordError !== null || password !== '' ? 'me-35' : 'me-2'
                    }`
              }
              onClick={() => setHidePassword(true)}
            />
            <EyeOff
              className={
                hidePassword
                  ? `position-absolute top-50 end-0 translate-middle-y ${
                      passwordError !== null || password !== '' ? 'me-35' : 'me-2'
                    }`
                  : 'd-none'
              }
              onClick={() => setHidePassword(false)}
            />
          </div>
        </Form.Group>

        <Form.Group className='mb-3'>
          <div className='position-relative'>
            <Form.Control
              type={hideConfirmPassword ? 'password' : 'text'}
              placeholder='Repeat password'
              value={repeatedPassword}
              onChange={event => setRepeatedPassword(event.target.value)}
              onBlur={validateRepeatedPassword}
              className={repeatedPasswordError && 'invalid-form'}
            />
            <OverlayTrigger
              trigger={['hover', 'focus', 'click']}
              placement='top'
              overlay={
                <Popover>
                  <Popover.Header as='h3'>Invalid value</Popover.Header>
                  <Popover.Body>{repeatedPasswordError}</Popover.Body>
                </Popover>
              }
            >
              <AlertCircle
                tabIndex={0}
                color='var(--tertiary-color)'
                strokeWidth={3}
                className={repeatedPasswordError ? 'position-absolute top-50 end-0 translate-middle-y me-1' : 'd-none'}
              />
            </OverlayTrigger>
            <CheckCircle2
              color='var(--primary-color)'
              strokeWidth={3}
              className={
                repeatedPasswordError === null && repeatedPassword !== ''
                  ? 'position-absolute top-50 end-0 translate-middle-y me-1'
                  : 'd-none'
              }
            />

            <Eye
              className={
                hideConfirmPassword
                  ? 'd-none'
                  : `position-absolute top-50 end-0 translate-middle-y ${
                      repeatedPasswordError !== null || repeatedPassword !== '' ? 'me-35' : 'me-2'
                    }`
              }
              onClick={() => setHideConfirmPassword(true)}
            />
            <EyeOff
              className={
                hideConfirmPassword
                  ? `position-absolute top-50 end-0 translate-middle-y ${
                      repeatedPasswordError !== null || repeatedPassword !== '' ? 'me-35' : 'me-2'
                    }`
                  : 'd-none'
              }
              onClick={() => setHideConfirmPassword(false)}
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
