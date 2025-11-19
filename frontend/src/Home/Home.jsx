import React from 'react'
import './Home.css'
import Header from '../Components/Header/header'
import ImageCaption from '../Components/imageCaption/ImageCaption'
import AboutUs from '../Components/Aboutus/AboutUs'

const Home = () => {
  return (
    <div>
      <Header/>
      <ImageCaption/>
      <AboutUs/>
    </div>
  )
}

export default Home
