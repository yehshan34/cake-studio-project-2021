import React,{useState} from 'react'
import {storage,fs} from '../../utils/firebase'
import firebase from 'firebase';
import "./LoginSignup.css"
import "./AddProducts.css"
import NavbarAdmin from '../NavbarAdmin';
import Swal from 'sweetalert2';

export const AddProducts = () => {
    
    const [productName, setproductName]=useState('');
    const [description, setDescription]=useState('');
    const [productPrice, setproductPrice]=useState('');
    const [productImg, setproductImg]=useState(null);
    const [imageError, setImageError]=useState('');
    const [successMsg, setSuccessMsg]=useState('');
    const [uploadError, setUploadError]=useState('');
    
    const types =['image/jpg','image/jpeg','image/png','image/PNG'];
    const handleProductImg=(e)=>{
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(selectedFile&&types.includes(selectedFile.type)){
                setproductImg(selectedFile);
                setImageError('');
            }
            else{
                setproductImg(null);
                setImageError('please select a valid image file type (png or jpg)')
            }
        }
        else{
            console.log('please select your file');
        }
    }
    
    const handleAddProducts=(e)=>{
        e.preventDefault();
        // console.log(productName, description, productPrice);
        // console.log(image);
        const uploadTask=storage.ref(`product-images/${productImg.name}`).put(productImg);
        uploadTask.on('state_changed',snapshot=>{
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
            console.log(progress);
        },error=>setUploadError(error.message),()=>{
            storage.ref('product-images').child(productImg.name).getDownloadURL().then(url=>{
                fs.collection('products').add({
                    productName,
                    description,
                    productPrice: Number(productPrice),
                    productImg: url,
                    createdAt: firebase.firestore.Timestamp.now(),
                }).then(()=>{
                    Swal.fire({
                        title: "成功送出",
                        text: "已新增產品",
                        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/personal-project-sunny.appspot.com/o/pic4.png?alt=media&token=eadf68d1-84dc-4cff-b890-5e930f9384c0',
                        imageWidth: 400,
                        imageHeight: 300,
                        imageAlt: 'Custom image',
                        customClass: {
                            confirmButton: "confirmbutton",
                            cancelButton: "cancelbutton",
                          },
                      })
                    setSuccessMsg('Product added successfully');
                    setproductName('');
                    setDescription('');
                    setproductPrice('');
                    document.getElementById('file').value='';
                    setImageError('');
                    setUploadError('');
                    setTimeout(()=>{
                        setSuccessMsg('');
                    },3000)
                }).catch(error=>setUploadError(error.message));
            })
        })
    }
    
    return (
        <>
        <NavbarAdmin />
        <h1 className='cakeorder'>後台系統 2 - 產品頁面</h1>
        <div className='login_div'>
        <br></br>
        <form autoComplete="off" className='form-group' onSubmit={handleAddProducts}>
        <h1>新增產品</h1>
        <label className="label">產品名稱</label>
        <input type="text" className='form-control' required
        onChange={(e)=>setproductName(e.target.value)} value={productName}></input>
        <br></br>
        <label className="label">產品描述</label>
        <input type="text" className='form-control' required
        onChange={(e)=>setDescription(e.target.value)} value={description}></input>
        <br></br>
        <label className="label">產品價錢</label>
        <input type="number" className='form-control' required
        onChange={(e)=>setproductPrice(e.target.value)} value={productPrice}></input>
        <br></br>
        <label className="label">上傳產品照片</label>
        <input type="file" id="file" className='form-control' required
        onChange={handleProductImg}></input>
        <br></br>
        {successMsg&&<>
            <div className='success-msg'>{successMsg}</div>
            <br></br>
            </>} 
            <br></br>
            {imageError&&<>
                <br></br>
                <div className=''>{imageError}</div>
                
                </>}
                <br></br>        
                <button type="submit" className='send-product-button'>
                送出
                </button>
                </form>
                {uploadError&&<>
                    <br></br>
                    <div className='error-msg'>{uploadError}</div>
                    
                    </>}
                    
                    </div>
                    </>
                    )
                }