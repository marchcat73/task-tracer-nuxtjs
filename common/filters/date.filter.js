export default (value, type) => {
  const date = new Date(value)
  if (type === 'date') {
    return new Date(value).toLocaleDateString()
  } else if (type === 'time') {
    return date.toLocaleTimeString()
  } else {
    return date.toLocaleString()
  }
  
}