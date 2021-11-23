import React from 'react';
import '../App.css';
import { Button } from './Button';
import './BannerSection.css';
import { Link } from 'react-router-dom';
// import bannerVideo from '../videos/ollicake.mp4';

function BannerSection() {
  return (
    <div className='banner-container'>
      {/* <video src={bannerVideo} autoPlay loop muted /> */}
      <h1>韓式裱花 / 擠花蛋糕</h1>
      <p>讓幸福滋味定格在這一瞬間</p>
      <div className='banner-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          <Link to='/homeproduct' 
          style={{color: "white", textDecoration: "none",
          }}>訂購蛋糕
          </Link>
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          <Link to='/homecourse' style={{color: "black", textDecoration: "none"}}>
          訂購課程 <i className='far fa-play-circle' />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default BannerSection;