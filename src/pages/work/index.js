import { graphql } from 'gatsby'

import IndexPage from '../../templates/index-page'

export default IndexPage;

export const pageQuery = graphql`
  query WorkPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
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
`