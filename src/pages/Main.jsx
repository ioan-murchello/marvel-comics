import AppHeader from '../components/appHeader/AppHeader';
import RandomChar from '../components/randomChar/RandomChar';
import CharList from '../components/charList/CharList';
import CharInfo from '../components/charInfo/CharInfo';
import '../style/style.scss';
import decoration from '../resources/img/vision.png';
import { useState, useEffect } from 'react';
import Error from '../components/Error/Error';

import { getResource } from '../marvelServices/services';

const Main = () => {
  const [list, setList] = useState([]);
  const [charInfo, setCharInfo] = useState(null);
  const [isClose, setIsClose] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    
    const getAll = async () => {
      getResource()
        .then((res) => {
           if(!res){
            setError(true)
            return
           }

            setList(res.data.results);
          
        })
        .catch((error) => {
          setError(true);
          console.log(error);
        });
    };

    getAll();
  }, []);
 
  return (
    <div className='app'>
      <AppHeader />
      <main>
        <RandomChar />
        <div className='char__content'>
          {error ? (
            <Error />
          ) : (
            <>
              <CharList
                setCharInfo={setCharInfo}
                list={list}
                setIsClose={setIsClose}
                error={error}
                setError={setError}
              />

              <CharInfo
                charInfo={charInfo}
                isClose={isClose}
                setIsClose={setIsClose}
              />
            </>
          )}
        </div>
        <img className='bg-decoration' src={decoration} alt='vision' />
      </main>
    </div>
  );
};
export default Main;
