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
          language: edge.node.frontmatter.language,
          templateKey: edge.node.frontmatter.templateKey
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

exports.onCreateNode = async ({ node }) => {
  fmImagesToRelative(node); // convert image paths for gatsby images
};

exports.sourceNodes = ({ actions, getNodes }) => {
  const { createNodeField } = actions;
  const allNodes = getNodes();

  allNodes.forEach(async node => {
    if (node.internal.type === `MarkdownRemark`) {
      switch (node.frontmatter.templateKey) {
        case "blog-post":
          if (node.frontmatter.translatedSlug)
            createNodeField({
              name: `translatedSlug`,
              node,
              value: node.frontmatter.translatedSlug
            });
          break;
        default:
          const sisterNode = allNodes.find(
            n =>
              n.fields &&
              n.fields.langKey !== node.fields.langKey &&
              n.frontmatter &&
              n.frontmatter.templateKey === node.frontmatter.templateKey
          );
          if (sisterNode && sisterNode.fields && sisterNode.fields.slug) {
            createNodeField({
              name: `translatedSlug`,
              node,
              value: sisterNode.fields.slug
            });
            console.log(node.fields.slug + " -> " + sisterNode.fields.slug);
          } else {
            console.log(sisterNode);
          }
      }
      // console.log(node.frontmatter.templateKey);
      // console.log(node.fields);
      // console.log(sisterNodes);
    }
  });
};
