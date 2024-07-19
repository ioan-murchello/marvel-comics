import { useEffect, useState } from 'react';
import './charList.scss';
import Skeleton from '../skeleton/Skeleton';
import { onRequest } from '../../marvelServices/services';
import handleKeyDown from '../../helpers';

const CharList = ({ list, setCharInfo, setIsClose, error, setError }) => {
   
  const [active, setActive] = useState(null);
  const [charList, setCharList] = useState(list);
  const [limit, setLimit] = useState(219);
  const [isLoading, setIsLoading] = useState(false);
  const [listEnded, setListEnded] = useState(false); 

  const handleSelectChar = (id, index) => {
    let char = charList.find((el) => el.id === id);

    setCharInfo(char);
    setActive(index);

     
    if (window.innerWidth <= 768) {
      setIsClose(true);
    } else {
      setIsClose(false);
    }
  };

   const handleRequest = async () => {
     setError(false);
     setIsLoading(true);

     try {
       const data = await onRequest(limit);
       if (data && data.data.results) {
         const newList = data.data.results;
         setCharList((prev) => [...prev, ...newList]);

         if (newList.length < 9) {
           setListEnded(true);
         }

         setLimit((prev) => prev + 9);
       } else {
         setListEnded(true);
       }
     } catch (error) {
       console.error(error);
       setError(true);
     } finally {
       setIsLoading(false);
     }
   };

  useEffect(() => {
    setCharList(list);
  }, [list]);
 

  const skeletonList = (
    <div className='char__list'>
      <ul className='char__grid'>
        {Array.from({ length: 9 }).map((_, index) => {
          return (
            <li key={index}>
              <Skeleton />
            </li>
          );
        })}
      </ul>
    </div>
  );



  if (!charList.length) {
    return skeletonList;
  }
  return (
    <div className='char__list'>
      {!charList.length && error ? (
        <Error />
      ) : (
        <>
          <ul className='char__grid'>
            {charList.length &&
              charList.map((el, index) => {
                let notFound =
                  el.thumbnail.path ===
                  'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available';
                return (
                  <li
                    tabIndex={0}
                    onClick={() => handleSelectChar(el.id, index)}
                    onKeyDown={(e) =>
                      handleKeyDown(e, el.id, index, handleSelectChar)
                    }
                    key={el.id}
                    className={`char__item ${
                      active === index ? 'char__item_selected' : ''
                    }`}
                  >
                    <img
                      src={`${el.thumbnail.path}.${el.thumbnail.extension}`}
                      alt='abyss'
                      style={{ objectFit: `${notFound ? 'contain' : 'cover'}` }}
                    />
                    <div className='char__name'>{el.name}</div>
                  </li>
                );
              })}
          </ul>
          <button
            disabled={isLoading}
            onClick={handleRequest}
            className='button button__main button__long'
            style={{ display: listEnded ? 'none' : 'block' }}
          >
            <div className='inner'>
              {isLoading ? 'loading...' : 'load more'}
            </div>
          </button>
        </>
      )}
    </div>
  );
};

export default CharList;
