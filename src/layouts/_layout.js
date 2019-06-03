import React from 'react';
import Helmet from 'react-helmet';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import useSiteMetadata from '../components/useSiteMetadata';
import '../components/all.sass';

import 'semantic-ui-css/semantic.min.css';

import { IntlProvider } from 'react-intl';
import 'intl';
import { Location } from '@reach/router';
import {
  getLangs,
  getUrlForLang,
  getCurrentLangKey,
  isHomePage
} from 'ptz-i18n';
import useI18nPluginData from '../components/useI18nPluginData';

const TemplateWrapper = ({ children, i18nMessages, location }) => {
  const url = location.pathname;
  const isHome = isHomePage(url);
  const { langKeyDefault, prefixDefault } = useI18nPluginData();

  const {
    title,
    description,
    menu,
    languages: { langs, defaultLangKey }
  } = useSiteMetadata();
  const langKey = getCurrentLangKey(langs, defaultLangKey, url);

  const homeLink = prefixDefault ? `/${langKeyDefault}` : `/`;
  const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url));

  return (
    <IntlProvider locale={langKey} messages={i18nMessages}>
      <div>
        <Helmet>
          <html lang={langKey} />
          <title>{title}</title>
          <meta name="description" content={description} />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/img/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            href="/img/favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="/img/favicon-16x16.png"
            sizes="16x16"
          />

          <link
            rel="mask-icon"
            href="/img/safari-pinned-tab.svg"
            color="#ff4400"
          />
          <meta name="theme-color" content="#fff" />

          <meta property="og:type" content="business.business" />
          <meta property="og:title" content={title} />
          <meta property="og:url" content="/" />
          <meta property="og:image" content="/img/og-image.jpg" />
        </Helmet>
        <Navbar
          isHome={isHome}
          langs={langsMenu}
          homeLink={homeLink}
          url={url}
          menu={menu}
        />
        <div>{children}</div>
        <Footer />
      </div>
    </IntlProvider>
  );
};

export default props => (
  <Location>
    {locationProps => <TemplateWrapper {...locationProps} {...props} />}
  </Location>
);
