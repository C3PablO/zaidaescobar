import React, { PureComponent } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'

class About extends PureComponent {
  render() {
    return (
      <div className="profile--full">
        <h1 id="about">{this.props.data.markdownRemark.frontmatter.title}</h1>
        <div className="profile--part">
        <PreviewCompatibleImage 
          imageInfo={this.props.data.markdownRemark.frontmatter.image}
        />
        </div>
        <div className="profile--part" style={{ padding: '0 15px ' }}>
          <div style={{ marginTop: '1rem' }}>
            <HTMLContent content={this.props.data.markdownRemark.html} />
          </div>
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
