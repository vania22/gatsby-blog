import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"

import { Row, Col } from "reactstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "../components/Post"
import Sidebar from "../components/Sidebar"
import PostPagination from "../components/PostPagination"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Recent Posts</h1>
    <Row>
      <Col md="8">
        <StaticQuery
          query={indexQuery}
          render={data => {
            return (
              <>
                {data.allMarkdownRemark.edges.map(({ node }) => (
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
              </>
            )
          }}
        />
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
    <Row className="text-center">
      <Col md="12">
        <div className="d-flex justify-content-center">
          <PostPagination currentPage={1}/>
        </div>
      </Col>
    </Row>
  </Layout>
)

const indexQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
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

export default IndexPage
