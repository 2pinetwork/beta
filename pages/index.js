import React from 'react'
import Head from 'next/head'
import App from '../src/components/app'

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>2pi Finance</title>
      </Head>

      <App />
    </React.Fragment>
  )
}
