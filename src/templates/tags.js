import React from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import { BlogRoll } from '../components/BlogRoll';

class TagRoute extends React.Component {
  render() {
    console.log(this.props.data.allMarkdownRemark.edges);
    const tag = this.props.pageContext.tag;
    const tagTitle = tag.charAt(0).toUpperCase() + tag.substring(1);
    const title = this.props.data.site.siteMetadata.title

    return (
      <section>
        <Helmet title={`${tag} | ${title}`} />
          <div
            className="index-page"
            style={{ minHeight: window ? window.screen.height - 260: '100vh' }}
          >
            <div className="index-page--wrapper">
              <h1>{tagTitle}</h1>
              <BlogRoll posts={this.props.data.allMarkdownRemark.edges} equal />
              
              <div class="more-sections">
                <Link to="/tags/">Todas las Categorias</Link>
              </div>
            </div>
          </div>
      </section>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            color
            image {
              childImageSharp {
                fluid(maxWidth: 500, quality: 60) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            heading
            subheading
          }
        }
      }
    }
  }
`