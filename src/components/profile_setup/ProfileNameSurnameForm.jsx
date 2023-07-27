import { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { GetAllLanguages } from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import AnimatedMulti from './AnimatedMulti'

import LoadingSpinner from '../common/LoadingSpinner'
import { useFormik } from 'formik'
import ErrorIcon from '../common/ErrorIcon'
import SuccessIcon from '../common/SuccessIcon'
import { useUserStore } from '../../store/UserStore'

function ProfilenameSurnameForm() {
  const { setName, setSurname, setLangs } = useUserStore()

  const validate = values => {
    const errors = {}

    const patternNameSurname = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s[a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/

    if (!values.name) {
      errors.name = (
        <>
          Name is <strong>required</strong>
        </>
      )
    } else if (!patternNameSurname.test(values.name)) {
      errors.name = (
        <>
          The name is <strong>not valid</strong>
        </>
      )
    }

    if (!values.surname) {
      errors.surname = (
        <>
          Surname is <strong>required</strong>
        </>
      )
    } else if (!patternNameSurname.test(values.surname)) {
      errors.surname = (
        <>
          The surname is <strong>not valid</strong>
        </>
      )
    }

    if (!values.langs || values.langs.length === 0) {
      errors.langs = (
        <>
          Languages are <strong>reqiuired</strong>
        </>
      )
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      password: '',
      langs: ''
    },
    validate,
    onSubmit: values => {
      handleFetch(values)
    }
  })

  // eslint-disable-next-line no-unused-vars
  const [availableLangs, setAvailableLangs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [options, setOptions] = useState('')
  const navigate = useNavigate()

  const handleLangChange = selectedOptions => {
    formik.setFieldValue('langs', selectedOptions)
  }

  async function handleGetAllLanguages() {
    const { data, error } = await GetAllLanguages()
    if (error) {
      console.error(error)
    } else {
      setLangs(data)
      const options = data.map(lang => ({ value: lang.languageCode, label: lang.languageName }))
      setOptions(options)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    handleGetAllLanguages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleFetch(values) {
    const languageCodes = values.langs.map(lang => lang.value)

    setName(values.name)
    setSurname(values.surname)
    setLangs(languageCodes)
    navigate('/profile-creation')
  }

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Form onSubmit={formik.handleSubmit} className='p-4'>
          <Form.Group className='mb-4'>
            <Form.Label>Name</Form.Label>
            <div className='position-relative'>
              <Form.Control
                name='name'
                id='name'
                type='text'
                placeholder='Enter your name'
                className={formik.errors.name && formik.touched.name ? 'invalid-form' : null}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name ? (
                <ErrorIcon message={formik.errors.name} />
              ) : (
                !formik.errors.name && formik.touched.name && <SuccessIcon />
              )}
            </div>
          </Form.Group>
          <Form.Group className='mb-4'>
            <Form.Label>Surname</Form.Label>
            <div className='position-relative'>
              <Form.Control
                name='surname'
                id='surname'
                type='text'
                placeholder='Enter your surname'
                value={formik.values.surname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.errors.surname && formik.touched.surname ? 'invalid-form' : null}
              />
              {formik.errors.surname && formik.touched.surname ? (
                <ErrorIcon message={formik.errors.surname} />
              ) : (
                !formik.errors.surname && formik.touched.surname && <SuccessIcon />
              )}
            </div>
          </Form.Group>
          <Form.Group className='mb-4'>
            <Form.Label>Languages</Form.Label>
            <div className='position-relative'>
              <AnimatedMulti
                name='langs'
                id='langs'
                options={options}
                onChange={handleLangChange}
                onBlur={formik.handleBlur}
                value={formik.values.langs}
                invalidStyle={formik.errors.langs && formik.touched.langs ? 'invalid-form' : null}
              />
              {formik.errors.langs && formik.touched.langs ? (
                <ErrorIcon message={formik.errors.langs} />
              ) : (
                !formik.errors.langs && formik.touched.langs && <SuccessIcon />
              )}
            </div>
          </Form.Group>

          <Button type='submit' className='mt-4 main-btn d-block mx-auto'>
            CONTINUE
          </Button>
        </Form>
      )}
    </>
  )
}

export default ProfilenameSurnameForm
