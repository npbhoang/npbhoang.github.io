import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { navLinks } from '@config';
import { KEY_CODES } from '@utils';
import { useOnClickOutside } from '@hooks';
import { useTheme } from '../context/ThemeContext';

const StyledMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const StyledHamburgerButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.flexCenter};
    position: relative;
    z-index: 10;
    margin-right: -15px;
    padding: 15px;
    border: 0;
    background-color: transparent;
    color: inherit;
    text-transform: none;
    transition-timing-function: linear;
    transition-duration: 0.15s;
    transition-property: opacity, filter;
  }

  .ham-box {
    display: inline-block;
    position: relative;
    width: var(--hamburger-width);
    height: 24px;
  }

  .ham-box-inner {
    position: absolute;
    top: 50%;
    right: 0;
    width: var(--hamburger-width);
    height: 2px;
    border-radius: var(--border-radius);
    background-color: var(--green);
    transition-duration: 0.22s;
    transition-property: transform;
    transition-delay: ${props => (props.menuOpen ? `0.12s` : `0s`)};
    transform: rotate(${props => (props.menuOpen ? `225deg` : `0deg`)});
    transition-timing-function: cubic-bezier(
      ${props => (props.menuOpen ? `0.215, 0.61, 0.355, 1` : `0.55, 0.055, 0.675, 0.19`)}
    );
    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      left: auto;
      right: 0;
      width: var(--hamburger-width);
      height: 2px;
      border-radius: 4px;
      background-color: var(--green);
      transition-timing-function: ease;
      transition-duration: 0.15s;
      transition-property: transform;
    }
    &:before {
      width: ${props => (props.menuOpen ? `100%` : `120%`)};
      top: ${props => (props.menuOpen ? `0` : `-10px`)};
      opacity: ${props => (props.menuOpen ? 0 : 1)};
      transition: ${({ menuOpen }) =>
    menuOpen ? 'var(--ham-before-active)' : 'var(--ham-before)'};
    }
    &:after {
      width: ${props => (props.menuOpen ? `100%` : `80%`)};
      bottom: ${props => (props.menuOpen ? `0` : `-10px`)};
      transform: rotate(${props => (props.menuOpen ? `-90deg` : `0`)});
      transition: ${({ menuOpen }) => (menuOpen ? 'var(--ham-after-active)' : 'var(--ham-after)')};
    }
  }
`;

const StyledSidebar = styled.aside`
  display: none;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.flexCenter};
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    padding: 50px 10px;
    width: min(75vw, 400px);
    height: 100vh;
    outline: 0;
    background-color: var(--light-navy);
    box-shadow: -10px 0px 30px -15px var(--navy-shadow);
    z-index: 9;
    transform: translateX(${props => (props.menuOpen ? 0 : 100)}vw);
    visibility: ${props => (props.menuOpen ? 'visible' : 'hidden')};
    transition: var(--transition);
  }

  nav {
    ${({ theme }) => theme.mixins.flexBetween};
    width: 100%;
    flex-direction: column;
    color: var(--lightest-slate);
    font-family: var(--font-mono);
    text-align: center;
  }

  ol {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;

    li {
      position: relative;
      margin: 0 auto 20px;
      counter-increment: item 1;
      font-size: clamp(var(--fz-sm), 4vw, var(--fz-lg));

      @media (max-width: 600px) {
        margin: 0 auto 10px;
      }

      &:before {
        content: '0' counter(item) '.';
        display: block;
        margin-bottom: 5px;
        color: var(--green);
        font-size: var(--fz-sm);
      }
    }

    a {
      ${({ theme }) => theme.mixins.link};
      width: 100%;
      padding: 3px 20px 20px;
    }
  }

  .resume-link {
    ${({ theme }) => theme.mixins.bigButton};
    padding: 18px 50px;
    margin: 10% auto 0;
    width: max-content;
  }
`;

const StyledThemeToggle = styled.button`
  background: none;
  border: 1px solid var(--green);
  border-radius: var(--border-radius);
  color: var(--green);
  cursor: pointer;
  padding: 12px 24px;
  margin: 20px auto 0;
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  display: flex;
  align-items: center;
  gap: 8px;
  transition: var(--transition);

  &:hover {
    background-color: var(--green-tint);
  }

  svg {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const buttonRef = useRef(null);
  const navRef = useRef(null);

  let menuFocusables;
  let firstFocusableEl;
  let lastFocusableEl;

  const setFocusables = () => {
    menuFocusables = [buttonRef.current, ...Array.from(navRef.current.querySelectorAll('a'))];
    firstFocusableEl = menuFocusables[0];
    lastFocusableEl = menuFocusables[menuFocusables.length - 1];
  };

  const handleBackwardTab = e => {
    if (document.activeElement === firstFocusableEl) {
      e.preventDefault();
      lastFocusableEl.focus();
    }
  };

  const handleForwardTab = e => {
    if (document.activeElement === lastFocusableEl) {
      e.preventDefault();
      firstFocusableEl.focus();
    }
  };

  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ESCAPE:
      case KEY_CODES.ESCAPE_IE11: {
        setMenuOpen(false);
        break;
      }

      case KEY_CODES.TAB: {
        if (menuFocusables && menuFocusables.length === 1) {
          e.preventDefault();
          break;
        }
        if (e.shiftKey) {
          handleBackwardTab(e);
        } else {
          handleForwardTab(e);
        }
        break;
      }

      default: {
        break;
      }
    }
  };

  const onResize = e => {
    if (e.currentTarget.innerWidth > 768) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);

    setFocusables();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const wrapperRef = useRef();
  useOnClickOutside(wrapperRef, () => setMenuOpen(false));

  return (
    <StyledMenu>
      <Helmet>
        <body className={menuOpen ? 'blur' : ''} />
      </Helmet>

      <div ref={wrapperRef}>
        <StyledHamburgerButton
          onClick={toggleMenu}
          menuOpen={menuOpen}
          ref={buttonRef}
          aria-label="Menu">
          <div className="ham-box">
            <div className="ham-box-inner" />
          </div>
        </StyledHamburgerButton>

        <StyledSidebar menuOpen={menuOpen} aria-hidden={!menuOpen} tabIndex={menuOpen ? 1 : -1}>
          <nav ref={navRef}>
            {navLinks && (
              <ol>
                {navLinks.map(({ url, name }, i) => (
                  <li key={i}>
                    <Link to={url} onClick={() => setMenuOpen(false)}>
                      {name}
                    </Link>
                  </li>
                ))}
              </ol>
            )}

            <a href="/resume.pdf" className="resume-link">
              Resume
            </a>

            <StyledThemeToggle
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
              {isDark ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                  Light Mode
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                  Dark Mode
                </>
              )}
            </StyledThemeToggle>
          </nav>
        </StyledSidebar>
      </div>
    </StyledMenu>
  );
};

export default Menu;
