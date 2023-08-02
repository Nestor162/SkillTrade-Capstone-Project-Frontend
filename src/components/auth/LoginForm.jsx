import { AlertCircle, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import { loginUser, getUserByEmail } from '../../utils/api.js'
import { useFormik } from 'formik'
import { Button, OverlayTrigger, Popover } from 'react-bootstrap'
import ErrorAlert from '../common/ErrorAlert.jsx'
import { useAuthStore } from '../../store/useAuthStore.js'

function LoginForm() {
  const navigate = useNavigate()
  const handleLogin = useAuthStore(state => state.handleLogin)

  const validate = values => {
    const errors = {}

    if (!values.email) {
      errors.email = (
        <>
          Email is <strong>reqiuired</strong>
        </>
      )
    }
    if (!values.password) {
      errors.password = (
        <>
          Password is <strong>reqiuired</strong>
        </>
      )
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate,
    onSubmit: values => {
      handleSubmit(values)
    }
  })

  // ---- PASSWORD SHOW/HIDE ----
  const [hidePassword, setHidePassword] = useState(true)

  async function handleSubmit(payload) {
    const { data, error } = await loginUser(payload)
    if (error || data === null) {
      setErrorMsg(error)
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
      handleLogin(data.accessToken)
      navigate('/home')
    }
  }

  // ERRROR ALERT SHOW/HIDE
  const [errorMsg, setErrorMsg] = useState(null)

  return (
    <Form className='d-flex flex-column mx-4 mt-4' onSubmit={formik.handleSubmit}>
      <Form.Group className='mb-3 position-relative'>
        <Form.Control
          id='email'
          name='email'
          type='email'
          placeholder='Enter your email'
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
          className={formik.errors.email && formik.touched.email ? 'invalid-form' : ''}
        />
        <OverlayTrigger
          trigger={['hover', 'focus', 'click']}
          placement='top'
          overlay={
            <Popover>
              <Popover.Header as='h3'>Invalid value</Popover.Header>
              <Popover.Body>{formik.errors.email}</Popover.Body>
            </Popover>
          }
        >
          {formik.errors.email && formik.touched.email ? (
            <AlertCircle
              tabIndex={0}
              color='var(--tertiary-color)'
              strokeWidth={3}
              className='position-absolute top-50 end-0 translate-middle-y me-1'
            />
          ) : (
            <span></span>
          )}
        </OverlayTrigger>
      </Form.Group>

      <Form.Group className='mb-3 position-relative'>
        <div className='position-relative'>
          <Form.Control
            type={hidePassword ? 'password' : 'text'}
            placeholder='Enter your password'
            id='password'
            name='password'
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            className={formik.errors.password && formik.touched.password ? 'invalid-form' : ''}
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

        <OverlayTrigger
          trigger={['hover', 'focus', 'click']}
          placement='top'
          overlay={
            <Popover>
              <Popover.Header as='h3'>Invalid value</Popover.Header>
              <Popover.Body>{formik.errors.password}</Popover.Body>
            </Popover>
          }
        >
          {formik.errors.password && formik.touched.password ? (
            <AlertCircle
              tabIndex={0}
              color='var(--tertiary-color)'
              strokeWidth={3}
              className='position-absolute top-50 end-0 translate-middle-y me-5'
            />
          ) : (
            <span></span>
          )}
        </OverlayTrigger>
      </Form.Group>
      <Button type='submit' className='mt-3 main-btn'>
        LOGIN
      </Button>
      {errorMsg && (
        <ErrorAlert
          onClose={() => {
            setErrorMsg(null)
          }}
        >
          {errorMsg}
        </ErrorAlert>
      )}
    </Form>
  )
}

export default LoginForm
