import '../components/comicsList/comicsList.scss';
import { Link } from 'react-router-dom';
import { getAllComics } from '../marvelServices/services';
import { useState, useEffect } from 'react';
import AppHeader from '../components/appHeader/AppHeader';
import Skeleton from '../components/skeleton/Skeleton';
import handleKeyDown from '../helpers';

const ComicsPage = () => {
  const [active, setActive] = useState(null);
  const [comicsList, setComicsList] = useState([]);
  const [limit, setLimit] = useState(219);
  const [isLoading, setIsLoading] = useState(false);
  const [listEnded, setListEnded] = useState(false);

  const handleRequest = async () => {
    setIsLoading(true);
    setLimit((prev) => prev + 14);

    const newList = await getAllComics(limit)
      .then((data) => {
        if (data) {
          return data.data.results;
        }
      })
      .catch((error) => console.log(error));

    if (newList.length < 14) {
      setListEnded(true);
    } else {
      setListEnded(false);
    }

    setComicsList((prev) => {
      return [...prev, ...newList];
    });
    setIsLoading(false);
  };

  useEffect(() => {
    const getComics = async () => {
      setIsLoading(true);

      try {
        const newList = await getAllComics(limit);
        const results = newList.data.results;

        if (results.length < 14) {
          setListEnded(true);
        } else {
          setListEnded(false);
        }

        setComicsList(results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getComics();
    setLimit((prev) => prev + 14);
  }, []);

  return (
    <div className='app'>
      <AppHeader />

      <div className='comics__list'>
        <ul className='comics__grid'>
          {comicsList.length > 0
            ? comicsList.map((el, i) => {
                const comic = {
                  img: `${el.thumbnail.path}.${el.thumbnail.extension}`,
                  desc: el.description,
                  price: el.prices[0].price === 0 ? '9.99' : el.prices[0].price,
                };
                return (
                  <li
                    onKeyDown={(e) => handleKeyDown(e, el.id, i, setActive)}
                    key={i}
                    className='comics__item'
                  >
                    <Link className={`${active === el.id ? 'char__item-selected': ''}`} tabIndex={0} to={`/comics/${el.id}`}>
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
          style={{ display: `${listEnded ? 'none' : 'block'}` }}
          disabled={isLoading}
          onClick={handleRequest}
          className='button button__main button__long'
        >
          <div className='inner'>{isLoading ? 'loading...' : 'load more'}</div>
        </button>
        <Link to='/' className='button button__main button__long'>
          <div className='inner'>back to main</div>
        </Link>
      </div>
    </div>
  );
};

export default ComicsPage;
