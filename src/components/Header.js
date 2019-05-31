import React from "react";
import PropTypes from "prop-types";
import Link from "./Link";
import Helmet from "react-helmet";
import Menu from "./Menu";
import styled from "@emotion/styled";
import SelectLanguage from "./SelectLanguage";
import { FormattedMessage } from "react-intl";

const Wrapper = styled.header``;

const Header = ({ menu, isHome, langs, langKey, homeLink, url }) => {
  return (
    <Wrapper isHome={isHome}>
      <FormattedMessage id='title'>
        {txt => (
          <Helmet defaultTitle={txt} titleTemplate={`%s | ${txt}`}>
            <html lang={langKey} />
            <title>{title}</title>
            <meta name='description' content={description} />

            <link
              rel='apple-touch-icon'
              sizes='180x180'
              href='/img/apple-touch-icon.png'
            />
            <link
              rel='icon'
              type='image/png'
              href='/img/favicon-32x32.png'
              sizes='32x32'
            />
            <link
              rel='icon'
              type='image/png'
              href='/img/favicon-16x16.png'
              sizes='16x16'
            />

            <link
              rel='mask-icon'
              href='/img/safari-pinned-tab.svg'
              color='#ff4400'
            />
            <meta name='theme-color' content='#fff' />

            <meta property='og:type' content='business.business' />
            <meta property='og:title' content={title} />
            <meta property='og:url' content='/' />
            <meta property='og:image' content='/img/og-image.jpg' />
          </Helmet>
        )}
      </FormattedMessage>
      <SelectLanguage langs={langs} className='select-languages' />
      <FormattedMessage id='header.title'>
        {title => (
          <Title to={homeLink} isHome={isHome} className='title'>
            {title}
            <FormattedMessage id='header.subTitle'>
              {subTitle => <SubTitle isHome={isHome}>{subTitle}</SubTitle>}
            </FormattedMessage>
          </Title>
        )}
      </FormattedMessage>
      <Menu menu={menu} url={url} />
    </Wrapper>
  );
};

Header.propTypes = {
  menu: PropTypes.array.isRequired,
  isHome: PropTypes.bool,
  langs: PropTypes.array,
  homeLink: PropTypes.string,
  url: PropTypes.string
};

export default Header;
