import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import Navbar from '../Navbar';
import firebase from 'firebase';
import './BookingForm.css';
import './BookingPayment.css'
import $ from 'jquery';
import Swal from 'sweetalert2';

function BookingPayment() {
    const history = useHistory();
    const location = useLocation();
    const name = location.state.name;
    const email = location.state.email;
    const seats = location.state.seats;
    const bookingDate = location.state.bookingDate;
    const courseName = location.state.courseName;
    const allSeatarray = location.state.allSeatarray;
    const ticketCost = location.state.ticketCost;
    const courseImage = location.state.courseImage;
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpireMonth, setCardExpireMonth] = useState('');
    const [cardExpireYear, setCardExpireYear] = useState('');
    const [cardccv, setCardccv] = useState('');
  
    // const startDate = location.state.startDate;
    // const endDate = location.state.endDate;
    // const [email, setEmail] = useState('');
    // const [seats, setSeats] = useState('');
    // const [bookingDate, setBookingDate] = useState('');
    // const [courses, setCourses] = useState('');
    // const [bookedSeats, setBookedSeats] = useState([]);
    const paymentFunction = (e) => {
        // if (cardName === "" || cardNumber === "" || cardExpireMonth==="" || cardExpireYear==="" || cardccv==="") {
        //     Swal.fire({
        //         icon: 'error',
        //         title: '就差最後一步！',
        //         text: '請填寫所有信用卡資訊'
        //       })
        // } else {
        var currentDate = new Date()
        var day = currentDate.getDate()
        var month = currentDate.getMonth() + 1
        var fullyear = currentDate.getFullYear()
        var fulldate = day + "-" + month + "-" + fullyear;
        e.preventDefault();
        firebase.firestore().collection('bookings').doc().set({
            name: name,
            currentDate: fulldate,
            bookingDate: bookingDate,
            courseName: courseName,
            totalSeats: seats,
            seatNames: allSeatarray,
            totalCost: ticketCost * seats,
            email: email,
            ticketCost: ticketCost
        })
        .then (() => {
            Swal.fire({
                title: "恭喜報名成功！",
                text: "我們將寄確認信件說明上課地點與時間",
                imageUrl: 'https://firebasestorage.googleapis.com/v0/b/personal-project-sunny.appspot.com/o/bannerFlower.png?alt=media&token=06f739b8-beaa-4e7b-8667-9d4bad6c722a',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
                customClass: {
                    confirmButton: "confirmbutton",
                    cancelButton: "cancelbutton",
                  },
              })
            history.push({ pathname: '/homecourse'});
        })
        .catch(error => {
            alert(error.message);
        });
    // }
    };

    const backToForm = (e) => {
        history.push({ pathname: '/bookingform', state: { totalCost: ticketCost * seats,name: name, email: email, courseImage: courseImage, courseName: courseName, ticketCost: ticketCost, bookingDate: bookingDate , seats: seats, allSeatarray: allSeatarray} })
    };
    return (
        <>
        <Navbar />
        <h1 className='coursebooking'>訂購課程</h1>
        <div class="modal_payment"  >
        <div class="modal__container">
        <div class="modal__featured">
        <button type="button" class="button--transparent button--close" onClick={backToForm}>
        <svg class="nc-icon glyph" >
        <g><path fill="#ffffff" d="M1.293,15.293L11,5.586L12.414,7l-8,8H31v2H4.414l8,8L11,26.414l-9.707-9.707 C0.902,16.316,0.902,15.684,1.293,15.293z"></path> </g></svg>

        <span class="visuallyhidden">重新填寫表單</span>

        </button>
        <div class="modal__circle"></div>
        
        </div>
        <div class="modal__content">
        <h2>您的報名及付款資訊</h2>

        <div className="payment_details_list" style={{color: 'grey' , padding:'15px 15px 15px 0px', fontSize:'13px'}}>
        <p>姓名：{name}</p>
        <p>信箱：{email}</p>
        <p>報名課程：{courseName}</p>
        <p>上課時間：{bookingDate}</p>
        <p>課程價錢：NT$ {ticketCost} / 一人</p>
        <p>所選教室座位： {(allSeatarray).join(', ')}</p>
        <p>報名人數：共 {seats} 位</p>
        <p>刷卡總金額：NT$ {ticketCost * seats}</p>
        </div>
        
        <form>
        <ul class="form-list">
        <li class="form-list__row">
        <label>持卡人姓名</label>
        <input className="input_payment" type="text" name="" value={cardName} onChange={(e) => setCardName(e.target.value)} />
        </li>
        <li class="form-list__row">
        <label>請輸入您的信用卡卡號</label>
        <div id="input--cc" class="creditcard-icon">
        <input className="input_payment" type="text" name="cc_number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
        </div>
        </li>
        <li class="form-list__row form-list__row--inline">
        <div>
        <label>卡片到期日</label>
        <div class="form-list__input-inline">
        <input className="input_payment" type="text" name="cc_month" placeholder="MM"  pattern="\\d*" minLength="2" maxLength="2" value={cardExpireMonth} onChange={(e) => setCardExpireMonth(e.target.value)} />
        <input  className="input_payment" type="text" name="cc_year" placeholder="YY"  pattern="\\d*" minLength="2" maxLength="2" value={cardExpireYear} onChange={(e) => setCardExpireYear(e.target.value)} />
        </div>
        </div>
        <div>
        <label>
        CVC
        <div  class="button--transparent modal-open button--info">
        {/* <svg class="nc-icon glyph" ></svg>
        <span class="visuallyhidden">什麼是 CVV?</span> */}
        </div>
        </label>
        <input className="input_payment" type="text" name="cc_cvc" placeholder="123" pattern="\\d*" minlength="3" maxlength="4"  value={cardccv} onChange={(e) => setCardccv(e.target.value)} />
        </div>
        </li>
        <li class="form-list__row form-list__row--agree">
        {/* <label>
        <input type="checkbox" name="save_cc" checked="checked" />
        Save my card for future purchases
        </label> */}
        </li>
        <li>
        </li>
        </ul>
        <button type="submit" class="button_paynow" onClick={paymentFunction}>確認付款</button>
        </form>
        
        </div> 
       
        </div> 
        </div> 

        </>
        )
    }
    
    export default BookingPayment;
    