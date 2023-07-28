import PropTypes from 'prop-types'
import StarRatings from 'react-star-ratings'

function StarsRating({ rating, onChange }) {
  return (
    <StarRatings
      rating={rating}
      starRatedColor='var(--tertiary-color-dark)'
      starHoverColor='var(--tertiary-color)'
      starDimension='27px'
      changeRating={onChange}
      numberOfStars={5}
      name='rating'
    />
  )
}
StarsRating.propTypes = {
  rating: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

export default StarsRating
