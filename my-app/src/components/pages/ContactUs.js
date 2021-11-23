import React, { useState } from 'react';
import '../../App.css';
import Footer from '../Footer';
import imageContact from '../../images/pic3.png';
import './ContactUs.css';
import Navbar from './../Navbar';
import firebase from 'firebase';
import ContactPopup from './ContactPopup';

export default function ContactUs() {
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [message, setMessage] = useState('');
  const [buttonPopup, setButtonPopup] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.firestore().collection('contact-form').doc().set({
      fullName: fullName,
      emailAddress: emailAddress,
      message: message,
      createdAt: firebase.firestore.Timestamp.now(),
    })
    .then (() => {
      setButtonPopup(true);
    })
    .catch(error => {
      alert(error.message);
    });
    setFullName('')
    setEmailAddress('')
    setMessage('')
  };
  
  return (
    <>
    <Navbar />
    <ContactPopup trigger={buttonPopup} setTrigger={setButtonPopup}>
      <p>感謝您的回饋！</p>
      <p>我們將在 24-48 小時內回覆您</p>
    </ContactPopup>
    <div className="contact">
    <div
    className="leftSide"
    style={{ backgroundImage: `url(${imageContact})` }}
    ></div>
    <div className="rightSide">
    <h1>與我們聯絡</h1>
    
    <form id="contact-form" method="POST" onSubmit={handleSubmit}>
    <label htmlFor="name">名字</label>
    <input name="name" placeholder="請輸入姓名..." type="text" 
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
    />
    <label htmlFor="email">信箱</label>
    <input name="email" placeholder="請填寫信箱..." type="email" 
    value={emailAddress}
    onChange={(e) => setEmailAddress(e.target.value)}
    />
    <label htmlFor="message">訊息</label>
    <textarea className="textarea-reply"
    rows="6"
    placeholder="請留下您的訊息，我們將盡快回覆..."
    name="message"
    required
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    ></textarea>
    <button type="submit" className="send-message" onClick={()=> setButtonPopup(false)} >寄出訊息</button>
    </form>
    </div>
    </div>
    <Footer />
    </>
    );
  }