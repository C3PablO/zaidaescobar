import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import Content, { HTMLContent } from '../components/Content'

class About extends PureComponent {
  render() {
    console.log(this.props);
    return (
      <div className="profile--section">
        <h1>{this.props.data.markdownRemark.frontmatter.title}</h1>
        <PreviewCompatibleImage 
          imageInfo={this.props.data.markdownRemark.frontmatter.image}
        />
        <HTMLContent content={this.props.data.markdownRemark.html} />
        
      </div>
    );
  }
}

// class BlogRoll extends React.Component {
//   render() {
//     const { data } = this.props
//     const { edges: posts } = data.allMarkdownRemark

//     return (
//       <div>
//         {console.log(this.props)}
//       </div>
//     )
//   }  
// }

export default () => (
  <StaticQuery
    query={graphql`
    query AboutTemplate {
      markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
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






// import React from 'react'
// import PropTypes from 'prop-types'
// import { graphql } from 'gatsby'
// import Layout from '../components/Layout'
// import Content, { HTMLContent } from '../components/Content'

// export const AboutPageTemplate = ({ title, content, contentComponent }) => {
//   const PageContent = contentComponent || Content

//   return (
//     <section className="section section--gradient">
//       <div className="container">
//         <div className="columns">
//           <div className="column is-10 is-offset-1">
//             <div className="section">
//               <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
//                 {title}
//               </h2>
//               <PageContent className="content" content={content} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// AboutPageTemplate.propTypes = {
//   title: PropTypes.string.isRequired,
//   content: PropTypes.string,
//   contentComponent: PropTypes.func,
// }

// const AboutPage = ({ data }) => {
//   const { markdownRemark: post } = data

//   return (
//     <Layout>
//       <AboutPageTemplate
//         contentComponent={HTMLContent}
//         title={post.frontmatter.title}
//         content={post.html}
//       />
//     </Layout>
//   )
// }

// AboutPage.propTypes = {
//   data: PropTypes.object.isRequired,
// }

// export default AboutPage

// export const aboutPageQuery = graphql`
//   query AboutPage($id: String!) {
//     markdownRemark(id: { eq: $id }) {
//       html
//       frontmatter {
//         title
//       }
//     }
//   }
// `
