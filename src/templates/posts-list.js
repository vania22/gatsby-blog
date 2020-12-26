import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { Row, Col } from "reactstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "../components/Post"
import Sidebar from "../components/Sidebar"

const postLists = props => {
  const posts = props.data.allMarkdownRemark.edges
  const { currentPage } = props.pageContext
  console.log(props.pageContext)

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Page: {currentPage}</h1>
      <Row>
        <Col md="8">
          {posts.map(({ node }) => (
            <Post
              title={node.frontmatter.title}
              author={node.frontmatter.author}
              slug={node.fields.slug}
              date={node.frontmatter.date}
              fluid={node.frontmatter.image.childImageSharp.fluid}
              tags={node.frontmatter.tags}
              body={node.excerpt}
              key={node.id}
            />
          ))}
        </Col>
        <Col md="4">
          <div
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Sidebar />
          </div>
        </Col>
      </Row>
    </Layout>
  )
}

export const postListQuery = graphql`
  query postListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMM Do YYYY")
            author
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 968, quality: 100) {
                  ...GatsbyImageSharpFluid
                  ...GatsbyImageSharpFluidLimitPresentationSize
                }
              }
            }
          }
          excerpt
        }
      }
    }
  }
`

export default postLists
