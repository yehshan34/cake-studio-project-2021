import React, { useEffect, useState } from 'react'
import firebase from 'firebase';
import './Member.css'
import 'firebase/firestore';
import NavbarAdmin from '../NavbarAdmin';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function Member() {
    const [users, setUsers] = React.useState([]);
    React.useEffect(() => {
        firebase
        .firestore()
        .collection("users")
        .get()
        .then((collectionSnapShot) => {
            const data = collectionSnapShot.docs.map(doc => {
                return doc.data();
            });
            setUsers(data);
        });
    }, []);
    
    const onDelete = (email) => {
        console.log(email);
        if (window.confirm("確定要刪除此筆會員資料嗎？")) {
            firebase
            .firestore()
            .collection("users")
            .doc(email).delete().then((err) => {
                if(err) {
                    toast.error(err)
                } else {
                    toast.success("已成功刪除囉！");
                }
            })
        }
    };

    return (
        <>
        <NavbarAdmin />
        <h1 className='cakeorder'>後台系統 5 - 會員資料</h1>
        <div style={{marginTop: "70px", marginBottom: "80px"}}>
        <table className="styled-table">
        <thead>
        <tr>
        <th style={{textAlign: 'center'}}>編號</th>
        <th style={{textAlign: 'center'}}>註冊日期</th>
        <th style={{textAlign: 'center'}}>姓名</th>
        <th style={{textAlign: 'center'}}>信箱</th>
        <th style={{textAlign: 'center'}}>電話</th>
        <th style={{textAlign: 'center'}}>生日</th>
        <th style={{textAlign: 'center'}}>- 其他 -</th>
        </tr>
        </thead>
        <tbody>
        {users.map((user, key) => {
            
            return(
                <tr key={key}>
                <th scope='row'>{key + 1}</th>
                <td>{user.createdAt?.toDate().toLocaleDateString()}</td>
                <td>{user.FullName}</td>
                <td>{user.Email}</td>
                <td>{user.PhoneNumber}</td>
                <td>{user.Birthday}</td>
                <td>
                {/* <Link to= {`/update/${user}`}>
                <button className="button_member button_edit">修改</button>
                </Link> */}
                
                <button className="button_member 
                button_delete" onClick={()=> onDelete(user.Email)}>刪除
                </button>
                
                {/* <Link to= {`/view/${user}`}>
                <button className="button_member button_view">查看</button>
                </Link> */}
                </td>
                </tr>
                );
            })}
            </tbody>
            </table>
            </div>
            </>
            )
        }
        
        export default Member
        