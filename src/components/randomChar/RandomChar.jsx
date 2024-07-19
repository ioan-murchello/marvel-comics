import '../randomChar/randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { useEffect, useState } from 'react';
import { getCharacter } from '../../marvelServices/services';
import Spiner from '../Spiner';
import Error from '../Error/Error';

const RandomChar = () => {
  const [char, setChar] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { name, description, thumbnail, urls } = char;
 
   const generateRandomId = () => {
     return Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
   };

   const updateChar = async (retryLimit = 5) => {
     if (retryLimit <= 0) {
       setError(true);
       setIsLoading(false);
       return;
     }

     setIsLoading(true);
     setError(false);

     const id = generateRandomId();

     try {
       const res = await getCharacter(id);
       if (res === null || res.status === 404 || res.status === 401) {
         await updateChar(retryLimit - 1); 
       } else {
         setChar(res.data.results[0]);
         setIsLoading(false);
       }
     } catch (error) {
       setError(true);
       setIsLoading(false);
     }
   };

   useEffect(() => {
     const initialChar = async () => {
       setIsLoading(true);
       try {
         const res = await getCharacter(1011052);
         if (res && res.data.results.length > 0) {
           setChar(res.data.results[0]);
         } else {
           await updateChar();
         }
         setIsLoading(false);
       } catch (error) {
         setError(true);
         setIsLoading(false);
       }
     };

     initialChar();
   }, []);
 

  return (
    <div className='randomchar'>
      
      {isLoading ? (
        <Spiner />
      ) : (
        <div className='randomchar__block'>
          {error ? (
              <Error/>  
          ) : (
            <>
              <div className='randomchar__img-wrapper'>
                <img
                  src={
                    thumbnail
                      ? `${thumbnail.path}.${thumbnail.extension}`
                      : 'Not found'
                  }
                  alt={name}
                  className='randomchar__img'
                  style={{
                    objectFit:
                      char.thumbnail &&
                      char.thumbnail.path ===
                        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
                        ? 'contain'
                        : 'cover',
                  }}
                />
              </div>
              <div className='randomchar__info'>
                <p className='randomchar__name'>{name}</p>
                <p className='randomchar__descr'>
                  {description
                    ? `${description.slice(0, 140)}...`
                    : "This char haven't description"}
                </p>
                <div className='randomchar__btns'>
                  {urls && urls.length > 0 && (
                    <>
                      <a href={urls[0].url} className='button button__main'>
                        <div className='inner'>homepage</div>
                      </a>
                      {urls.length > 1 && (
                        <a
                          href={urls[1].url}
                          className='button button__secondary'
                        >
                          <div className='inner'>Wiki</div>
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <div className='randomchar__static'>
        <p className='randomchar__title'>
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className='randomchar__title'>Or choose another one</p>
        <button onClick={() => updateChar()} className='button button__main'>
          <div className='inner'>try it</div>
        </button>
        <img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
      </div>
    </div>
  );
};

export default RandomChar;
