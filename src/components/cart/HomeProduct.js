import React,{useState, useEffect} from 'react'
import { NavbarSub } from './NavbarSub'
import { Products } from './Products'
import {auth,fs} from '../../utils/firebase'
import Footer from '../Footer';
import firebase from 'firebase';
import Navbar from '../../components/Navbar';
import Swal from 'sweetalert2'

export const HomeProduct = (props) => {
    React.useEffect(() => {
        firebase
        .firestore()
        .collection("products")
        .orderBy("createdAt", "desc")
        .get()
        .then((collectionSnapShot) => {
            const data = collectionSnapShot.docs.map(doc => {
                return doc.data();
            });
            setProducts(data);
        });
    }, []);
    
    // getting current user email
    function GetUserEmail(){
        const [email, setEmail]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    setEmail(user.email);
                }
            })
        },[])
        return email;
    }
    
    const email = GetUserEmail();
    
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
    
    // state of products
    const [products, setProducts]=useState([]);
    
    // getting products function
    const getProducts = async ()=>{
        const products = await fs.collection('Products').get();
        const productsArray = [];
        for (var snap of products.docs){
            var data = snap.data();
            data.ID = snap.id;
            productsArray.push({
                ...data
            })
            if(productsArray.length === products.docs.length){
                setProducts(productsArray);
            }
        }
    }
    
    useEffect(()=>{
        getProducts();
    },[])
    
    // state of totalProducts
    const [totalProducts, setTotalProducts]=useState(0);
    // getting cart products   
    useEffect(()=>{        
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart '+ user.email).onSnapshot(snapshot=>{
                    const qty = snapshot.docs.length;
                    setTotalProducts(qty);
                })
            }
        })       
    },[])  
    
    // globl variable
    let Product;
    
    // add to cart
    const addToCart = (product)=>{
        if(email!==null){
            Product=product;
            Product['qty']=1;
            Product['TotalProductPrice']=Product.qty*Product.productPrice;
            fs.collection('Cart '+ email).doc(product.ID).set(Product).then(()=>{
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: '已加入購物車',
                    showConfirmButton: false,
                    timer: 1500
                  })
                console.log('successfully added to cart');
            })
            
        }
        else{
            props.history.push('/login');
        }
        
    }
    
    return (
        <>
        <Navbar />
        <h1 className='cakeorder'>訂購蛋糕</h1>
        <NavbarSub user={user} totalProducts={totalProducts}/>           
        {products.length > 0 && (
            <>
            <div className="menuList">
            <Products products={products} addToCart={addToCart} className="add-to-cart-button"/>
            </div>
            </>
            )}
            {products.length < 1 && (
                <div className='pic-container'>
                </div>
                )}
                <Footer />
                </>
                )
            }
            