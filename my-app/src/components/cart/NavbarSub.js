import React from 'react'
import {Link} from 'react-router-dom'
// import logo from '../../images/logo_black.png'
import {Icon} from 'react-icons-kit'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import {auth} from '../../utils/firebase'
import {useHistory} from 'react-router-dom'

export const NavbarSub = ({user,totalProducts}) => {

    const history = useHistory();

    const handleLogout=()=>{
        auth.signOut().then(()=>{
            history.push('/login');
        })
    }

    return (
        <div className='navbar_product'>
            <div className='leftside'>
                <div className='logo'>
                    {/* <img src={logo} alt="logo"/> */}
                </div>
            </div>
            <div className='rightside'>

                {!user&&<>
                    <div><Link className='navlink' to="signup">會員註冊</Link></div>
                    <div><Link className='navlink' to="login">會員登入</Link></div>
                </>} 

                {user&&<>
                    <div>Hello, <Link className='navlink' to="/login">{user}</Link></div>
                    <div className='cart-menu-btn'>
                        <Link className='navlink' to="cart">
                            <Icon icon={shoppingCart} size={20}/>
                        </Link>
                        <span className='cart-indicator'>{totalProducts}</span>
                    </div>
                    <div className='btn btn-danger btn-md'
                    onClick={handleLogout}>會員登出</div>
                </>}                     
                                
            </div>
        </div>

    )
}