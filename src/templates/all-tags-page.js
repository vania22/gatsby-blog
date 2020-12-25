import React from "react"
import { Col, Row } from "reactstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Sidebar from "../components/Sidebar"
import Tag from "../components/Tag"

const tagsPage = ({ pageContext: { tags } }) => {
  return (
    <Layout>
      <SEO title="All Tags" />
      <Row>
        <Col md="8">
          <ul>
            {Object.keys(tags).map(key => (
              <Tag tag={key} tagCount={tags[key]} key={key} />
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
