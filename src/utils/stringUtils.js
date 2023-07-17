export function convertSnakeCaseToCapitalized(str) {
  return str
    .split('_')
    .map(word => word[0] + word.slice(1).toLowerCase())
    .join(' ')
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString()
}

export function getAge(dateString) {
  var today = new Date()
  var birthDate = new Date(dateString)
  var age = today.getFullYear() - birthDate.getFullYear()
  var m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}
