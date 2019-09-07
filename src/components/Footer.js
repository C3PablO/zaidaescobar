import React from 'react'
import { Link } from 'gatsby'



const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Link to="/contact" className="contact-link">
        <h2>
          Contacto
        </h2>
      </Link>
      </footer>
    )
  }
}

export default Footer
