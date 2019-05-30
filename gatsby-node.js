const _kebabCase = require("lodash/kebabCase");
const _get = require("lodash/get");
const _uniq = require("lodash/uniq");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
              langKey
            }
            frontmatter {
              tags
              templateKey
              language
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach(edge => {
      const id = edge.node.id;
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
          language: edge.node.frontmatter.language
        }
      });
    });

    // Tag pages:
    let tags = [];
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags);
      }
    });
    // Eliminate duplicate tags
    tags = _uniq(tags);

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_kebabCase(tag)}/`;

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag
        }
      });
    });
  });
};

exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    // there has to be a better way
  //   const langKey = node.fields.langKey;
  //   const templateKey = node.frontmatter.templateKey;
  //   const data = await graphql(`
  //   {
  //     allMarkdownRemark(
  //       filter: {
  //         fields: {langKey: {ne: ${langKey}}},
  //         frontmatter: {templateKey: {eq: ${templateKey}}}
  //       }
  //     ) {
  //       edges {
  //         node {
  //           id
  //           fields {
  //             slug
  //           }
  //         }
  //       }
  //     }
  //   }
  // `);
  //   createNodeField({
  //     name: `translatedSlug`,
  //     node,
  //     data.edges[0].node.fields.slug
  //   });
  // }
};
