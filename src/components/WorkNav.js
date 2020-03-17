import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import Back from '../components/Back'
import Next from '../components/Next'

class WorkNav extends React.PureComponent {
  state = {}
  render() {
    const { data, current } = this.props
    const { backColor, nextColor } = this.state
    const { edges: posts } = data.allMarkdownRemark
    const index = posts.findIndex(p => p.node.fields.slug === current);
    const back = index === 0 ? posts[posts.length - 1] : posts[index - 1];
    const next = index === (posts.length - 1) ? posts[0] : posts[index + 1];
    const defaultColor = '#312f40';
    return (
      <div className="project-nav">
        <Link
          onMouseEnter={() => this.setState({ backColor: back.node.frontmatter.color })}
          onMouseLeave={() => this.setState({ backColor: undefined })}
          className="project-nav--item"
          to={back.node.fields.slug}>
          <Back color={backColor || defaultColor} />
        </Link>
        <h1>Obra</h1>
        <Link
          onMouseEnter={() => this.setState({ nextColor: next.node.frontmatter.color })}
          onMouseLeave={() => this.setState({ nextColor: undefined })}
          className="project-nav--item"
          to={next.node.fields.slug}>
          <Next color={nextColor || defaultColor} />
        </Link>
      </div>
    )
  }  
}

WorkNav.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default (props) => (
  <StaticQuery
    query={graphql`
      query WorkNavQuery {
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
                    fluid(maxWidth: 500, quality: 60) {
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
    render={(data, count) => <WorkNav data={data} current={props.current} />}
  />
)
