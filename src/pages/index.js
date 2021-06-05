import React from "react"
import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import Img from "gatsby-image"

import "../css/tailwind.css"

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <main className="container mx-auto">
      <Helmet title={`@duongital`} />
      <div
        className="flex flex-wrap items-start mt-10"
        style={{ height: 100 + "vh" }}
      >
        <div className="w-full md:w-1/2 px-8 my-12 md:my-0">
          {/* <Img
            className="w-24 float-right"
            fluid={data.file.childImageSharp.fluid}
            alt="avatar"
          /> */}
          <div className="clear-both" />
          <h1 className="text-right">Duong Nguyen</h1>
          <p className="my-4 text-right">
            Duong Nguyen graduated from University of Economics HCMC and started his
            first job as a Marketing Executive for Mercedes-Benz Vietnam. Over 5
            years working in the field he made a big decision to change career
            paths and become a Software Engineer. Now he enjoys every working
            day with front-end tasks and challenges himself to become a
            full-stack engineer in the near future.
          </p>
          <strong className="mt-4 d-block float-right">
            built by Gatsby{" "}
            <span role="img" aria-label="heart">
              ❤️
            </span>
          </strong>
          <Img
            className="w-full mt-24"
            fluid={data.file.childImageSharp.fluid}
            alt="avatar"
          />
        </div>
        <div className="w-full md:w-1/2 px-8 my-12 md:my-0">
          {posts
            .filter(post => post.node.frontmatter.title.length > 0)
            .map(({ node: post }) => {
              return (
                <div className="blog-post-preview mb-10" key={post.id}>
                  <h3 className="text-primary mb-0">
                    <Link to={post.frontmatter.path}>
                      {post.frontmatter.title}
                    </Link>
                  </h3>
                  <h6 className="mt-0">{post.frontmatter.date}</h6>
                  {/* <p>{post.excerpt}</p> */}
                </div>
              )
            })}
        </div>
      </div>
    </main>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 100)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
    file(relativePath: { eq: "pages/home-cover.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
