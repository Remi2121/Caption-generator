import React from 'react'
import './Home.css'
import Header from '../Components/Header/header'
import ImageCaption from '../Components/imageCaption/ImageCaption'
import AboutUs from '../Components/Aboutus/AboutUs'
import MultiLan from '../Components/Multilanguage/multilan'
import Profilecap from '../Components/Profilecaption/profilecap'

const Home = () => {
  return (
    <>
      <Header/>

      {/* Everything below the header */}
      <main className="page-content">
        <div id="imageCaption">
          <ImageCaption/>
        </div>

        <div id="multiLanguage">
          <MultiLan/>
        </div>

        <div id="profileCaption">
          <Profilecap/>
        </div>

        <div id="aboutUs">
          <AboutUs/>
        </div>
      </main>
    </>
  )
}

export default Home
