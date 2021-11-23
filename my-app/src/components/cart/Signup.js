import React,{useState, useEffect} from 'react'
import {auth,fs} from '../../utils/firebase'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import './LoginSignup.css'
import { NavbarSub } from './NavbarSub'
import firebase from 'firebase'
import Navbar from '../../components/Navbar';

export const Signup = () => {
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
                fs.collection('Cart ' + user.email).onSnapshot(snapshot=>{
                    const qty = snapshot.docs.length;
                    setTotalProducts(qty);
                })
            }
        })       
    },[])  

    const history = useHistory();
    
    const [fullName, setFullname]=useState('');
    const [birthday, setBirthday]=useState('');
    const [phonenumber, setPhonenumber]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    
    const [errorMsg, setErrorMsg]=useState('');
    const [successMsg, setSuccessMsg]=useState('');
    
    const handleSignup=(e)=>{
        e.preventDefault();
        // console.log(fullName, email, password);
        auth.createUserWithEmailAndPassword(email,password).then((credentials)=>{
            console.log(credentials);
            fs.collection('users').doc(credentials.user.email).set({
                FullName: fullName,
                Email: email,
                Password: password,
                Birthday: birthday,
                PhoneNumber: phonenumber,
                createdAt: firebase.firestore.Timestamp.now(),
            }).then(()=>{
                setSuccessMsg('註冊成功，系統將自動導入登入畫面。');
                setFullname('');
                setEmail('');
                setPassword('');
                setErrorMsg('');
                setTimeout(()=>{
                    setSuccessMsg('');
                    history.push('/login');
                },3000)
            }).catch(error=>setErrorMsg(error.message));
        }).catch((error)=>{
            setErrorMsg(error.message)
        })
    }
    
    
    return (
        <>
        <Navbar />
        <h1 className='account'>會員專區</h1>
        <NavbarSub user={user} totalProducts={totalProducts} /> 
        <div className='login_div'>
            <form className='login' autoComplete="off" onSubmit={handleSignup}>
            <div className='login-form'>
            <h1>新用戶註冊</h1>
            <div className="form-wrapper">
            <label className="label">姓名</label>
            <input type="text" className='form-control' placeholder="*會員姓名*" required
            onChange={(e)=>setFullname(e.target.value)} value={fullName}></input>
            <br></br>
            <label className="label">生日</label>
            <input type="date" className='form-control' placeholder="*會員生日* ex: 2021/12/31*" onfocus="(this.type='date')" required
            onChange={(e)=>setBirthday(e.target.value)} value={birthday}></input>
            <br></br>
            <label className="label">電話</label>
            <input type="tel" className='form-control' placeholder="*會員電話*" required
            onChange={(e)=>setPhonenumber(e.target.value)} value={phonenumber}></input>
            <br></br>
            <label className="label">信箱</label>
            <input type="email" className='form-control' placeholder="*註冊信箱*" required
            onChange={(e)=>setEmail(e.target.value)} value={email}></input>
            <br></br>
            <label className="label">密碼</label>
            <input type="password" className='form-control' placeholder="*註冊密碼*" required
            onChange={(e)=>setPassword(e.target.value)} value={password}></input>
            <br></br>
            {errorMsg&&<>
                <br></br>
                <div className='error-msg'>{errorMsg}</div>                
                </>}
            {successMsg&&<>
            <div className='success-msg'>{successMsg}</div>
            <br></br>
            </>}
            <div className='actions_login'>
            <span className="signup-action">已經有帳號了嗎？
            <Link to="login" className='signup-link'> 按此登入</Link></span>
            <button type="submit" className='action'>註冊</button>
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