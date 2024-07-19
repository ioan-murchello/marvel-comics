import errorImg from '../../resources/img/lock.svg'
import './error.scss'

const Error = () => {
  return (
    <div className='error__block'>
        <p className='error__title'><b>Error </b>Some problem with server...</p>
        <img className='error__img' src={errorImg} alt="error" />
    </div>
  )
}
export default Error