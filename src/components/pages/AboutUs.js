import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import InfoSection from '../InfoSection';
import { homeObjOne, homeObjThree, homeObjTwo } from '../InfoSection/Data';
import './AboutUs.css';
import Navbar from './../Navbar';


export default function AboutUs() {
  return (
    <>
    <Navbar />
    <h1 className='aboutus'>關於我們</h1>
    <InfoSection {...homeObjOne}/>
    <InfoSection {...homeObjTwo}/>
    <InfoSection {...homeObjThree}/>
    <Footer />
    </>
    );
  }