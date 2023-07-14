// ---- MULTILINE TRUNCATE ----
// If browser doesn't suport -webkit-line-clamp, it uses another method to achieve multiline truncate
import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

const TruncateText = ({ text, maxLines }) => {
  const [truncatedText, setTruncatedText] = useState(text)
  const textRef = useRef(null)

  useEffect(() => {
    if ('webkitLineClamp' in document.body.style) {
      // Browser supports -webkit-line-clamp
      textRef.current.style.display = '-webkit-box'
      textRef.current.style.webkitLineClamp = maxLines
      textRef.current.style.webkitBoxOrient = 'vertical'
      textRef.current.style.overflow = 'hidden'
    } else {
      // Browser does not support -webkit-line-clamp
      const lineHeight = parseInt(window.getComputedStyle(textRef.current).lineHeight)
      const maxHeight = lineHeight * maxLines
      let words = text.split(' ')

      while (textRef.current.offsetHeight > maxHeight && words.length > 0) {
        words.pop()
        setTruncatedText(words.join(' ') + '...')
      }
    }
  }, [text, maxLines])

  return <div ref={textRef}>{truncatedText}</div>
}

TruncateText.propTypes = {
  text: PropTypes.string.isRequired,
  maxLines: PropTypes.number.isRequired
}

export default TruncateText
