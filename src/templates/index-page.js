import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import scrollToElement from 'scroll-to-element'

import BlogRoll from '../components/BlogRoll'
import About from '../components/About';
import Contact from '../components/Contact';

export const IndexPageTemplate = () => '';

const Content = ({
  title,
  subheading,
}) => (
  <div className="index-page" id="work">
      <div className="index-page--wrapper">
        <header className="main-header">
          <h1>{title}</h1>
          <h2>{subheading}</h2>
        </header>
        <BlogRoll />
        <div className="profile--block">
          <About />
        </div>
        <div className="bottom-section">
        <Contact />
        </div>
        
      </div>
  </div>
)

class IndexPage extends React.PureComponent {
  componentDidMount() {
    const clickEl = document.querySelectorAll('[data-scroll]');
    for (let i = 0; i < clickEl.length; i++) {
      clickEl[i].addEventListener('click', this.onNavLink);
    }
    // if the url has a hash. Scroll to it
    if (window.location.hash) {
      const anchor = window.location.hash.split('#')[1];
      this.goToHash(anchor);
    } 
  }

  componentWillUnmount() {
    const clickEl = document.querySelectorAll('[data-scroll]');
    for (let i = 0; i < clickEl.length; i++) {
      clickEl[i].removeEventListener('click', this.onNavLink);
    }
  }

  goToHash(hash) {
    scrollToElement(document.getElementById(hash), {
      offset: -150,
      duration: 1000,
    });
  }

  onNavLink = (e) => {
    e.preventDefault();
    const hash = e.target.getAttribute("data-scroll");
    this.goToHash(hash);
    window.location.hash = hash;
  }

  render() {
    const { frontmatter } = this.props.data.markdownRemark
    return (
      <Content
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    );
  }
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
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
