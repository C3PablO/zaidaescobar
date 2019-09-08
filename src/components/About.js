import React, { PureComponent } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'

class About extends PureComponent {
  render() {
    return (
      <div className="profile--section">
        <h1 id="about">{this.props.data.markdownRemark.frontmatter.title}</h1>
        <PreviewCompatibleImage 
          imageInfo={this.props.data.markdownRemark.frontmatter.image}
        />
        <div style={{ marginTop: '1rem' }}>
          <HTMLContent content={this.props.data.markdownRemark.html} />
        </div>
        
      </div>
    );
  }
}

export default () => (
  <StaticQuery
    query={graphql`
    query AboutTemplate {
      markdownRemark(frontmatter: { templateKey: { eq: "about-section" } }) {
        html
        frontmatter {
          title
          image {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `}
    render={(data, count) => <About data={data} count={count} />}
  />
)
