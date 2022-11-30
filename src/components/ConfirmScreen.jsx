import ConfirmIcon from '../images/icon-complete.svg'

const ConfirmScreen = ({ handleReset }) => {
  return (
    <div className='confirm-container'>
      <img src={ConfirmIcon} alt='Confirmation Icon' />
      <h1>THANK YOU!</h1>
      <p>We've added your card details</p>
      <button className='continue-btn' onClick={handleReset}>
        Continue
      </button>
    </div>
  )
}
export default ConfirmScreen
