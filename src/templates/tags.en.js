import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layouts/en';

import Tags from './_tags';

export default props => (
  <Layout>
    <Tags langKey="en" {...props} />
  </Layout>
);

export const tagPageQuery = graphql`
  query TagPageEn($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            langKey
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
