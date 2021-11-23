import React from 'react'
import './ContactUs.css';
import blog5 from './../../images/blog5.png'

function ContactPopup(props) {
    
    return (props.trigger) ? (
        <div className="modal-wrap">
        <div className="modal">
        <img className="success-send" src={blog5} alt="sendmsgdone"/>
        {props.children}
       
        <button className="button-modal modal-close" onClick={()=> props.setTrigger(false)}>關閉</button>
       
        </div>
        </div>
        ) : "";
    }
    
    
    export default ContactPopup;