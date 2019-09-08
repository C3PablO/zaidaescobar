import React from 'react'
import Layout from '../components/Layout'

const NotFoundPage = () => (
  <Layout showFooter={false}>
    <div style={{ marginTop: 100, textAlign: 'center' }}>
      <h1>ERROR</h1>
      <p>Página no encontrada</p>
    </div>
  </Layout>
)

export default NotFoundPage
