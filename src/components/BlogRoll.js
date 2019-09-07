import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        {posts && posts.map(({ node: post }) => (
          <article key={post.id} className="blog-pod blog-pod__3">
            <Link to={post.fields.slug}>
              <div className="blog-post--title">
                <h3>{post.frontmatter.title}</h3>
              </div>
              <div className="blog-pod--image">
                <PreviewCompatibleImage
                  imageInfo={{
                    image: post.frontmatter.image,
                    alt: `featured image thumbnail for post ${
                      post.title
                    }`,
                  }}
                />
              </div>
            </Link>
          </article>))
        }
      </div>
    )
  }  
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___title] }
          filter: { frontmatter: { templateKey: { eq: "work-page" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                image {
                  childImageSharp {
                    fluid(maxWidth: 500, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
