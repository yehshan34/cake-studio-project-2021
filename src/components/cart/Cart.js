import React,{useState, useEffect} from 'react'
import {NavbarSub} from './NavbarSub'
import {auth,fs} from '../../utils/firebase'
import { CartProducts } from './CartProducts';
import axios from 'axios';
import {useHistory} from 'react-router-dom'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from './Modal';
import {Link} from 'react-router-dom'
import Navbar from '../../components/Navbar'
import './Cart.css';
import ReactDOM from "react-dom";

const PayPalButton = window.paypal_sdk.Buttons.driver("react", { React, ReactDOM });


toast.configure();

export const Cart = () => { 
    
    // show modal state
    const [showModal, setShowModal]=useState(false);
    
    // trigger modal
    const triggerModal=()=>{
        setShowModal(true);
    }
    
    // hide modal
    const hideModal=()=>{
        setShowModal(false);
    }
    
    // getting current user function
    function GetCurrentUser(){
        const [user, setUser]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    fs.collection('users').doc(user.email).get().then(snapshot=>{
                        setUser(snapshot.data().FullName);
                    })
                }
                else{
                    setUser(null);
                }
            })
        },[])
        return user;
    }
    
    const user = GetCurrentUser();
    
    // state of cart products
    const [cartProducts, setCartProducts]=useState([]);
    
    // getting cart products from firestore collection and updating the state
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart '+ user.email).onSnapshot(snapshot=>{
                    const newCartProduct = snapshot.docs.map((doc)=>({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setCartProducts(newCartProduct);                    
                })
            }
            else{
                console.log('user is not signed in to retrieve cart');
            }
        })
    },[])
    
    // console.log(cartProducts);
    
    // getting the qty from cartProducts in a seperate array
    const qty = cartProducts.map(cartProduct=>{
        return cartProduct.qty;
    })
    
    // reducing the qty in a single value
    const reducerOfQty = (accumulator, currentValue)=>accumulator+currentValue;
    
    const totalQty = qty.reduce(reducerOfQty,0);
    
    // console.log(totalQty);
    
    // getting the TotalProductPrice from cartProducts in a seperate array
    const price = cartProducts.map((cartProduct)=>{
        return cartProduct.TotalProductPrice;
    })
    
    // reducing the price in a single value
    const reducerOfPrice = (accumulator,currentValue)=>accumulator+currentValue;
    
    const totalPrice = price.reduce(reducerOfPrice,0);
    
    // global variable
    let Product;
    
    // cart product increase function
    const cartProductIncrease=(cartProduct)=>{
        Product=cartProduct;
        Product.qty=Product.qty+1;
        Product.TotalProductPrice=Product.qty*Product.productPrice;
        // updating in database
        auth.onAuthStateChanged(user=>{
            if(user){
                fs
                .collection('Cart '+ user.email)
                .doc(cartProduct.ID)
                .update(Product).then(()=>{
                    console.log('increment added');
                })
            }
            else{
                console.log('user is not logged in to increment');
            }
        })
    }
    
    // cart product decrease functionality
    const cartProductDecrease =(cartProduct)=>{
        Product=cartProduct;
        if(Product.qty > 1){
            Product.qty=Product.qty-1;
            Product.TotalProductPrice=Product.qty*Product.productPrice;
            // updating in database
            auth.onAuthStateChanged(user=>{
                if(user){
                    fs.collection('Cart '+ user.email).doc(cartProduct.ID).update(Product).then(()=>{
                        console.log('decrement');
                    })
                }
                else{
                    console.log('user is not logged in to decrement');
                }
            })
        }
    }
    
    // state of totalProducts
    const [totalProducts, setTotalProducts]=useState(0);
    // getting cart products   
    useEffect(()=>{        
        auth.onAuthStateChanged(user=>{
            if(user){
                fs
                .collection('Cart '+ user.email)
                .onSnapshot(snapshot=>{
                    const qty = snapshot.docs.length;
                    setTotalProducts(qty);
                })
            }
        })       
    },[])
    
    // charging payment
    const history = useHistory();
    const handleToken = async(token)=>{
        //  console.log(token);
        const cart = {name: 'All Products', totalPrice}
        const response = await axios.post('http://localhost:8080/checkout',{
        token,
        cart
    })
    console.log(response);
    let {status}=response.data;
    console.log(status);
    if(status==='success'){
        history.push('/homeproduct');
        toast.success('您已成功下此訂單！歡迎繼續選購。', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            icon: "🚀"
        });
        
        const email = auth.currentUser.email;
        const carts = await fs.collection('Cart '+ email).get();
        for(var snap of carts.docs){
            fs.collection('Cart '+ email).doc(snap.id).delete();
        }
    }
    else{
        alert('Something went wrong in checkout');
    }
}


// paypal

const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: `${totalPrice}`,
            currency: "NTD",
          },
        },
      ],
    });
  }

const onApprove = async(data, actions) => {
    console.log(data);
    history.push('/homeproduct');
        toast.success('您已成功下此訂單！歡迎繼續選購。', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            icon: "🚀"
        });
        
        const email = auth.currentUser.email;
        const carts = await fs.collection('Cart '+ email).get();
        for(var snap of carts.docs){
            fs.collection('Cart '+ email).doc(snap.id).delete();
        }
        triggerModal();
    return actions.order.capture();
}


return (
    <>
    <Navbar />
    <h1 className='cartinfo'>我的購物車</h1>
    <NavbarSub user={user} totalProducts={totalProducts} />           
    <br></br>
    {cartProducts.length > 0 && (
        <div className='container-fluid'>
        {/* <h1 className='text-center'>購物車</h1> */}
        <div className='products-box'>
        <CartProducts cartProducts={cartProducts}
        cartProductIncrease={cartProductIncrease}
        cartProductDecrease={cartProductDecrease}
        />
        </div>
        <div className='summary-box'>
        <h5>購物車小計</h5>
        <br></br>
        <div>
        產品總數量： <span>{totalQty} 個</span>
        </div>
        <div>
        付款總金額： <span>NT$ {totalPrice}</span>
        </div>
        <br></br>
        {/* <StripeCheckout
            stripeKey='pk_test_51Hhu6bK4kL4WRmvGEUkTmdFw1lUtTAnadBSDb0eXGuA2JJGrntIBdm10llYu5RbPbLbaS1My74Rgdi0n5ePYIGB600p3V4GKmK'
            token={handleToken}
            billingAddress
            shippingAddress
            name='All Products'
            amount={totalPrice * 100}
        ></StripeCheckout> */}
        <PayPalButton currency="NTD" value={totalPrice}
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
        />
        <h6 className='text-center'
        style={{marginTop: '7px', marginBottom: '10px', display:'flex', justifyContent:'center',fontSize:'14px'}}>或</h6> 
        <button className='btn btn-secondary btn-md' id="button-paybyhand"
        onClick={()=>{console.log("ggg"); triggerModal();}}>貨到付款</button>                                                                                                                                             
        </div>                                    
        </div>
        )}
        {cartProducts.length < 1 && (
            <>
            <div className='container-fluid' style={{textAlign:"center", fontSize:'25px', marginTop:"100px"}}>購物車空空，尚未選擇商品</div>
            <Link to="homeproduct" style={{curser:'pointer', textDecoration:"none"}}><button style={{padding: "12px 55px", 
            borderRadius:"5px", 
            backgroundColor:"#c74060", border:"none", display:"flex", margin:"100px auto",fontSize:"20px" ,color:"white", cursor:"pointer"}}>
            開始選購
            </button></Link>
            </>
            ) }
            
            {showModal===true&&(
                <Modal totalPrice={totalPrice} totalQty={totalQty}
                hideModal={hideModal}
                />
                )}          
                
                </>
                )
            }