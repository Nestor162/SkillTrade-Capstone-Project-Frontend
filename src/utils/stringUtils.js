export function convertSnakeCaseToCapitalized(str) {
  return str
    .split('_')
    .map(word => word[0] + word.slice(1).toLowerCase())
    .join(' ')
}
