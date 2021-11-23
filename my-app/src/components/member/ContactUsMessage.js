import React from 'react'
import NavbarAdmin from '../NavbarAdmin';
import 'firebase/firestore';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import firebase from 'firebase';

function ContactUsMessage() {
    const [forms, setForms] = React.useState([]);
    React.useEffect(() => {
        firebase
        .firestore()
        .collection("contact-form")
        .orderBy("createdAt", "desc")
        .get()
        .then((collectionSnapShot) => {
            const data = collectionSnapShot.docs.map(doc => {
                return doc.data();
            });
            setForms(data);
        });
    }, []);

    return (
        <>
        <NavbarAdmin />
        <h1 className='cakeorder'>後台系統 6 - 客戶回饋</h1>
        <div style={{marginTop: "70px", marginBottom: "80px"}}>
        <table className="styled-table">
        <thead>
        <tr>
        <th style={{textAlign: 'center'}}>編號</th>
        <th style={{textAlign: 'center'}}>發送日期</th>
        <th style={{textAlign: 'center'}}>姓名</th>
        <th style={{textAlign: 'center'}}>信箱</th>
        <th style={{textAlign: 'center'}}>回饋內容</th>
        </tr>
        </thead>
        <tbody>
        {forms.map((form, key) => {
            return(
                <tr key={key}>
                <th scope='row'>{key + 1}</th>
                <td>{form.createdAt?.toDate().toLocaleDateString()}</td>
                <td>{form.fullName}</td>
                <td>{form.emailAddress}</td>
                <td>{form.message}</td>
                </tr>
                );
            })}
            </tbody>
            </table>
            </div>
            </>
            )
}

export default ContactUsMessage
