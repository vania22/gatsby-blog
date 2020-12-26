import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { Row, Col, Card, CardSubtitle, CardBody, CardText } from "reactstrap"
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa"
import { DiscussionEmbed } from "disqus-react"

import Layout from "../components/layout"
import Sidebar from "../components/Sidebar"
import SEO from "../components/seo"

import { authors } from "../templates/authors"
import Tag from "../components/Tag"

const SinglePostPage = ({ data, pageContext }) => {
  const post = data.markdownRemark.frontmatter
  const author = authors.find(a => a.name === post.author)

  const baseURL = "https://gatsbyportfolio.co.uk"
  const disqusShortname = "gatsby-tutorial"
  const disqusConfig = {
    url: baseURL + pageContext.slug,
    identifier: data.markdownRemark.id,
    title: post.title,
  }

  return (
    <Layout>
      <SEO title={post.title} />
      <h1>{post.title}</h1>
      <Row>
        <Col md="8">
          <Card>
            <Img
              className="card-image-top"
              fluid={post.image.childImageSharp.fluid}
            />
            <CardBody>
              <CardSubtitle>
                <span className="mr-2 text-info">{post.date}</span>
                by
                <span className="ml-2 text-info">{post.author}</span>
              </CardSubtitle>
              <CardText
                className="mt-3"
                dangerouslySetInnerHTML={{
                  __html: data.markdownRemark.html,
                }}
              />
              {post.tags.map(tag => (
                <Tag tag={tag} key={tag} />
              ))}
            </CardBody>
          </Card>
          <h3 className="text-center">Share this post</h3>
          <div className="text-center social-share-links">
            <ul>
              <li>
                <a
                  href={`https://facebook.com/sharer/sharer.php?u=${baseURL}/post/${pageContext.slug}`}
                  className="facebook"
                  target="_blank"
                >
                  <FaFacebookF size={28} />
                </a>
              </li>
              <li>
                <a
                  href={`https://twitter.com/share?url=${baseURL}/post/${pageContext.slug}&text=${post.title}&via=twitterHandle`}
                  className="twitter"
                  target="_blank"
                >
                  <FaTwitter size={28} />
                </a>
              </li>
              <li>
                <a
                  href={`https://www.linkedin.com/shareArticle?url=${baseURL}/post/${pageContext.slug}`}
                  className="linkedin"
                  target="_blank"
                >
                  <FaLinkedinIn size={28} />
                </a>
              </li>
            </ul>
          </div>
          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
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
  query postBySlug($slug: String!, $authorImageUrl: String!) {
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
