import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { Card, CardTitle, CardText, CardSubtitle, CardBody } from "reactstrap"
import Tag from "../components/Tag"

const Post = ({ title, author, slug, date, body, tags, fluid }) => {
  return (
    <Card>
      <Link to={`/post/${slug}`}>
        <Img className="card-image-top" fluid={fluid} />
      </Link>
      <CardBody>
        <CardTitle>
          <Link to={`/post/${slug}`}>{title}</Link>
        </CardTitle>
        <CardSubtitle>
          <span className="mr-2 text-info">{date}</span>
          by
          <span className="ml-2 text-info">{author}</span>
        </CardSubtitle>
        <CardText>{body}</CardText>
        {tags.map(tag => (
          <Tag tag={tag} key={tag} />
        ))}
        <Link
          to={`/post/${slug}`}
          className="float-right btn btn-outline-primary"
        >
          Read more
        </Link>
      </CardBody>
    </Card>
  )
}

export default Post
