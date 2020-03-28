import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Tags from '../../components/Tags';

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <div
    className="index-page sections-list"
    style={{ minHeight: window ? window.screen.height - 260: '100vh' }}
  >
    <Helmet title={`Obra | ${title}`} />
    <div className="index-page--wrapper">
      <header className="main-header">
        <h1 style={{ marginBottom: 50 }}>Categorías</h1>
      </header>
      <Tags />
    </div>
  </div>
)

export default TagsPage

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
