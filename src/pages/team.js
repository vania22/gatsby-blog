import React from "react"
import { graphql, Link } from "gatsby"

import { Row, Col } from "reactstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Sidebar from "../components/Sidebar"
import { authors } from "../templates/authors"
import AuthorSidebar from "../components/AuthorSidebar"

const TeamPage = ({ data }) => {
  const images = data.allFile.edges

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Our Team</h1>
      <Row>
        <Col md="8">
          {authors.map(author => {
            const authorImage = images.find(obj =>
              author.imageUrl.includes(obj.node.name)
            )
            return (
              <AuthorSidebar
                postAuthor={author}
                authorImage={authorImage.node.childImageSharp.fluid}
                key={author.name}
              />
            )
          })}
        </Col>
        <Col md="4">
          <Sidebar />
        </Col>
      </Row>
      <Row className="text-center">
        <Col md="12">
          <div className="d-flex justify-content-center"></div>
        </Col>
      </Row>
    </Layout>
  )
}

export const imageQuery = graphql`
  query {
    allFile(filter: { relativeDirectory: { eq: "authors" } }) {
      edges {
        node {
          name
          childImageSharp {
            fluid(maxWidth: 968, quality: 100) {
              ...GatsbyImageSharpFluid
              ...GatsbyImageSharpFluidLimitPresentationSize
            }
          }
        }
      }
    }
  }
`

export default TeamPage
