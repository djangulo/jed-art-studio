import React from 'react';
import { Link } from 'gatsby';
import { injectIntl, FormattedMessage } from 'react-intl';
import endsWith from 'lodash/endsWith';
import useI18nPluginData from './useI18nPluginData';

const Menu = ({ menu, url, intl }) => {
  const { langKeyDefault, prefixDefault } = useI18nPluginData();
  const getMenuItems = (isSelected, menu, langKey) =>
    menu.map(item => {
      const slug =
        langKey === langKeyDefault && !prefixDefault
          ? `${item.slug}`
          : `/${langKey}${item.slug}`;

      const subItems = item.items ? (
        <ul>{getMenuItems(isSelected, item.items, langKey)}</ul>
      ) : null;

      return (
        <div key={item.slug}>
          <FormattedMessage id={item.label}>
            {label =>
              item.link ? (
                <a target="_blank" rel="noopener noreferrer" href={item.link}>
                  {label}
                </a>
              ) : (
                <Link className="navbar-item" to={slug}>
                  {label}
                </Link>
              )
            }
          </FormattedMessage>
          {subItems}
        </div>
      );
    });

  const isSelected = endsWith(url);
  const menuItems = getMenuItems(isSelected, menu, intl.locale);

  return <div className="navbar-start has-text-centered">{menuItems}</div>;
};

export default injectIntl(Menu);
