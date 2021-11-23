import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import logoWhite from '../images/logo_white.png';
import logoBlack from '../images/logo_black.png'

import firebase from 'firebase';

function NavbarAdmin() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    
    const [user, setUser] = React.useState(null);
    React.useEffect(()=> {
        firebase.auth().onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
    }, []);
    
    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };
    
    useEffect(() => {
        showButton();
    },[]);
    
    window.addEventListener('resize', showButton);
    
    return (
        <>
        <nav className='navbar'>
        <Link to='/admin-0' className='navbar-logo-desktop' onClick={closeMobileMenu}>
        <img className='image-logo-desktop'  src={logoBlack} alt='logo-black'/>
        Sunny's Studio 後台系統
        </Link>
        <div className='navbar-container desktop-header'>
        <div className='menu-icon' onClick={handleClick}>
        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'} >
        <li className='nav-item'>
        <Link to='/admin-0' className='nav-links' onClick={closeMobileMenu}>
        登入
        </Link>
        </li>
        <li className='nav-item'>
        <Link to='/admin-0' className='nav-links' onClick={closeMobileMenu}>
        部落格頁
        </Link>
        </li>
        <li className='nav-item'>
        <Link to='/admin-1' className='nav-links' onClick={closeMobileMenu}>
        蛋糕產品頁
        </Link>
        </li>
        <li className='nav-item'>
        <Link to='/orderlist' className='nav-links' onClick={closeMobileMenu}>
        訂購表單
        </Link>
        </li>
        <li className='nav-item'>
        <Link to='/bookinglist' className='nav-links' onClick={closeMobileMenu}>
        預約課程頁
        </Link>
        </li>
        <li className='nav-item'>
        <Link to='/member' className='nav-links' onClick={closeMobileMenu}>
        會員列表
        </Link>
        </li>
        <li className='nav-item'>
        <Link to='/contactusmessage' className='nav-links' onClick={closeMobileMenu}>
        問題私訊
        </Link>
        </li>
        <Link to='/' className='navbar-logo-desktop' onClick={closeMobileMenu}>
        <img className='image-logo-desktop'  src={logoWhite} alt='logo-white'/>
        Sunny's Studio 前台
        </Link>
        </ul>
        </div>
        </nav>
        </>
        )
    }
    
    export default NavbarAdmin
    