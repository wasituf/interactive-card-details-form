import Error from './Error'

const CardForm = ({
  handleInputChange,
  cardInfo,
  errorState,
  handleFormSubmit,
}) => {
  const validateNumber = e => {
    if (['e', 'E', '+', '-'].includes(e.key)) e.preventDefault()
  }

  return (
    <form>
      <label htmlFor='name'>CARDHOLDER NAME</label>
      <input
        onChange={handleInputChange}
        name='name'
        type='text'
        maxLength={24}
        value={cardInfo.name}
        placeholder='e.g. Jane Appleseed'
      />
      {errorState.name && <Error />}

      <label htmlFor='number'>CARD NUMBER</label>
      <input
        onKeyDown={validateNumber}
        onChange={handleInputChange}
        type='number'
        name='number'
        maxLength={19}
        value={cardInfo?.number}
        placeholder='e.g. 1234 5678 9123 0000'
      />
      {errorState.number && <Error short={errorState.number === 'short'} />}

      <div className='form-bottom'>
        <div>
          <label id='exp-date'>EXP. DATE &#40;MM/YY&#41;</label>
          <div className='exp-div'>
            <div>
              <input
                onKeyDown={validateNumber}
                onChange={handleInputChange}
                type='number'
                name='mm'
                min={1}
                max={2}
                value={cardInfo?.mm}
                placeholder='MM'
                aria-labelledby='exp-date'
              />
              {errorState.mm && <Error />}
            </div>
            <div>
              <input
                onKeyDown={validateNumber}
                onChange={handleInputChange}
                type='number'
                name='yy'
                min={22}
                max={99}
                value={cardInfo?.yy}
                placeholder='YY'
                aria-labelledby='exp-date'
              />
              {errorState.yy && <Error />}
            </div>
          </div>
        </div>
        <div>
          <label htmlFor='cvc'>CVC</label>
          <input
            onKeyDown={validateNumber}
            onChange={handleInputChange}
            type='number'
            name='cvc'
            min={100}
            max={999}
            value={cardInfo?.cvc}
            placeholder='e.g. 123'
          />
          {errorState.cvc && <Error short={errorState.cvc === 'short'} />}
        </div>
      </div>

      <input onClick={handleFormSubmit} type='submit' value='Confirm' />
    </form>
  )
}
export default CardForm
