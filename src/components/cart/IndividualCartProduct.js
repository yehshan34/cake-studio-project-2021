import React from 'react'
import {Icon} from 'react-icons-kit'
import {plus} from 'react-icons-kit/feather/plus'
import {minus} from 'react-icons-kit/feather/minus'
import {auth,fs} from '../../utils/firebase'
import Swal from 'sweetalert2';

export const IndividualCartProduct = ({cartProduct,cartProductIncrease,cartProductDecrease}) => {

    const handleCartProductIncrease=()=>{
        cartProductIncrease(cartProduct);
    }

    const handleCartProductDecrease=()=>{
        cartProductDecrease(cartProduct);
    }

    const handleCartProductDelete=()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.email).doc(cartProduct.ID).delete().then(()=>{
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: '已刪除此商品',
                        showConfirmButton: false,
                        timer: 1000
                      })
                    console.log('successfully deleted');
                })
            }
        })
    }
    
    return (
        <div className='product'>
            <div className='product-img-box'>
            <div className='product-img'>
                <img src={cartProduct.productImg} alt="product-img"/>
            </div>
            </div>
            <div className='product-text title'>{cartProduct.productName}</div>
            {/* <div className='product-text description'>{cartProduct.description}</div> */}
            <div className='product-text price'>NTD. {cartProduct.productPrice}</div>
            <span>數量</span>
            <div className='product-text quantity-box'>
                <div className='action-btns minus' onClick={handleCartProductDecrease} >
                    <Icon icon={minus} size={20}/>
                </div>                
                <div>{cartProduct.qty}</div>               
                <div className='action-btns plus' onClick={handleCartProductIncrease}>
                    <Icon icon={plus} size={20}/>
                </div>
            </div>
            <div className='product-text cart-price'>NTD. {cartProduct.TotalProductPrice}</div>
            <div className='btn btn-danger btn-md cart-btn' onClick={handleCartProductDelete} style={{color:'white'}}>刪除</div>            
        </div>
    )
}