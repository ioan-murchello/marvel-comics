import { NavLink } from 'react-router-dom';
import './appHeader.scss';
import { useEffect, useRef } from 'react';

const AppHeader = () => {
  const headerRef = useRef(null);
  useEffect(() => {
    if (headerRef.current) {
      const headerHeight = headerRef.current.getBoundingClientRect().height;
      document.documentElement.style.setProperty(
        '--header-height',
        `${headerHeight}px`
      );
    }
  }, []);

  return (
    <header className='app__header' ref={headerRef}>
      <h1 className='app__title'>
        <a href='#'>
          <span>
            <strong>Marvel</strong>
          </span>{' '}
          information portal
        </a>
      </h1>
      <nav className='app__menu'>
        <ul>
          <li>
            <NavLink
              to='/'
              end
              style={({ isActive }) => ({
                color: isActive ? '#9f0013' : '',
              })}
            >
              Characters
            </NavLink>
          </li>
          /
          <li>
            <NavLink
              to='/comics'
              style={({ isActive }) => ({
                color: isActive ? '#9f0013' : '',
              })}
            >
              Comics
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
