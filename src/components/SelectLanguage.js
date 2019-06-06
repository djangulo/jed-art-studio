import React from "react";
import PropTypes from "prop-types";
import { Flag } from "semantic-ui-react";
import styled from "@emotion/styled";
import { Link } from "gatsby";

const Nav = styled.nav``;

const Ul = styled.ul``;

const Li = styled.li``;

const getIcon = langKey => {
  switch (langKey) {
    case "en":
      return <Flag name='us' />;
    case "es":
      return <Flag name='do' />;
    default:
      return null;
  }
};

const SelectLanguage = props => {
  const links = props.langs.map(lang => (
    <Link to={lang.link} key={lang.langKey}>
      <Li selected={lang.selected}>{getIcon(lang.langKey)}</Li>
    </Link>
  ));

  return (
    <Nav {...props}>
      <Ul>{links}</Ul>
    </Nav>
  );
};

SelectLanguage.propTypes = {
  langs: PropTypes.array
};

export default SelectLanguage;
