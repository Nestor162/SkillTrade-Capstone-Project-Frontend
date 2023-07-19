import { ArrowBigLeft } from 'lucide-react'
import notFoundImg from './../assets/img/404-not-found.png'
import { Link } from 'react-router-dom'
function NotFound() {
  return (
    <div className='d-flex justify-content-center align-items-center flex-column mt-5'>
      <h1>OOPS! PAGE NOT FOUND!</h1>
      <img src={notFoundImg} alt='sad robot' width={300} />
      <h2 className='text-danger'>ERROR: 404</h2>
      <Link to={'/home'} className='text-decoration-none text-dark'>
        <div className='secondary-btn p-2 '>
          Back to homepage <ArrowBigLeft />
        </div>
      </Link>
    </div>
  )
}

export default NotFound
