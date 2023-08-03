import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'

// eslint-disable-next-line react/prop-types
function PrivateRoute({ children }) {
  const token = useAuthStore(state => state.token)

  if (!token) {
    return <Navigate to='/' />
  }

  return children
}

export default PrivateRoute
