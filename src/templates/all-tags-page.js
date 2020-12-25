import React from "react"
import { Link } from "gatsby"
import { Col, Row, Badge } from "reactstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Sidebar from "../components/Sidebar"
import { sluggify } from "../utils/sluggify"

const tagsPage = ({ pageContext: { tags } }) => {
  return (
    <Layout>
      <SEO title="All Tags" />
      <Row>
        <Col md="8">
          <ul>
            {Object.keys(tags).map(key => (
              <Badge
                color="primary"
                className="p-2 ml-2 text-lowercase"
                style={{ fontSize: 16 }}
                key={key + tags[key]}
              >
                <Link to={`/tag/${sluggify(key)}`} className="text-white">
                  {key}
                  <small className="ml-1">{tags[key]}</small>
                </Link>
              </Badge>
            ))}
          </ul>
        </Col>
        <Col md="4">
          <Sidebar />
        </Col>
      </Row>
    </Layout>
  )
}

export default tagsPage
