import { useState } from 'react'
import { Badge } from 'react-bootstrap'
import PropTypes from 'prop-types'

function SingleInterestBadge({ name, onSelect }) {
  const [selected, setSelected] = useState(false)
  return (
    <Badge
      className={selected ? 'badge-primary-selected m-1 p-2' : 'badge-primary m-1 p-2 fs-6'}
      onClick={() => {
        setSelected(!selected)
        onSelect(name)
      }}
    >
      {name}
    </Badge>
  )
}

SingleInterestBadge.propTypes = {
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default SingleInterestBadge
