import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import {
  Card,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
  Badge,
} from "reactstrap"
import { sluggify } from "../utils/sluggify"

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
          <span className="text-info mr-2">{date}</span>
          by
          <span className="text-info ml-2">{author}</span>
        </CardSubtitle>
        <CardText>{body}</CardText>
        {tags.map(tag => (
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
        <Link
          to={`/post/${slug}`}
          className="btn btn-outline-primary float-right"
        >
          Read more
        </Link>
      </CardBody>
    </Card>
  )
}

export default Post
