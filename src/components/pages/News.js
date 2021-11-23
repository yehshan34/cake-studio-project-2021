import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import Posts from '../../components/blog/posts/Posts'
import SideBar from '../../components/blog/sidebar/SideBar'
import './News.css';
import Navbar from './../Navbar';

export default function News() {
  return (
    <>
    <Navbar />
    <h1 className='news'>活動消息</h1>
    <div className='blog-news'>
    <Posts />
    <SideBar />
    </div>
    <Footer />
    </>
    );
  }