import React from 'react'
import './IndividualProduct.css'

export const IndividualProduct = ({individualProduct, addToCart}) => {
    const handleAddToCart=()=>{
        addToCart(individualProduct);
    }   
    return (
        
        <div className="menuItem">
        <div className="pic-container">
        <div className='product-img' style={{ backgroundImage: `url(${individualProduct.productImg})` }}></div>
        <button className='add-to-cart-button' onClick={handleAddToCart}>加入購物車</button>
        </div>
        
        <h1>{individualProduct.productName}</h1>
        <p>NTD. {individualProduct.productPrice}</p>
        </div>

        )
    }