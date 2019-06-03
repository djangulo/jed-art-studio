import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import { FormattedMessage } from 'react-intl';

const Tags = ({ data, pageContext, langKey }) => {
  const posts = data.allMarkdownRemark.edges;
  const postLinks = posts.map(post => (
    <li key={post.node.fields.slug}>
      <Link to={post.node.fields.slug}>
        <h2 className="is-size-2">{post.node.frontmatter.title}</h2>
      </Link>
    </li>
  ));
  const tag = pageContext.tag;
  return (
    <section className="section">
      <Helmet>
        <FormattedMessage id="title">
          {title => (
            <title>
              `${tag} | ${title}`
            </title>
          )}
        </FormattedMessage>
      </Helmet>
      <div className="container content">
        <div className="columns">
          <div
            className="column is-10 is-offset-1"
            style={{ marginBottom: '6rem' }}
          >
            <FormattedMessage
              id="tags.nPostsTaggedWith"
              values={{ nPosts: data.allMarkdownRemark.totalCount }}
            >
              {txt => <h3 className="title is-size-4 is-bold-light">{txt}</h3>}
            </FormattedMessage>
            <ul className="taglist">{postLinks}</ul>
            <p>
              <FormattedMessage id="tags.allTagsLink">
                {txt => <Link to={`/${langKey}/tags/`}>{txt}</Link>}
              </FormattedMessage>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tags;
