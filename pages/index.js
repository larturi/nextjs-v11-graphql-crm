import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Layout from '../components/Layout';

export default function Index() {
  return (
    <div>
      <Layout>
        <h2>Desde Index</h2>
      </Layout>
    </div>
  )
}
