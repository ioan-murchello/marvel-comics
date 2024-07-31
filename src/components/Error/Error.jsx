import errorImg from '../../resources/img/lock.svg'
import './error.scss'

const Error = ({errorText='some problem with server..'}) => {
  return (
    <div className='error__block'>
      <p className='error__title'>
        <b>Error // </b>
        {errorText}
      </p>
      <img className='error__img' src={errorImg} alt='error' />
    </div>
  );
}
export default Error