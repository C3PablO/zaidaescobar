import React from 'react'
import PropTypes from 'prop-types'
//  import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Masonry from '../components/Masonry'
import BlogRoll from '../components/BlogRoll'

export const WorkPostTemplate = ({
  content,
  contentComponent,
  tags,
  title,
  images,
  helmet,
}) => {
  const PostContent = contentComponent || Content
  return (
    <div className="blog-page--wrapper">
      {helmet}
      <div className="blog-page--text blog-page--title">
        <h1>
          {title}
        </h1>
        <PostContent content={content} />
      </div>
      {tags && tags.length ? (
        <ul className="tags">
          {tags.map(tag => (
            <li key={tag + `tag`} className="tags--tag">
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
      <Masonry images={images} />
      <div className="bottom-section">
        <h1>Obra</h1>
        <BlogRoll />
      </div>
    </div>
  )
}

// use this to link to the tags page instead
//<Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>

WorkPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const Work = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <WorkPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        images={post.frontmatter.images}
        helmet={
          <Helmet title={post.frontmatter.title}>
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

Work.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Work

export const pageQuery = graphql`
  query WorkByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
        images {
          image {
            childImageSharp {
              fluid(maxWidth: 700, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
