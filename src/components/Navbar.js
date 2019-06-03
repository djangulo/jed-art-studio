import React from 'react';
import { Link } from 'gatsby';
import logo from '../img/logo.svg';
import SelectLanguage from './SelectLanguage';
import Menu from './Menu';

const Navbar = ({ menu, isHome, langs, homeLink, url }) => {
  const [state, setState] = React.useState({
    active: false,
    navBarActiveClass: ''
  });

  const toggleHamburger = () =>
    setState({
      active: !state.active,
      navBarActiveClass: state.active ? 'is-active' : ''
    });

  // const data = useStaticQuery(graphql`
  //   query NavbarQuery($id: String!) {
  //     markdownRemark(id: { eq: ${props.id} }) {
  //       fields {
  //         langKey
  //         slug
  //         translatedSlug
  //       }
  //     }
  //   }
  // `);

  return (
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to={homeLink} className="navbar-item" title="Logo">
            <img src={logo} alt="Kaldi" style={{ width: '88px' }} />
          </Link>
          {/* Hamburger menu */}
          <div
            className={`navbar-burger burger ${state.navBarActiveClass}`}
            data-target="navMenu"
            onClick={() => toggleHamburger()}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div id="navMenu" className={`navbar-menu ${state.navBarActiveClass}`}>
          <Menu menu={menu} url={url} />
          <div className="navbar-end has-text-centered">
            <SelectLanguage langs={langs} className="select-language" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
