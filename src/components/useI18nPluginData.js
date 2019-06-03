import { graphql, useStaticQuery } from 'gatsby';

const useI18nPluginData = () => {
  const { sitePlugin } = useStaticQuery(
    graphql`
      query I18N_PLUGIN_QUERY {
        sitePlugin(name: { eq: "gatsby-plugin-i18n" }) {
          pluginOptions {
            langKeyDefault
            prefixDefault
          }
        }
      }
    `
  );
  return sitePlugin.pluginOptions;
};

export default useI18nPluginData;
