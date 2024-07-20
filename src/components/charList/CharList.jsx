import { useEffect, useState } from 'react';
import './charList.scss';
import Skeleton from '../skeleton/Skeleton';
import { onRequest } from '../../marvelServices/services';
import handleKeyDown from '../../helpers';
import { useInfiniteQuery } from '@tanstack/react-query';
import Error from '../Error/Error';

const CharList = ({ setCharInfo, setIsClose }) => {
  const fetchCharacters = async ({ pageParam }) => {
    const data = await onRequest(pageParam);
    return data.data.results;
  };

  const {
    data,
    isSuccess,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['charList'],
    queryFn: fetchCharacters,
    getNextPageParam: (lastPage, pages) => { 
      if (lastPage.length < 9) {
        return null;
      } 
      return pages.length * 9 + 210;
    },
  });

  const [active, setActive] = useState(null);
  const [charList, setCharList] = useState([]);

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

  useEffect(() => {
    if (isSuccess) {
      const list = data.pages.flat();
      setCharList(list);
    }
  }, [data, isSuccess]);

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
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className='button button__main button__long'
            style={{ display: !hasNextPage ? 'none' : 'block' }}
          >
            <div className='inner'>
              {isFetchingNextPage ? 'loading...' : 'load more'}
            </div>
          </button>
        </>
      )}
    </div>
  );
};

export default CharList;
