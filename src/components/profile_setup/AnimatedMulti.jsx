import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import PropTypes from 'prop-types'
const animatedComponents = makeAnimated()

function AnimatedMulti({ options, onChange, invalidStyle }) {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
      onChange={onChange}
      className={invalidStyle}
      menuPlacement='auto'
    />
  )
}

AnimatedMulti.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  invalidStyle: PropTypes.string
}

export default AnimatedMulti
