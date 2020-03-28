import React from 'react'
import PropTypes from 'prop-types'
import { WorkPostTemplate } from '../../templates/work-page'

const BlogPostPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(['data', 'tags'])
  const images = entry.getIn(['data', 'images'])

  return (
    <WorkPostTemplate
      content={widgetFor('body')}
      description={entry.getIn(['data', 'description'])}
      tags={tags && tags.toJS()}
      title={entry.getIn(['data', 'title'])}
      gallery={[]}
      images={images && images.toJS()}
      admin
    />
  )
}

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BlogPostPreview;
