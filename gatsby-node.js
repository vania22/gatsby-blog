const { sluggify } = require("./src/utils/sluggify")
const { authors } = require("./src/templates/authors")
const path = require("path")

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const slugFromTitle = sluggify(node.frontmatter.title)
    createNodeField({
      node,
      name: "slug",
      value: slugFromTitle,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const singlePostTemplate = path.resolve("src/templates/single-post.js")

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              author
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) return Promise.reject(res.errors)

    const posts = res.data.allMarkdownRemark.edges

    posts.forEach(({ node }) => {
      createPage({
        path: `/post/${node.fields.slug}`,
        pathMatch: "/post/:slug",
        component: singlePostTemplate,
        context: {
          slug: node.fields.slug,
          // Find author image and pass it to the single post to display in the Sidebar
          authorImageUrl: authors.find(a => a.name === node.frontmatter.author)
            .imageUrl,
        },
      })
    })
  })
}
