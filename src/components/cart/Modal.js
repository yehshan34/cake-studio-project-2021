import React,{useState} from 'react'
import {auth,fs} from '../../utils/firebase'
import {useHistory} from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from 'firebase';
import './Modal.css';
toast.configure();

export const Modal = ({totalPrice,totalQty,hideModal}) => {
    const history = useHistory();
    const [receiver, setReceiver]=useState('');
    const [cell, setCell]=useState(null);
    const [residentialAddress, setResidentialAddress]=useState('');
    const [cartPrice]=useState(totalPrice);
    const [cartQty]=useState(totalQty);
    const handleCloseModal=()=>{
        hideModal();
    }
    
    const handleCashOnDelivery=async(e)=>{
        e.preventDefault();
        const email = auth.currentUser.email;
        const userData = await fs.collection('users').doc(email).get();
        const cartData = await fs.collection('Cart ' + email).get();
        const docref = fs.collection('orders').doc();
        docref.set({
            ID: docref.id,
            createdAt: firebase.firestore.Timestamp.now(),
            Name: userData.data().FullName,
            Email: userData.data().Email,
            CartPrice: cartPrice,
            CartQty: cartQty,
        });
        docref.collection('Buyer-Personal-Info').add({
            Name: userData.data().FullName,
            Receiver: receiver,
            Email: userData.data().Email,
            CellNo: cell,
            ResidentialAddress: residentialAddress,
            CartPrice: cartPrice,
            CartQty: cartQty,
            createdAt: firebase.firestore.Timestamp.now(),
        })
        for(var snap of cartData.docs){
            var data = snap.data();
            data.ID = snap.id;
            fs.collection('orders').doc(docref.id).collection('Buyer-Cart').add(data);
            fs.collection('Cart ' + email).doc(snap.id).delete();
        }
        
        hideModal();
        history.push('/homeproduct');
        toast.success('此訂單已成功下訂，歡迎繼續購買', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
        });
    }
    return (
        <div className='shade-area'>
        <div className='modal-container'>
        <form className='form-group' onSubmit={handleCashOnDelivery}>
        <h1 className="data-receiver">訂購人資料</h1>  
        <br></br>
        <div className="receiver-title">收件人姓名</div> 
        <input type="text" placeholder='' className='receiver-name form-control' required
        onChange={(e)=>setReceiver(e.target.value)} value={receiver}
        />
        <br></br>
        <div className="receiver-title">手機號碼</div>                       
        <input type="tel" className='receiver-cellphone form-control' placeholder=''
        required onChange={(e)=>setCell(e.target.value)} value={cell}                        
        />
        <br></br>
        <div className="receiver-title">送達地址</div>       
        <input type="text" className='receiver-address form-control' placeholder=''
        required onChange={(e)=>setResidentialAddress(e.target.value)}
        value={residentialAddress}
        />
        <br></br>
        <label>會員用戶信箱</label>
        <input type="text" className='form-control' readOnly
        required value={auth.currentUser.email}
        />
        <br></br>
        <label>此次產品總數</label>
        <input type="text" className='form-control' readOnly
        required value={'共 '+ cartQty + ' 個'}
        />
        <br></br>
        <label>總金額</label>
        <input type="text" className='form-control' readOnly
        required value={'NT$ '+ cartPrice}
        />
        <br></br>
        <button type='submit' className=' btn-success btn-md success-sending'>確認送出</button>
        </form>
        <div className='delete-icon' onClick={handleCloseModal}>x</div>
        </div>
        </div>
        )
    }