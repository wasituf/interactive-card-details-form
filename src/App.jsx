import { useState } from 'react'
import Card from './components/Card'
import CardForm from './components/CardForm'
import ConfirmScreen from './components/ConfirmScreen'

const App = () => {
  const [confirmScreen, setConfirmScreen] = useState(false)

  const [cardInfo, setCardInfo] = useState({
    name: '',
    number: '',
    mm: '',
    yy: '',
    cvc: '',
  })

  const [errorState, setErrorState] = useState({
    name: false,
    number: false,
    mm: false,
    yy: false,
    cvc: false,
  })

  const handleInputChange = e => {
    switch (e.target.name) {
      case 'name':
        if (e.target.value.length > 24) return
        break

      case 'number':
        if (e.target.value.length > 16) return
        break

      case 'mm':
        if (
          e.target.value > 12 ||
          e.target.value.length > 2 ||
          e.target.value === '00'
        )
          return
        break

      case 'yy':
        if (e.target.value.length > 2 || e.target.value === '00') return
        break

      case 'cvc':
        if (e.target.value.length > 3) return
        break

      default:
        break
    }

    setErrorState({ ...errorState, [e.target.name]: false })
    const input = document.getElementsByName(e.target.name)[0]
    input.style.border = '1px solid hsl(270, 3%, 87%)'
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    const errorList = []

    for (const key in cardInfo) {
      if (cardInfo[key] === '') {
        errorList.push(key)
      } else if (
        key === 'number' &&
        cardInfo.number.length > 0 &&
        cardInfo.number.length < 16
      ) {
        errorList.push(key)
      } else if (key === 'cvc' && +cardInfo.cvc < 100) {
        errorList.push(key)
      } else if (cardInfo[key] === '0') {
        errorList.push(key)
      }
    }

    if (errorList.length) {
      let errStateList = { ...errorState }

      errorList.forEach(err => {
        const input = document.getElementsByName(err)[0]
        input.style.border = '1px solid #d65256'

        if (
          err === 'number' &&
          cardInfo.number.length > 0 &&
          cardInfo.number.length < 16
        ) {
          errStateList = { ...errStateList, [err]: 'short' }
        } else if (err === 'cvc' && +cardInfo.cvc < 100) {
          errStateList = { ...errStateList, [err]: 'short' }
        } else {
          errStateList = { ...errStateList, [err]: true }
        }
      })

      setErrorState({ ...errStateList })
    } else {
      setConfirmScreen(true)
    }
  }

  const handleReset = () => {
    setCardInfo({ name: '', number: '', mm: '', yy: '', cvc: '' })
    setErrorState({
      name: false,
      number: false,
      mm: false,
      yy: false,
      cvc: false,
    })
    setConfirmScreen(false)
  }

  return (
    <main>
      <div className='cards-container'>
        <Card cardInfo={cardInfo} side='front' />
        <Card cardInfo={cardInfo} side='back' />
      </div>
      {confirmScreen ? (
        <ConfirmScreen handleReset={handleReset} />
      ) : (
        <CardForm
          handleInputChange={handleInputChange}
          cardInfo={cardInfo}
          errorState={errorState}
          handleFormSubmit={handleFormSubmit}
        />
      )}
    </main>
  )
}
export default App
