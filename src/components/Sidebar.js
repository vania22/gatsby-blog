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

const Sidebar = ({ postAuthor, authorImage }) => {
  if (postAuthor) {
    return (
      <div>
        <Card>
          <Img className="card-image-top" fluid={authorImage} />
          <CardBody>
            <CardTitle className="text-center text-uppercase mt-3">
              {postAuthor.name}
            </CardTitle>
          </CardBody>
        </Card>
      </div>
    )
  }

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
              <>
                {data.allMarkdownRemark.edges.map(({ node }) => (
                  <Card key={node.id}>
                    <Link to={`/post/${node.fields.slug}`} replace={true}>
                      <Img
                        className="card-image-top"
                        fluid={node.frontmatter.image.childImageSharp.fluid}
                      />
                    </Link>
                    <CardBody>
                      <Link to={`/post/${node.fields.slug}`} replace={true}>
                        <CardTitle>{node.frontmatter.title}</CardTitle>
                      </Link>
                    </CardBody>
                  </Card>
                ))}
              </>
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
          fields {
            slug
          }
          frontmatter {
            title
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
