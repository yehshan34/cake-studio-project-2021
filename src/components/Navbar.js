import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Button } from './Button';
import './Navbar.css';
import logoWhite from '../images/logo_white.png';
import firebase from 'firebase';
function Navbar() {
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
        <div className='navbar-container mobile-header'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
        <img className='image-logo'  src={logoWhite} alt='logo-white'/>
        SUNNY's CAKE 
        </Link>
        <div className='menu-icon' onClick={handleClick}>
        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'} >
        <li className='nav-item'>
        <Link to='/aboutus' className='nav-links' onClick={closeMobileMenu}>
        關於我們
        </Link>
        </li>
        <li className='nav-item'>
        <Link to='/news' className='nav-links' onClick={closeMobileMenu}>
        活動消息
        </Link>
        </li>
        <li className='nav-item'>
        <Link to='/courseintro' className='nav-links' onClick={closeMobileMenu}>
        課程介紹
        </Link>
        </li>
        <li className='nav-item'>
        <Link to='/homecourse' className='nav-links' onClick={closeMobileMenu}>
        預約課程
        </Link>
        </li>
        <li className='nav-item'>
        <Link to='/homeproduct' className='nav-links' onClick={closeMobileMenu}>
        訂購蛋糕
        </Link>
        </li>
        <li className='nav-item'>
        <Link to='/workdisplay' className='nav-links' onClick={closeMobileMenu}>
        學生作品
        </Link>
        </li>
        <li className='nav-item'>
        <Link to='/contactus' className='nav-links' onClick={closeMobileMenu}>
        聯絡我們
        </Link>
        </li>
        <li className='nav-item'>
        <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
        登入
        </Link>
        </li>
        </ul>
        {button && <Button buttonStyle='btn--outline'>登入</Button>}
        </div>
        
        <div className='navbar-container desktop-header'>
        <div className='menu-icon' onClick={handleClick}>
        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'} >
        <li className='nav-item'>
        <Link to='/aboutus' className='nav-links' onClick={closeMobileMenu}>
        關於我們
        </Link>
        </li>
        <li className='nav-item'>
        <Link to='/news' className='nav-links' onClick={closeMobileMenu}>
        活動消息
        </Link>
        </li>
        <li className='nav-item'>
        <Link to='/courseintro' className='nav-links' onClick={closeMobileMenu}>
        課程介紹
        </Link>
        </li>
        <li className='nav-item'>
        <Link to='/homecourse' className='nav-links' onClick={closeMobileMenu}>
        預約課程
        </Link>
        </li>
        <Link to='/' className='navbar-logo-desktop' onClick={closeMobileMenu}>
        <img className='image-logo-desktop'  src={logoWhite} alt='logo-white'/>
        Sunny's Studio
        </Link>
        <li className='nav-item'>
        <Link to='/homeproduct' className='nav-links' onClick={closeMobileMenu}>
        訂購蛋糕
        </Link>
        </li>
        <li className='nav-item'>
        </li>
        <li className='nav-item'>
        <Link to='/workdisplay' className='nav-links' onClick={closeMobileMenu}>
        學生作品
        </Link>
        </li>
        <li className='nav-item'>
        <Link to='/contactus' className='nav-links' onClick={closeMobileMenu}>
        聯絡我們
        </Link>
        </li>
        <li className='nav-item'>
        <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
        會員專區
        </Link>
        </li>
        {/* <li className='nav-item'>
        <Menu.Item onClick={closeMobileMenu}>
        {user ? (
            <> 
            <Menu.Item as={Link} to='/new-post'>
            發表文章
        </Menu.Item>
        <Menu.Item as={Link} to='/my' className='nav-links'>
        會員
        </Menu.Item> 
        <Menu.Item onClick={()=> firebase.auth().signOut()} className='nav-links'>
        登出
        </Menu.Item>
        </>
        ) : (
            <Menu.Item as={Link} to='signin' className='nav-links'>
            註冊登入
            </Menu.Item>
            )}
            </Menu.Item>
            </li> */}
            </ul>
            {/* {button && <Button buttonStyle='btn--outline'>登入</Button>} */}
            </div>
            </nav>
            </>
            )
        }
        
        export default Navbar
        