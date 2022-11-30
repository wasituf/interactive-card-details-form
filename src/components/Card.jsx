import { useEffect } from 'react'
import Logo from '../images/card-logo.svg'

const Card = ({ side, cardInfo }) => {
  const { name, number, cvc, mm, yy } = cardInfo
  let forMM = mm < 10 && mm !== '00' && '0' + mm
  let forYY = mm < 10 && yy !== '00' && '0' + yy

  return (
    <div className={`card card-${side}`}>
      {side === 'front' ? (
        <>
          <img src={Logo} alt='Card Logo' />
          <h3 className='card-number'>
            {number !== ''
              ? number.replace(/\d{4}(?=.)/g, '$& ')
              : '0000 0000 0000 0000'}
          </h3>
          <div className='name-date-container'>
            <p>{name.toUpperCase() || 'JANE APPLESEED'}</p>
            <p>
              <span>{mm === '' || mm < 1 ? '00' : forMM}</span>/
              <span>{yy === '' || yy < 1 ? '00' : forYY}</span>
            </p>
          </div>
        </>
      ) : (
        <p>{cvc || '000'}</p>
      )}
    </div>
  )
}
export default Card
