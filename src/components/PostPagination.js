import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import { Pagination, PaginationItem, PaginationLink } from "reactstrap"

const PostPaginationTemplate = ({ data, currentPage }) => {
  const prevPage = currentPage - 1
  const nextPage = currentPage + 1
  const totalPages = Array.from({
    length: Math.ceil(data.allMarkdownRemark.totalCount / 3),
  })

  return (
    <Pagination>
      <Link to={prevPage <= 1 ? "/" : `/page/${prevPage}`}>
        <PaginationItem disabled={prevPage === 0}>
          <PaginationLink previous></PaginationLink>
        </PaginationItem>
      </Link>
      {totalPages.map((el, index) => {
        let page = index + 1
        let isActive = page === currentPage
        let to = ""

        if (page === 1) {
          to = "/"
        } else {
          to = `/page/${page}`
        }

        if (page >= 10) {
          return null
        }
        return (
          <Link
            to={to}
            style={{ color: isActive ? "#fff" : "#007BFF" }}
            key={index + 1}
          >
            <PaginationItem active={isActive}>
              <PaginationLink>{page}</PaginationLink>
            </PaginationItem>
          </Link>
        )
      })}
      <Link
        to={
          nextPage >= totalPages.length
            ? `/page/${currentPage}`
            : `/page/${nextPage}`
        }
      >
        <PaginationItem>
          <PaginationLink next />
        </PaginationItem>
      </Link>
    </Pagination>
  )
}

export const PostPagination = props => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark {
            totalCount
          }
        }
      `}
      render={data => <PostPaginationTemplate data={data} {...props} />}
    />
  )
}

export default PostPagination
