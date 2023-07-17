import PropTypes from 'prop-types'
import StarRatings from 'react-star-ratings'

function StarsRating({ rating, onRatingChange }) {
  return (
    <StarRatings
      rating={rating}
      starRatedColor='var(--tertiary-color-dark)'
      starHoverColor='var(--tertiary-color)'
      starDimension='27px'
      changeRating={onRatingChange}
      numberOfStars={5}
      name='rating'
    />
  )
}
StarsRating.propTypes = {
  rating: PropTypes.number.isRequired,
  onRatingChange: PropTypes.func.isRequired
}

export default StarsRating
