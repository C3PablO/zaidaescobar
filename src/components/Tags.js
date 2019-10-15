import React from 'react';
import { kebabCase } from 'lodash';
import { Link, graphql, StaticQuery } from 'gatsby';

const Tags = ({
  showCount,
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <ul className="tag-list">
    {group.map(tag => (
      <li key={tag.fieldValue}>
        <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
          {tag.fieldValue} {showCount && ` (${tag.totalCount})`}
        </Link>
      </li>
    ))}
  </ul>
)

export default () => (
  <StaticQuery
    query={graphql`
    query TagsListQuery {
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
  `}
    render={(data, count) => <Tags data={data} />}
  />
)