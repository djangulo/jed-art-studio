import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import logo from '../img/logo.svg';

const Navbar = props => {
  const [state, setState] = React.useState({
    active: false,
    navBarActiveClass: ''
  });
  console.log(JSON.stringify(props, null, 2));

  const toggleHamburger = () =>
    setState({
      active: !state.active,
      navBarActiveClass: state.active ? 'is-active' : ''
    });

  const data = useStaticQuery(graphql`
    query NavbarQuery($id: String!) {
      markdownRemark(id: { eq: ${props.id} }) {
        fields {
          langKey
          slug
          translatedSlug
        }
      }
    }
  `);

  return (
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link
            to={`/${data.fields.langKey}/`}
            className="navbar-item"
            title="Logo"
          >
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
          <div className="navbar-start has-text-centered">
            <Link className="navbar-item" to={`/${data.fields.langKey}/about`}>
              About
            </Link>
            <Link
              className="navbar-item"
              to={`/${data.fields.langKey}/products`}
            >
              Products
            </Link>
            <Link className="navbar-item" to={`/${data.fields.langKey}/blog`}>
              Blog
            </Link>
            <Link
              className="navbar-item"
              to={`/${data.fields.langKey}/contact`}
            >
              Contact
            </Link>
            <Link
              className="navbar-item"
              to={`/${data.fields.langKey}/contact/examples`}
            >
              Form Examples
            </Link>
          </div>
          <div className="navbar-end has-text-centered">
            <Link className="navbar-item" to={data.fields.slug}>
              {data.fields.langKey}
            </Link>
            <Link className="navbar-item" to={data.fields.translatedSlug}>
              {data.fields.langKey === 'en' ? 'es' : 'en  '}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
