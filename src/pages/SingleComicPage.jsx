import './singleComicPage.scss';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getComic } from '../marvelServices/services';
import AppHeader from '../components/appHeader/AppHeader'; 
import Skeleton from '../components/skeleton/Skeleton'
import Error from '../components/Error/Error';
import { useQuery } from '@tanstack/react-query';

const SingleComicPage = () => {
  const { comicId } = useParams();

  const {data, isSuccess, isError, isPending} = useQuery({
    queryKey: ['comic', comicId],
    queryFn: () => getComic(comicId)
  }) 
  const [comic, setComic] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      setComic(data.data.results[0]);
    }
  }, [comic, comicId, isSuccess]);
  

  if(!comic){
    return <div className='app'>
      <AppHeader/>
      <Skeleton/>
    </div>
  }
  
  return (
    <div className='app'>
      <AppHeader />
      {isError && <Error />}
      {isPending ? (
        <Skeleton />
      ) : (
        <div className='single-comic'>
          <img
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.title}
            className='single-comic__img'
          />
          <div className='single-comic__info'>
            <h2 className='single-comic__name'>{comic.title}</h2>
            <p className='single-comic__descr'>
              {comic.description || "This comic doesn't have a description"}
            </p>
            <p className='single-comic__descr'>{comic.pageCount} pages</p>
            <p className='single-comic__descr'>Language: en-us</p>
            <div className='single-comic__price'>
              {comic.prices[0].price === 0 ? '9.99' : comic.prices[0].price}$
            </div>
          </div>
          <Link to='/comics' className='single-comic__back'>
            Back to all
          </Link>
        </div>
      )}
    </div>
  );
};

export default SingleComicPage;
