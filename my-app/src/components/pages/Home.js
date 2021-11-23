import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import BannerSection from '../BannerSection';
import Footer from '../Footer';
import AboutUs from '../About';
import Navbar from './../Navbar';


function Home() {
  return (
    <>
      <Navbar />
      <BannerSection />
      <AboutUs />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;