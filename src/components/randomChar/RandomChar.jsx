import '../randomChar/randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { useEffect, useState } from 'react';
import { getCharacter } from '../../marvelServices/services';
import Spiner from '../Spiner';
import Error from '../Error/Error';
import { useQuery } from '@tanstack/react-query';
 

const RandomChar = () => { 

  const {
    data,
    isSuccess,
    isError: queryError, 
  } = useQuery({
    queryKey: ['char'],
    queryFn: async () => {
      let res = await getCharacter(1011109);
      if (
        !res ||
        (res.data && res.data.results.length === 0) ||
        res.status === 404
      ) {
        res = await getCharacter(1011061 + 1);
        return res;
      }
      return res;
    }, 
  });

  const [char, setChar] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { name, description, thumbnail, urls } = char;
  //1011108 not founded char id for testing

  const generateRandomId = () => {
    return Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
  };

  const updateChar = async (retryLimit = 3) => {
    if (retryLimit <= 0) {
      setIsError(true);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setIsError(false);

    const id = generateRandomId();

    try {

      const res = await getCharacter(id);
      if (res === null || res.status === 404) {
        setIsLoading(true);
        await updateChar();
        setIsLoading(false);
      } else if (res.status === 401) {
        await updateChar(retryLimit - 1);
      } else {
        setChar(res.data.results[0]); 

        setIsLoading(false);
        setIsError(false);
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (data && data.data.results.length > 0) {
      setChar(data.data.results[0]);
    }
    setIsLoading(false);
  }, [data, isSuccess]);

  return (
    <div className='randomchar'>
      {isLoading || !isSuccess ? (
        <div className='randomchar__spiner-wrapper'>
          <Spiner />
        </div>
      ) : (
        <div className='randomchar__block'>
          {isError || queryError ? (
            <Error errorText='Char wos not found. Try again' />
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
        <button
          disabled={isLoading || !isSuccess}
          onClick={() => updateChar()}
          className='button button__main'
        >
          <div className='inner'>try it</div>
        </button>
        <img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
      </div>
    </div>
  );
};

export default RandomChar;

// import '../randomChar/randomChar.scss';
// import mjolnir from '../../resources/img/mjolnir.png';
// import { useEffect, useState } from 'react';
// import { getCharacter } from '../../marvelServices/services';
// import Spiner from '../Spiner';
// import Error from '../Error/Error';
// import { useQuery } from '@tanstack/react-query';

// const RandomChar = () => {
//   const [char, setChar] = useState({});
//   const [isError, setIsError] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const { name, description, thumbnail, urls } = char;

//   const {
//     data,
//     isSuccess,
//     isLoading: queryLoading,
//     isError: queryError,
//   } = useQuery({
//     queryKey: ['char'],
//     queryFn: async () => {
//       let res = await getCharacter(1011109);
//       if (!res || (res.data && res.data.results.length === 0)) {
//         throw new Error('Character not found');
//       }
//       return res;
//     },
//     retry: 3,
//     retryDelay: 1000,
//   });

//   console.log(queryError,'queryError')
//   // useEffect(() => {
//   //   if (queryError) {
//   //     setIsError(true);
//   //   } else {
//   //     setIsError(false);
//   //   }
//   // }, [queryError]);

//   useEffect(() => {
//     if (data && data.data.results.length > 0) {
//       setChar(data.data.results[0]);
//     }
//   }, [data, isSuccess]);

//   const generateRandomId = () => {
//     return Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
//   };

//   const updateChar = async (retryLimit = 3) => {
//     setIsLoading(true);
//     setIsError(false)

//     // if (retryLimit <= 0) {
//     //   setIsError(true);
//     //   return;
//     // }

//     const id = generateRandomId();

//     try {
//       const res = await getCharacter(id);
//       if (res === null || res.status === 404) {
//         await updateChar(retryLimit - 1);
//       }
//       setChar(res.data.results[0]);
//       setIsLoading(false)
//       setIsError(false)
//       queryClient.invalidateQueries(['char']);
//         return

//     } catch (error) {
//       setIsError(true);
//       setIsLoading(false)
//     }
//   };

//   return (
//     <div className='randomchar'>
//       {(queryLoading || isLoading) ? (
//         <div className='randomchar__spiner-wrapper'>
//           <Spiner />
//         </div>
//       ) : (
//         <div className='randomchar__block'>
//           {(isError || queryError) ? (
//             <Error errorText={'Char was not found.Try again later...'} />
//           ) : (
//             <>
//               <div className='randomchar__img-wrapper'>
//                 <img
//                   src={
//                     thumbnail
//                       ? `${thumbnail.path}.${thumbnail.extension}`
//                       : 'Not found'
//                   }
//                   alt={name}
//                   className='randomchar__img'
//                   style={{
//                     objectFit:
//                       char.thumbnail &&
//                       char.thumbnail.path ===
//                         'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
//                         ? 'contain'
//                         : 'cover',
//                   }}
//                 />
//               </div>
//               <div className='randomchar__info'>
//                 <p className='randomchar__name'>{name}</p>
//                 <p className='randomchar__descr'>
//                   {description
//                     ? `${description.slice(0, 140)}...`
//                     : "This char haven't description"}
//                 </p>
//                 <div className='randomchar__btns'>
//                   {urls && urls.length > 0 && (
//                     <>
//                       <a href={urls[0].url} className='button button__main'>
//                         <div className='inner'>homepage</div>
//                       </a>
//                       {urls.length > 1 && (
//                         <a
//                           href={urls[1].url}
//                           className='button button__secondary'
//                         >
//                           <div className='inner'>Wiki</div>
//                         </a>
//                       )}
//                     </>
//                   )}
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       )}

//       <div className='randomchar__static'>
//         <p className='randomchar__title'>
//           Random character for today!
//           <br />
//           Do you want to get to know him better?
//         </p>
//         <p className='randomchar__title'>Or choose another one</p>
//         <button
//           disabled={isLoading}
//           onClick={() => updateChar()}
//           className='button button__main'
//         >
//           <div className='inner'>try it</div>
//         </button>
//         <img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
//       </div>
//     </div>
//   );
// };

// export default RandomChar;
