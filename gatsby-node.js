const path = require("path")
const _ = require("lodash")

const { sluggify } = require("./src/utils/sluggify")
const { authors } = require("./src/templates/authors")

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
  const templates = {
    singlePost: path.resolve("src/templates/single-post.js"),
    tagsPage: path.resolve("src/templates/all-tags-page.js"),
    tagPage: path.resolve("src/templates/tag-page.js"),
    postList: path.resolve("src/templates/posts-list.js"),
  }

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              author
              tags
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
        component: templates.singlePost,
        context: {
          slug: node.fields.slug,
          // Find author image and pass it to the single post to display in the Sidebar
          authorImageUrl:
            "authors/" +
            authors.find(a => a.name === node.frontmatter.author).imageUrl,
        },
      })
    })

    let tags = []
    let tagPostCount = {}

    // Collect all the tags from posts and put them into tags array
    _.each(posts, edges => {
      if (_.get(edges, "node.frontmatter.tags")) {
        tags = tags.concat(edges.node.frontmatter.tags)
      }
    })

    // Calculate the count of the each tag
    tags.forEach(tag => {
      tagPostCount[tag] = (tagPostCount[tag] || 0) + 1
    })

    // remove duplicates from the tags array
    tags = _.uniq(tags)

    createPage({
      path: `/tags`,
      component: templates.tagsPage,
      context: { tags: tagPostCount },
    })

    // Creating /tag/:slug pages
    tags.forEach(tag => {
      createPage({
        path: `/tag/${sluggify(tag)}`,
        component: templates.tagPage,
        context: { tag },
      })
    })

    const postsPerPage = 3
    let numberOfPages = Math.ceil(posts.length / postsPerPage)

    Array.from({ length: numberOfPages }).forEach((el, index) => {
      const isFirstPage = index === 0
      const currentPage = index + 1

      if (isFirstPage) return

      createPage({
        path: `/page/${currentPage}`,
        component: templates.postList,
        context: {
          limit: postsPerPage,
          skip: index * postsPerPage,
          currentPage,
        },
      })
    })
  })
}
