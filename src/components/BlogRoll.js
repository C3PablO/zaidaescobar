import React, { PureComponent } from 'react'
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import { navigate } from "gatsby"
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage';
import scrollToElement from 'scroll-to-element';
import Masonry from './Masonry';

class Item extends PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  state = { active: false }

  onClick(e) {
    if (e.currentTarget.href !== window.location.href) {
      const href = e.currentTarget.href;
      e.preventDefault();
      e.stopPropagation();
      this.setState({ active: true}, () => {
        const t = window.setTimeout(() => {
          window.clearTimeout(t);
          navigate(href.replace(window.location.origin, ''));

        }, 700)
      });
    } else {
      return scrollToElement(document.getElementById('blog-title'), {
        offset: -100,
        duration: 1000,
      });
    };
  }

  render() {
    const { imageInfo } = this.props;
    const { active } = this.state;
    return (
      <>
      <article
        key={imageInfo.node.id}
        className={classNames('work-pod', active ?'work-pod__active' : undefined)}
      >
        <div className="work-pod--content">
          <Link to={imageInfo.node.fields.slug} onClick={this.onClick}>
            <span
              className="work-pod--image--overlay"
              style={{ background: imageInfo.node.frontmatter.color }}
            />
            <div className="work-pod--image">
              <div className="work-pod--title">
                <h3>{imageInfo.node.frontmatter.title}</h3>
              </div>
              <div className="work-pod--image--wrapper">
                <PreviewCompatibleImage
                  imageInfo={{
                    image: imageInfo.node.frontmatter.image,
                    alt: `featured image thumbnail for post ${
                      imageInfo.node.title
                    }`,
                  }}
                />
              </div>
            </div>
          </Link>
        </div>
        {this.state.color !== undefined
          && ReactDOM.createPortal(
            <div className="veil--content" style={{ background: this.state.color }} />,
            document.getElementById("veil")
          )
        }
      </article>
      { active && <div className="veil" />}
      </>
    )
  }
}
class BlogRoll extends React.PureComponent {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        <Masonry images={posts} cols={3} renderer={Item} />
        <div id="veil" />
      </div>
    )
  }  
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
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
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
