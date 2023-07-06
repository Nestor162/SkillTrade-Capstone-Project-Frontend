import LoginForm from './LoginForm'
import GoogleSignBtn from './GoogleSignBtn'
import AuthHeader from './AuthHeader'
function LoginPage() {
  return (
    <>
      <AuthHeader title='Welcome!' subtitle='Login to continue' />
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
