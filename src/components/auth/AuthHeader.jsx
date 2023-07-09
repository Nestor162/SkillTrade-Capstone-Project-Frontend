import logo from '../../assets/img/skilltrade-logo-with-text-cropped.png'
import PropTypes from 'prop-types'

function AuthHeader({ title, subtitle }) {
  return (
    <header>
      <div className='d-flex justify-content-center'>
        <img src={logo} alt='SkillTrade logo' width={'100px'} className='my-3' />
      </div>
      <div className='ms-4'>
        <h1 className='fs-2'>{title}</h1>
        <h2 className='fs-5 fst-italic fw-lighter'>{subtitle}</h2>
      </div>
    </header>
  )
}

AuthHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
}

export default AuthHeader
