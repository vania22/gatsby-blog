import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import {
  Row,
  Col,
  Card,
  CardSubtitle,
  CardBody,
  Badge,
  CardText,
} from "reactstrap"

import Layout from "../components/layout"
import Sidebar from "../components/Sidebar"
import SEO from "../components/seo"
import { sluggify } from "../utils/sluggify"
import { authors } from "../templates/authors"

const SinglePostPage = ({ data }) => {
  const post = data.markdownRemark.frontmatter
  const author = authors.find(a => a.name === post.author)

  return (
    <Layout>
      <SEO title={post.title} />
      <Row>
        <Col md="8">
          <Card>
            <Img
              className="card-image-top"
              fluid={post.image.childImageSharp.fluid}
            />
            <CardBody>
              <CardSubtitle>
                <span className="text-info mr-2">{post.date}</span>
                by
                <span className="text-info ml-2">{post.author}</span>
              </CardSubtitle>
              <CardText
                className="mt-3"
                dangerouslySetInnerHTML={{
                  __html: data.markdownRemark.html,
                }}
              />
              {post.tags.map(tag => (
                <Badge
                  color="primary"
                  className="ml-2 p-2 text-lowercase"
                  style={{ fontSize: 16 }}
                  key={tag}
                >
                  <Link to={`/tag/${sluggify(tag)}`} className="text-white">
                    {tag}
                  </Link>
                </Badge>
              ))}
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Sidebar
            postAuthor={author}
            authorImage={data.file.childImageSharp.fluid}
          />
        </Col>
      </Row>
    </Layout>
  )
}

export default SinglePostPage

export const postQuery = graphql`
  query blogPostBySlug($slug: String!, $authorImageUrl: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
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
    }
    file(relativePath: { eq: $authorImageUrl }) {
      childImageSharp {
        fluid(maxWidth: 968, quality: 100) {
          ...GatsbyImageSharpFluid
          ...GatsbyImageSharpFluidLimitPresentationSize
        }
      }
    }
  }
`
