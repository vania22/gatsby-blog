import React from "react"
import { Link } from "gatsby"
import { Badge } from "reactstrap"
import { sluggify } from "../utils/sluggify"

const Tag = ({ tag, tagCount }) => {
  return (
    <Badge
      color="primary"
      className="p-2 ml-2 text-lowercase"
      style={{ fontSize: 16 }}
    >
      <Link to={`/tag/${sluggify(tag)}`} className="text-white">
        {tag}
        {tagCount && <small className="ml-1">{tagCount}</small>}
      </Link>
    </Badge>
  )
}

export default Tag
