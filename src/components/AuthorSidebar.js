import React from "react"
import Img from "gatsby-image"
import { Card, CardBody, CardText, CardTitle } from "reactstrap"
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa"

const AuthorSidebar = ({ postAuthor, authorImage }) => {
  return (
    <Card>
      <Img className="card-image-top" fluid={authorImage} />
      <CardBody>
        <CardTitle className="mt-3 text-center text-uppercase">
          {postAuthor.name}
        </CardTitle>
        <CardText>{postAuthor.bio}</CardText>
        <div className="text-center author-social-links">
          <ul className="mt-3">
            <li>
              <a
                href={`https://instagram.com/${postAuthor.instagram}`}
                target="_blank"
                className="instagram"
              >
                <FaInstagram size={25} />
              </a>
            </li>
            <li>
              <a
                href={`https://facebook.com/${postAuthor.facebook}`}
                target="_blank"
                className="facebook"
              >
                <FaFacebookF size={25} />
              </a>
            </li>
            <li>
              <a
                href={`https://twitter.com/${postAuthor.twitter}`}
                target="_blank"
                className="twitter"
              >
                <FaTwitter size={25} />
              </a>
            </li>
            <li>
              <a
                href={`https://linkedin.com/${postAuthor.linkedin}`}
                target="_blank"
                className="linkedin"
              >
                <FaLinkedinIn size={25} />
              </a>
            </li>
          </ul>
        </div>
      </CardBody>
    </Card>
  )
}

export default AuthorSidebar
