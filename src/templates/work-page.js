import React from 'react'
import PropTypes from 'prop-types'
//  import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Content, { HTMLContent } from '../components/Content'
import Masonry from '../components/Masonry'
import BlogRoll from '../components/BlogRoll'
import WorkNav from '../components/WorkNav'
import Gallery from '../components/Gallery'

export class WorkPostTemplate extends React.PureComponent {
  state = {}

  gallery = React.createRef();

  render() {
    const {
      content,
      contentComponent,
      tags,
      title,
      images,
      helmet,
      slug,
      gallery,
    } = this.props;
    const PostContent = contentComponent || Content
    return (
      <div className="blog-page--wrapper">
        {helmet}
        <div className="blog-page--text blog-page--title" id="blog-title">
        <Gallery
            ref={this.gallery}
            images={gallery}
          />
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
        <Masonry images={images} cols={3} onClick={(index) => {
          this.gallery.current.openLightbox(index);
        }} />
        <div className="bottom-section" style={{ marginTop: 50 }}>
          <WorkNav current={slug} />
          <BlogRoll />
        </div>
      </div>
    );
  }
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
  const { markdownRemark: post } = data;
  return (
    <WorkPostTemplate
      id={post.id}  
      slug={post.fields.slug}
      content={post.html}
      contentComponent={HTMLContent}
      description={post.frontmatter.description}
      images={post.frontmatter.images}
      gallery={post.frontmatter.gallery.map(n => n.image.childImageSharp.fluid.src)}
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
        gallery: images {
          image {
            childImageSharp {
              fluid(maxWidth: 700, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        tags
        images {
          image {
            childImageSharp {
              fluid(maxWidth: 2000, quality: 100, srcSetBreakpoints: [576, 768, 992, 1200]) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
