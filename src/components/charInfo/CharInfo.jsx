import './charInfo.scss';
import Skeleton from '../skeleton/Skeleton';
import Accordion from '../Accordion/Accordion'; 
import { useState, useEffect, useRef } from 'react';

const CharInfo = ({ charInfo, isClose, setIsClose }) => {
  const [char, setChar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSticky, setIsSticky] = useState(false); 
  const [width, setWidth] = useState(null)

  const charInfoRef = useRef(null);

  useEffect(() => {
    if (charInfo !== null) {
      setChar(charInfo);
    }
  }, [charInfo]);

  useEffect(() => {
    const handleScroll = () => {
      if (charInfoRef.current) {
        const headerHeight = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            '--header-height'
          )
        );
        const windowHeight =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        const windowWidth = window.innerWidth;

        setWidth(windowWidth);

        if (windowWidth <= 768 && windowHeight > 300) {
          setIsSticky(false);
        } else {
          setIsSticky(windowHeight > headerHeight); // 20 is an additional offset
        }

        if (windowWidth > 768) {
          setIsClose(false);
        }
      }
    };

    handleScroll();

    window.addEventListener('resize', handleScroll);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [char]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (charInfoRef.current) {
  //       const windowHeight =
  //         window.pageYOffset ||
  //         document.documentElement.scrollTop ||
  //         document.body.scrollTop; ;
  //       const windowWidth = window.innerWidth;

  //       setWidth(windowWidth)

  //       if (windowWidth <= 768 && windowHeight > 300) {
  //         setIsSticky(false);
  //       } else {
  //         setIsSticky(windowHeight > 300);
  //       }

  //       if(windowWidth > 768){
  //         setIsClose(false)
  //       }

  //     }
  //   };

  //   handleScroll();

  //   window.addEventListener('resize', handleScroll);
  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('resize', handleScroll);
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [char]);



  return (
    <div className={`char__info ${isSticky ? 'sticky' : ''}`} ref={charInfoRef} style={{display: `${width <= 768 && isClose ? 'grid' : ''}`}}>
      {isClose && <button tabIndex={0} onClick={() => setIsClose(false)} className='button__close'>x</button>}
      {!char && !isLoading && <Skeleton bool={true} />}
      {char && (
        <div className='char__wrapper'>
          <div className='char__basics'>
            <img
              style={{
                objectFit: `${
                  char.thumbnail.path ===
                  'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
                    ? 'contain'
                    : 'cover'
                }`,
              }}
              src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
              alt={char.name}
            />
            <div className='char__info-wrapper'>
              <div className='char__info-name'>{char.name}</div>
              <div className='char__btns'>
                <a href={char.urls[0].url} className='button button__main'>
                  <div className='inner'>homepage</div>
                </a>
                <a href={char.urls[1].url} className='button button__secondary'>
                  <div className='inner'>Wiki</div>
                </a>
              </div>
            </div>
          </div>
          <div className='char__descr'>
            {char.description || "This character doesn't have a description"}
          </div>
          <div className='char__comics'>Comics</div>
          <ul className='char__comics-list'>
            {char.comics.items.length > 0
              ? char.comics.items.slice(0, 5).map((comic, idx) => (
                  <li key={idx} className='char__comics-item'>
                    {comic.name}
                  </li>
                ))
              : 'No comics available for this character'}
          </ul>
          <Accordion title='More Comics'>
            <ul className='char__comics-list'>
              {char.comics.items.length > 0
                ? char.comics.items.slice(5).map((series, idx) => (
                    <li key={idx} className='char__comics-item'>
                      {series.name}
                    </li>
                  ))
                : 'No comics available for this character'}
            </ul>
          </Accordion>

          <Accordion title='Series'>
            <ul className='char__comics-list'>
              {char.series.items.length > 0
                ? char.series.items.map((series, idx) => (
                    <li key={idx} className='char__comics-item'>
                      {series.name}
                    </li>
                  ))
                : 'No series available for this character'}
            </ul>
          </Accordion>
        </div>
      )}
    </div>
  );
};

export default CharInfo;
