import React, { PureComponent } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'

class About extends PureComponent {
  render() {
    return (
      <div className="profile--part-wrapper profile--full">
        <div className="profile--part">
          <div className="profile--part--image">
            <div className="profile--part--image--circle-wrapper">
              <div className="profile--part--image--circle">
                <PreviewCompatibleImage 
                  imageInfo={this.props.data.markdownRemark.frontmatter.image}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="profile--part profile--part__last">
          <h1 id="about">{this.props.data.markdownRemark.frontmatter.title}</h1>
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
