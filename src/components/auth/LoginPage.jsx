import LoginForm from './LoginForm'
import logo from '../../assets/img/skilltrade-logo-with-text-cropped.png'
import GoogleSignBtn from './GoogleSignBtn'
function LoginPage() {
  return (
    <>
      <header>
        <div className='d-flex justify-content-center'>
          <img src={logo} alt='SkillTrade logo' width={'110px'} className='my-3' />
        </div>
        <div className='ms-4'>
          <h1 className='fs-1'>Welcome!</h1>
          <h2 className='fs-4 fst-italic fw-lighter'>Login to continue</h2>
        </div>
      </header>
      <LoginForm />
      <div className='d-flex align-items-center justify-content-center mt-4'>
        <div className='horizontal-separator ms-5'></div> <span className='mx-3 align-self-center'>OR</span>
        <div className='horizontal-separator me-5'></div>
      </div>
      <GoogleSignBtn />
      <p className='d-flex justify-content-center mt-2'>
        New to SkillTrade?&nbsp;<a href='#'>Register</a>
      </p>
    </>
  )
}

export default LoginPage
