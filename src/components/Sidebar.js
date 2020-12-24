import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import Img from "gatsby-image"
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
} from "reactstrap"

const Sidebar = () => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle className="text-center text-uppercase mb-3">
            Newsletter
          </CardTitle>
          <Form className="text-center">
            <FormGroup>
              <Input type="email" name="email" placeholder="Your Email" />
            </FormGroup>
            <Button className="text-uppercase" color="success" outline>
              Subscribe
            </Button>
          </Form>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle className="text-center text-uppercase">
            Advertisement
          </CardTitle>
          <img
            src="https://via.placeholder.com/320x200"
            alt="Advert"
            style={{ width: "100%", height: "100%" }}
          />
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle className="text-center text-uppercase mb-3">
            Recent posts
          </CardTitle>
          <StaticQuery
            query={sidebarQuery}
            render={data => (
              <div key={1}>
                {data.allMarkdownRemark.edges.map(({ node }) => (
                  <Card key={node.id}>
                    <Link to={node.frontmatter.path}>
                      <Img
                        className="card-image-top"
                        fluid={node.frontmatter.image.childImageSharp.fluid}
                      />
                    </Link>
                    <CardBody>
                      <Link to={node.frontmatter.path}>
                        <CardTitle>{node.frontmatter.title}</CardTitle>
                      </Link>
                    </CardBody>
                  </Card>
                ))}
              </div>
            )}
          />
        </CardBody>
      </Card>
    </div>
  )
}

const sidebarQuery = graphql`
  query {
    allMarkdownRemark(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            path
            image {
              childImageSharp {
                fluid(maxWidth: 496, quality: 100) {
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

export default Sidebar
