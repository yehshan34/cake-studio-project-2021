
import React, { useEffect, useState } from 'react'
import firebase from 'firebase';
import 'firebase/firestore';
import NavbarAdmin from '../NavbarAdmin';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function BookingList() {
    const [bookings, setBookings] = React.useState([]);
    React.useEffect(() => {
        firebase
        .firestore()
        .collection("bookings")
        .onSnapshot((collectionSnapShot) => {
            const data = collectionSnapShot.docs.map(doc => {
                return doc.data();
            });
            setBookings(data);
        });
    }, []);
    
    const onDelete = (booking) => {
        console.log(booking);
        if (window.confirm("確定要刪除此筆訂購資料嗎？")) {
            firebase
            .firestore()
            .collection("bookings")
            .delete().then((err) => {
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
        <h1 className='cakeorder'>後台系統 4 - 預約課程表</h1>
        <div style={{marginTop: "70px", marginBottom: "80px"}}>
        <table className="styled-table" style={{maxWidth:'1800px'}}>
        <thead>
        <tr>
        <th style={{textAlign: 'center'}}>編號</th>
        <th style={{textAlign: 'center'}}>想上課日期</th>
        <th style={{textAlign: 'center'}}>報名課程</th>
        <th style={{textAlign: 'center'}}>姓名</th>
        <th style={{textAlign: 'center'}}>信箱</th>
        <th style={{textAlign: 'center'}}>價錢</th>
        <th style={{textAlign: 'center'}}>人數</th> 
        <th style={{textAlign: 'center'}}>選擇座位</th>
        <th style={{textAlign: 'center'}}>- 其他 -</th>
        </tr>
        </thead>
        <tbody>
        {bookings.map((booking, key) => {
            
            return(
                <tr key={key}>
                <th scope='row'>{key + 1}</th>
                <td>{booking.bookingDate}</td>
                <td>{booking.courseName}<br/>(NTD ${booking.ticketCost})</td>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>NT$ {booking.totalCost}</td>
                <td>{booking.totalSeats} 位</td>
                <td>{(booking.seatNames).join(', ')}</td>
                <td>
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

export default BookingList;
