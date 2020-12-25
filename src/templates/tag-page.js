import React from "react"
import { Row, Col } from "reactstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "../components/Post"
import Sidebar from "../components/Sidebar"

const tagPage = ({ pageContext: { posts } }) => {
  console.log(posts)

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
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
          <Sidebar />
        </Col>
      </Row>
    </Layout>
  )
}

export default tagPage
