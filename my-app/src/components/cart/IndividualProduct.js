import React from 'react'
import './IndividualProduct.css'

export const IndividualProduct = ({individualProduct, addToCart}) => {
    // console.log(individualProduct);
    const handleAddToCart=()=>{
        addToCart(individualProduct);
    }   
    // return (
    //     <div className='product'>
    //         <div className='product-img'>
    //             <img src={individualProduct.url} alt="product-img"/>
    //         </div>
    //         <div className='product-text title'>{individualProduct.title}</div>
    //         <div className='product-text description'>{individualProduct.description}</div>
    //         <div className='product-text price'>$ {individualProduct.price}</div>
    //         <div className='btn btn-danger btn-md cart-btn' onClick={handleAddToCart}>ADD TO CART</div>
    //     </div> 
    // )
    return (
        
        <div className="menuItem">
        <div className="pic-container">
        <div className='product-img' style={{ backgroundImage: `url(${individualProduct.productImg})` }}></div>
        {/* <img src={individualProduct.url} alt="product-img"/> */}
        <button className='add-to-cart-button' onClick={handleAddToCart}>加入購物車</button>
        </div>
        
        <h1>{individualProduct.productName}</h1>
        {/* <div className='product-text description'>{individualProduct.description}</div> */}
        <p>NTD. {individualProduct.productPrice}</p>
        </div>

        )
    }