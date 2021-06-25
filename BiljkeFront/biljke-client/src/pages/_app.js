import React from "react"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import Sidebar from "../components/Sidebar/Sidebar"
import { wrapper } from "../redux"
import '../styles/globals.css'
import { useRouter } from 'next/router'


const MyApp = ({ Component, pageProps}) => {
  const router = useRouter()
  console.log(router)
  return (
    <div className="app">
    <div id="content-wrap">
      <Header router={router} />
      <div className="layout-content">
        <Component {...pageProps} />
      </div>
    </div>
    <Footer />
  </div>
  )
}

export default wrapper.withRedux(MyApp);