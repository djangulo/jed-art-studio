import React from "react";
import Helmet from "react-helmet";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./all.sass";

import { IntlProvider } from "react-intl";
import "intl";

import "semantic-ui-css/semantic.min.css";

import {
  getLangs,
  getUrlForLang,
  getCurrentLangKey,
  isHomePage
} from "ptz-i18n";

const TemplateWrapper = props => {
  const { children, location } = props;
  const url = location.pathname;
  const isHome = isHomePage(url);

  const { langs, defaultLangKey } = props.data.site.siteMetadata.languages;
  const langKey = getCurrentLangKey(langs, defaultLangKey, url);

  const homeLink = `/`;
  const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url));

  const { menu } = props.data.site.siteMetadata;

  return (
    <div>
      <Helmet>
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
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default TemplateWrapper;
