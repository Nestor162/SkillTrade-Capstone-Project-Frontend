import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { registerUser, getUserByEmail } from '../../utils/api.js'
import { useFormik } from 'formik'
import ErrorIcon from '../common/ErrorIcon.jsx'
import SuccessIcon from '../common/SuccessIcon.jsx'
import ErrorAlert from '../common/ErrorAlert.jsx'

function RegisterForm() {
  const validate = values => {
    const errors = {}
    const usernamePattern = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!_#%*?&]{8,}$/

    if (!values.username) {
      errors.username = (
        <>
          Username is <strong>reqiuired</strong>
        </>
      )
    } else if (!usernamePattern.test(values.username)) {
      errors.username = (
        <>
          <strong>Username:</strong> 8-20 characters, no spaces or consecutive special characters. Only _ or . allowed,
          but not at start or end
        </>
      )
    }

    if (!values.email) {
      errors.email = (
        <>
          Email is <strong>reqiuired</strong>
        </>
      )
    } else if (!emailPattern.test(values.email)) {
      errors.email = (
        <>
          <strong>Invalid email format.</strong> Please enter a valid email address
        </>
      )
    }

    if (!values.password) {
      errors.password = (
        <>
          Password is <strong>reqiuired</strong>
        </>
      )
    } else if (!passwordPattern.test(values.password)) {
      errors.password = (
        <>
          Password must be at least <strong>8 characters</strong> long and include an <strong>uppercase</strong> letter,
          a <strong>lowercase</strong> letter, a <strong>number</strong>, and a <strong>special character</strong> (
          <em>@$!_#%*?&</em>)
        </>
      )
    }

    if (!values.repeatedPassword) {
      errors.repeatedPassword = (
        <>
          Password is <strong>reqiuired</strong>
        </>
      )
    } else if (values.repeatedPassword !== values.password) {
      errors.repeatedPassword = (
        <>
          Passwords do <strong>not match</strong>
        </>
      )
    }
    return errors
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      repeatedPassword: ''
    },
    validate,
    onSubmit: values => {
      handleRegister(values)
    }
  })

  // ---- PASSWORD SHOW/HIDE ----
  const [hidePassword, setHidePassword] = useState(true)
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true)

  // REGISTER FETCH (POST)
  const navigate = useNavigate()
  async function handleRegister(payload) {
    const { data, error } = await registerUser(payload)
    if (error || data === null) {
      setErrorMsg(error.message)
    } else {
      localStorage.setItem('token', data.accessToken)
      // Get user info and store it in localstorage for the future
      const userByEmailResponse = await getUserByEmail(payload.email)

      // If there is an error in get by email fetch return the error
      if (userByEmailResponse.error) {
        console.error(userByEmailResponse.error)
        return { data: null, error: userByEmailResponse.error }
      }
      // othrewise store the user's ID and profile's ID in local storage
      else {
        localStorage.setItem('userId', userByEmailResponse.data.id)
        localStorage.setItem('profileId', userByEmailResponse.data.profile)
      }
      navigate('/interests')
    }
  }

  // ERRROR ALERT SHOW/HIDE
  const [errorMsg, setErrorMsg] = useState(null)

  return (
    <>
      {errorMsg && (
        <ErrorAlert
          onClose={() => {
            setErrorMsg(null)
          }}
        >
          {errorMsg}
        </ErrorAlert>
      )}
      <Form className='d-flex flex-column mx-4 mt-4' onSubmit={formik.handleSubmit}>
        <Form.Group className='mb-3'>
          <div className='position-relative'>
            <Form.Control
              id='username'
              name='username'
              type='text'
              placeholder='Username'
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.errors.username && formik.touched.username ? 'invalid-form' : ''}
            />
            {formik.errors.username && formik.touched.username ? (
              <ErrorIcon message={formik.errors.username} />
            ) : (
              !formik.errors.username && formik.touched.username && <SuccessIcon />
            )}
          </div>
        </Form.Group>

        <Form.Group className='mb-3'>
          <div className='position-relative'>
            <Form.Control
              type='email'
              id='email'
              name='email'
              placeholder='Email address'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.errors.email && formik.touched.email && 'invalid-form'}
            />
            {formik.errors.email && formik.touched.email ? (
              <ErrorIcon message={formik.errors.email} />
            ) : (
              !formik.errors.email && formik.touched.email && <SuccessIcon />
            )}
          </div>
        </Form.Group>
        <Form.Group className='mb-3'>
          <div className='position-relative'>
            <Form.Control
              type={hidePassword ? 'password' : 'text'}
              id='password'
              name='password'
              value={formik.values.password}
              placeholder='Password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.errors.password && formik.touched.password && 'invalid-form'}
            />
            {formik.errors.password && formik.touched.password ? (
              <ErrorIcon message={formik.errors.password} />
            ) : (
              !formik.errors.password && formik.touched.password && <SuccessIcon />
            )}
            <Eye
              className={
                hidePassword
                  ? 'd-none'
                  : `position-absolute top-50 end-0 translate-middle-y ${
                      formik.errors.password !== null || formik.values.password !== '' ? 'me-35' : 'me-2'
                    }`
              }
              style={{ cursor: 'pointer' }}
              onClick={() => setHidePassword(true)}
            />
            <EyeOff
              className={
                hidePassword
                  ? `position-absolute top-50 end-0 translate-middle-y ${
                      formik.errors.password !== null || formik.values.password !== '' ? 'me-35' : 'me-2'
                    }`
                  : 'd-none'
              }
              style={{ cursor: 'pointer' }}
              onClick={() => setHidePassword(false)}
            />
          </div>
        </Form.Group>

        <Form.Group className='mb-3'>
          <div className='position-relative'>
            <Form.Control
              id='repeatedPassword'
              name='repeatedPassword'
              type={hideConfirmPassword ? 'password' : 'text'}
              placeholder='Repeat password'
              value={formik.values.repeatedPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.errors.repeatedPassword && formik.touched.repeatedPassword && 'invalid-form'}
            />
            {formik.errors.repeatedPassword && formik.touched.repeatedPassword ? (
              <ErrorIcon message={formik.errors.repeatedPassword} />
            ) : (
              !formik.errors.repeatedPassword && formik.touched.repeatedPassword && <SuccessIcon />
            )}
            <Eye
              className={
                hideConfirmPassword
                  ? 'd-none'
                  : `position-absolute top-50 end-0 translate-middle-y ${
                      formik.errors.repeatedPassword !== null || formik.values.repeatedPassword !== ''
                        ? 'me-35'
                        : 'me-2'
                    }`
              }
              style={{ cursor: 'pointer' }}
              onClick={() => setHideConfirmPassword(true)}
            />
            <EyeOff
              className={
                hideConfirmPassword
                  ? `position-absolute top-50 end-0 translate-middle-y ${
                      formik.errors.repeatedPassword !== null || formik.values.repeatedPassword !== ''
                        ? 'me-35'
                        : 'me-2'
                    }`
                  : 'd-none'
              }
              style={{ cursor: 'pointer' }}
              onClick={() => setHideConfirmPassword(false)}
            />
          </div>
        </Form.Group>

        <Button type='submit' className='mt-3 main-btn'>
          CONTINUE
        </Button>
      </Form>
    </>
  )
}

export default RegisterForm
