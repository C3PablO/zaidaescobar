import React, { PureComponent } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'

class Curriculum extends PureComponent {
  render() {
    console.log(this.props);
    return (
      <div className="profile--section">
        <h1 id="#cv">{this.props.data.markdownRemark.frontmatter.title}</h1>
        <HTMLContent content={this.props.data.markdownRemark.html} />
        
      </div>
    );
  }
}

export default () => (
  <StaticQuery
    query={graphql`
    query CurriculumTemplate {
      markdownRemark(frontmatter: { templateKey: { eq: "product-page" } }) {
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
    render={(data, count) => <Curriculum data={data} count={count} />}
  />
)
