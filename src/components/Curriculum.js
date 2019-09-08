import React, { PureComponent } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { HTMLContent } from '../components/Content'

class Curriculum extends PureComponent {
  render() {
    return (
      <div className="profile--section">
        <h1 id="cv">{this.props.data.markdownRemark.frontmatter.title}</h1>
        <HTMLContent content={this.props.data.markdownRemark.html} />
      </div>
    );
  }
}

export default () => (
  <StaticQuery
    query={graphql`
    query CurriculumTemplate {
      markdownRemark(frontmatter: { templateKey: { eq: "curriculum-section" } }) {
        html
        frontmatter {
          title
        }
      }
    }
  `}
    render={(data, count) => <Curriculum data={data} count={count} />}
  />
)
