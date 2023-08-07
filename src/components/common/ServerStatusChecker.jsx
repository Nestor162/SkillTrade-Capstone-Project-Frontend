import { useState, useEffect } from 'react'
import { checkServerStatus } from '../../utils/api'
import LoadingBar from './LoadingBar'

const ServerStatusChecker = () => {
  const [status, setStatus] = useState(null)

  const handleStatus = async () => {
    const response = await checkServerStatus()
    setStatus(response.data.status)
    console.log(response.data.status)
  }

  useEffect(() => {
    handleStatus()
  }, [])

  return <div>{status !== 'ready' && <LoadingBar />}</div>
}

export default ServerStatusChecker
