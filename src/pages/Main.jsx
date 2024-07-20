import AppHeader from '../components/appHeader/AppHeader';
import RandomChar from '../components/randomChar/RandomChar';
import CharList from '../components/charList/CharList';
import CharInfo from '../components/charInfo/CharInfo';
import '../style/style.scss';
import decoration from '../resources/img/vision.png';
import { useState } from 'react'; 

const Main = () => {
  const [charInfo, setCharInfo] = useState(null);
  const [isClose, setIsClose] = useState(false); 
  
  return (
    <div className='app'>
      <AppHeader />
      <main>
        <RandomChar />
        <div className='char__content'>
          <CharList setCharInfo={setCharInfo} setIsClose={setIsClose} />

          <CharInfo
            charInfo={charInfo}
            isClose={isClose}
            setIsClose={setIsClose}
          />
        </div>
        <img className='bg-decoration' src={decoration} alt='vision' />
      </main>
    </div>
  );
};
export default Main;
