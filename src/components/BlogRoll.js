import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import Masonry from './Masonry';

const Item = ({ imageInfo }) => (
  <article key={imageInfo.node.id} className="work-pod">
    <div className="work-pod--content">
      <Link to={imageInfo.node.fields.slug}>
        <span
          className="work-pod--image--overlay"
          style={{ background: imageInfo.node.frontmatter.color }}
        />
        <div className="work-pod--image">
          <div className="work-pod--title">
            <h3>{imageInfo.node.frontmatter.title}</h3>
          </div>
          <div className="work-pod--image--wrapper">
            <PreviewCompatibleImage
              imageInfo={{
                image: imageInfo.node.frontmatter.image,
                alt: `featured image thumbnail for post ${
                  imageInfo.node.title
                }`,
              }}
            />
          </div>
        </div>
      </Link>
    </div>
  </article>
)
class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        <Masonry images={posts} cols={3} renderer={Item} />
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
          sort: { order: ASC, fields: [frontmatter___order] }
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
                color
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
