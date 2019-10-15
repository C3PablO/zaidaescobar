import React from 'react'
import Layout from '../../components/Layout'
import { Link } from 'gatsby'

export default () => (
  <Layout>
    <section className="page-thanks">
      <div>
        <h1>¡Gracias!</h1>
        <h2>
          Me pondré en contacto contigo lo antes posible <span role="img" aria-label="Gracias">😘</span>
        </h2>
        <h3>Mientras tanto, échale un ojo a mi <Link to="/">obra</Link>.</h3>
      </div>
    </section>
  </Layout>
)
