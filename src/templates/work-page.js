import React from 'react'
import PropTypes from 'prop-types'
//  import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Content, { HTMLContent } from '../components/Content'
import Masonry from '../components/Masonry'
import BlogRoll from '../components/BlogRoll'
import WorkNav from '../components/WorkNav'

export const WorkPostTemplate = ({
  content,
  contentComponent,
  tags,
  title,
  images,
  helmet,
  slug,
}) => {
  const PostContent = contentComponent || Content
  return (
    <div className="blog-page--wrapper">
      {helmet}
      <div className="blog-page--text blog-page--title" id="blog-title">
        <h1>
          {title}
        </h1>
        <PostContent content={content} />
      </div>
      {
        tags && tags.length && (
          <div className="categories">
            Categoría:
            <ul className="tags">
              {tags.map((tag, i) => (
                <li key={tag + `tag`} className="tags--tag">
                  {tag}{tags.length - 1 !== i && ','}
                </li>
              ))}
            </ul>
          </div>
        )
      }
      <Masonry images={images} cols={3} />
      <div className="bottom-section" style={{ marginTop: 50 }}>
        <WorkNav current={slug} />
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
    <WorkPostTemplate
      slug={post.fields.slug}
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
      fields {
        slug
      }
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
