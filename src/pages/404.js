import React from 'react'
import { Link } from 'gatsby'

const NotFoundPage = () => (
  <div style={{
    marginTop: 100, textAlign: 'center', minHeight:'100vh'
    }}
  >
    <h1>ERROR</h1>
    <p>Página no encontrada</p>
    <div><Link to="/">Página principal</Link></div>
  </div>
);

export default NotFoundPage
