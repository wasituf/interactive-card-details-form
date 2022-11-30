const Error = ({ short }) => {
  return (
    <p className='error-text'>
      {short ? 'Too short, not valid' : "Can't be blank"}
    </p>
  )
}
export default Error
