import { useState, useEffect } from 'react'
import { ProgressBar } from 'react-bootstrap'

const LoadingBar = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          clearInterval(interval)
        }
        const diff = Math.random() * 5
        return Math.min(oldProgress + diff, 100)
      })
    }, 7000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className='loading-container'>
      <div className='bg-light p-5 rounded'>
        <ProgressBar animated now={progress} variant='success' label={`${Math.round(progress)}%`} />
        <p className='mt-4'>
          Sorry to keep you waiting! I&apos;m using a free server hosting that shuts down after 15 minutes of
          inactivity. Please wait, approximately {Math.round((300 - progress * 3) / 60)} minutes left... ⏳🙄
        </p>
      </div>
    </div>
  )
}

export default LoadingBar
