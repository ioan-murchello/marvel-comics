import './404.scss'
import AppHeader from '../components/appHeader/AppHeader';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='app'>
      <AppHeader />
      <div className='not-found'>
        <h1 className='not-found__title'>404</h1>
        <p className='not-found__message'>Page Not Found</p>
        <Link to='/' className='button  not-found__button'>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
export default NotFound;