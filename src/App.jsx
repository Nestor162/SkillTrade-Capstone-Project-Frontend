import LoginPage from './components/auth/LoginPage'
import RegisterPage from './components/auth/RegisterPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='*' element={<h1>Not found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
