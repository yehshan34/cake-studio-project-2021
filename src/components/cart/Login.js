import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {auth, fs} from '../../utils/firebase'
import {useHistory} from 'react-router-dom'
import './LoginSignup.css'
import { NavbarSub } from './NavbarSub'
import firebase from 'firebase'
import Navbar from '../../components/Navbar'

export const Login = () => {
    const user = GetCurrentUser();
    const [products, setProducts]=useState([]);
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
    const history = useHistory();
    
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    
    const [errorMsg, setErrorMsg]=useState('');
    const [successMsg, setSuccessMsg]=useState('');
    
    const handleLogin=(e)=>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password).then(()=>{
            setSuccessMsg('?????????????????????????????????????????????????????????');
            setEmail('');
            setPassword('');
            setErrorMsg('');
            setTimeout(()=>{
                setSuccessMsg('');
                history.push('/homeproduct');
            },3000)
        }).catch(error=>setErrorMsg(error.message));
    }
    
    return (
        <>
        <Navbar />
        <h1 className='account'>????????????</h1>
        <NavbarSub user={user} totalProducts={totalProducts} /> 
        <div className='login_div'>
        <form className='login' autoComplete="off"
        onSubmit={handleLogin}>  
        <div className='login-form'>       
        <h1>???????????????</h1>     
        <div className="form-wrapper">
        
        <label className="label">??????</label>
        <input type="email" className='form-control' required
        onChange={(e)=>setEmail(e.target.value)} value={email}></input>
        <br></br>
        <label className="label">??????</label>
        <input type="password" className='form-control' required
        onChange={(e)=>setPassword(e.target.value)} value={password}></input>
        <br></br>
        {successMsg&&<>
            <div className='success-msg'>{successMsg}</div>
            
            </>}
            <br></br>
            {errorMsg&&<>
                <br></br>
                <div className='error-msg'>{errorMsg}</div>                
                </>}
                <div className='actions_login'>
                <span className="signup-action">????????????????????? 
                <Link to="signup" className='signup-link'>   ?????????????????????</Link></span>
                <button type="submit" className="action">??????</button>
                </div>
                </div>
                </div> 
                <div className="login-decoration">
                
                </div>
                </form>
                </div>
                </>
                )
            }