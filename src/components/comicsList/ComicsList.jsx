import './comicsList.scss';
import { Link } from 'react-router-dom';
import { getAllComics } from '../../marvelServices/services';
import { useState, useEffect } from 'react';
import Spiner from '../Spiner';
import AppHeader from '../appHeader/AppHeader';

const ComicsList = () => {
  const [active, setActive] = useState(null);
  const [comicsList, setComicsList] = useState([]);
  const [limit, setLimit] = useState(219);
  const [isLoading, setIsLoading] = useState(false);
  const [listEnded, setListEnded] = useState(false);


  const handleRequest = async () => {
    setIsLoading(true);
    setLimit(prev => prev + 14)

    const newList = await getAllComics(limit)
      .then((data) => {
        if (data) {
          console.log(data, 'data');
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

    setLimit(prev => prev + 14)
    getComics();
  }, []);

  return (
    <div className='app'>
      <AppHeader />

      <div className='comics__list'>
        <ul className='comics__grid'>
          {comicsList.length &&
            comicsList.map((el, i) => {
              return (
                <li key={i} className='comics__item'>
                  <Link to={`/comics/${el.id}`}>
                    <img
                      src={`${el.thumbnail.path}.${el.thumbnail.extension}`}
                      alt='ultimate war'
                      className='comics__item-img'
                    />
                    <div className='comics__item-name'>
                      {el.description || 'This comic havent description'}
                    </div>
                    <div className='comics__item-price'>
                      {el.prices[0].price}$
                    </div>
                  </Link>
                </li>
              );
            })}
        </ul>
        <button
          style={{ display: `${listEnded ? 'none' : 'block'}` }}
          disabled={isLoading}
          onClick={handleRequest}
          className='button button__main button__long'
        >
          <div className='inner'>{isLoading ? 'loading...':'load more'}</div>
        </button>
        <Link to='/' className='button button__main button__long'>
          <div className='inner'>back to main</div>
        </Link>
      </div>
    </div>
  );
};

export default ComicsList;
