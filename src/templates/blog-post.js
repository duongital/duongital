import React from "react"
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"

import "../css/blog-post.css"

export default function Template({ data }) {
  const { markdownRemark: post } = data
  return (
    <div className="blog-post-container post">
      <Helmet title={`${post.frontmatter.title}`} />
      <div className="h-10 md:h-24"></div>
      <div className="container mx-auto">
        <div className="flex flex-wrap px-8">
          <div className="w-full lg:w-1/4"></div>
          <div className="w-full lg:w-1/2">
            <Link to="/">HOME</Link>
            <h1 className="text-primary">{post.frontmatter.title}</h1>
            <div
              className="blog-post-content mt-10 mb-24"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
          <div className="w-full lg:w-1/4"></div>
        </div>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
