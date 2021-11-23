import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import Gallery from '../gallery/Gallery';
import { Fragment } from 'react';
import getData from './data';
import './WorkDisplay.css';
import Navbar from '../Navbar';

export default function WorkDisplay() {
  let images = getData();
  return (
    
    <>
    <Navbar />
    <Fragment>
    <h1 className='workdisplay'>作品展示</h1>
    <div className='gallery'>
    <Gallery imgarr={images}/>
    </div>
    </Fragment>
    <Footer />

    </>);
  }