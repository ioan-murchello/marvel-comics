import '../components/comicsList/comicsList.scss';
import { Link } from 'react-router-dom';
import { getAllComics } from '../marvelServices/services';
import { useState, useEffect } from 'react';
import AppHeader from '../components/appHeader/AppHeader';
import Skeleton from '../components/skeleton/Skeleton';
import handleKeyDown from '../helpers';
import { useInfiniteQuery } from '@tanstack/react-query';
import Error from '../components/Error/Error';

const ComicsPage = () => {

    const fetchCharacters = async ({ pageParam }) => {
      const data = await getAllComics(pageParam);
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
      queryKey: ['comicsList'],
      queryFn: fetchCharacters,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < 14) {
          return null;
        }
        return pages.length * 14 + 210;
      },
    }); 

  const [active, setActive] = useState(null);
  const [comicsList, setComicsList] = useState([]);  

  useEffect(() => {
    if(data){
      const comics = data.pages.flat()
      setComicsList(comics)
    }
  },[isSuccess, data])
 

  return (
    <div className='app'>
      <AppHeader />
      {error ? (
        <Error />
      ) : (
        <div className='comics__list'>
          <ul className='comics__grid'>
            {comicsList.length > 0
              ? comicsList.map((el, i) => {
                  const comic = {
                    img: `${el.thumbnail.path}.${el.thumbnail.extension}`,
                    desc: el.description,
                    price:
                      el.prices[0].price === 0 ? '9.99' : el.prices[0].price,
                  };
                  return (
                    <li
                      onKeyDown={(e) => handleKeyDown(e, el.id, i, setActive)}
                      key={i}
                      className='comics__item'
                    >
                      <Link
                        className={`${
                          active === el.id ? 'char__item-selected' : ''
                        }`}
                        tabIndex={0}
                        to={`/comics/${el.id}`}
                      >
                        <img
                          src={comic.img}
                          alt='ultimate war'
                          className='comics__item-img'
                        />
                        <div className='comics__item-name'>
                          {comic.desc || 'This comic havent description'}
                        </div>
                        <div className='comics__item-price'>
                          {comic.price && `${comic.price}$`}
                        </div>
                      </Link>
                    </li>
                  );
                })
              : Array.from({ length: 14 }, (_, i) => {
                  return <Skeleton key={i} />;
                })}
          </ul>
          <button
            style={{ display: `${!hasNextPage ? 'none' : 'block'}` }}
            disabled={isFetchingNextPage}
            onClick={fetchNextPage}
            className='button button__main button__long'
          >
            <div className='inner'>
              {isFetchingNextPage ? 'loading...' : 'load more'}
            </div>
          </button>
          <Link to='/' className='button button__main button__long'>
            <div className='inner'>back to main</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ComicsPage;
