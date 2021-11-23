// import React, { useEffect, useState } from 'react';
// import { useLocation, useHistory } from 'react-router-dom';
// import $ from 'jquery';
// import Navbar from '../Navbar';
// import firebase from 'firebase';
// // import './TicketBookingForm.css';
// import './BookingForm.css'
// import { flexibleCompare } from '@fullcalendar/react';

// export const TicketBookingForm = () => {
//     const history = useHistory();
//     const location = useLocation();
//     // const username = location.state.name;
//     const courseName = location.state.courseName;
//     const ticketCost = location.state.ticketCost;
//     const courseImage = location.state.courseImage;
//     const bookingDate = location.state.bookingDate;
//     const name = location.state.name;
//     const email = location.state.email;
//     const seats = location.state.seats;
//     // var email = location.state.email;
//     const [courses, setCourses] = useState('');
    
//     //console.log(username, mobile, courseName, ticketcost, bookingdate);
//     // const [name, setName] = useState('');
//     // const [email, setEmail] = useState('');
//     // const [seats, setSeats] = useState('');
//     const allSeatarray = [];
//     const [bookedSeats, setBookedSeats] = useState([]);
    
    
//     // const startSelect = (e) => {
//     //     e.preventDefault();
//     //     if (name === "" || seats === "" || email==="") {
//     //         alert("請確實填寫 * 必填資訊");
//     //     } else {
//     //         $(".inputForm *").prop("disabled", true);
//     //         $(".seatStructure *").prop("disabled", false);
//     //         // $(".title").hide();
//     //         // $(".sub-title").hide();
//     //         $(".inputForm *").hide();
//     //         $(".confirm-selection").show();
            
//     //         document.getElementById("notification").innerHTML = "<p className='alert-message'style='cursor:not-allowed;font-weight:bold;font-size:19px;margin:10px;background:rgb(58, 163, 168);color:#fff;padding:20px;letter-spacing: 2px;'>請點選您想要的座位</p>";
//     //         firebase.firestore().collection("courseSeats").where("courseName", "==", courseName).where("bookingDate", "==", bookingDate).get().then((snapshot) => snapshot.forEach(ele => {
//     //             var data = ele.data();
//     //             console.log(data.seatNames);
//     //             //$("#" + data.seatnames).attr("disabled", true);
//     //             $("#" + data.seatNames).attr("disabled", true);
//     //             // $("#" + data.seatnames).css("background-color", "red");
//     //             setBookedSeats(arr => [...arr, { data: data }]);
//     //         }))
//     //     }
        
//     // }
//     //  const startSelect = (e) => {
//     //     e.preventDefault();
        
//     //         $(".inputForm *").prop("disabled", true);
//     //         $(".seatStructure *").prop("disabled", false);
//     //         // $(".title").hide();
//     //         // $(".sub-title").hide();
//     //         $(".inputForm *").hide();
//     //         $(".confirm-selection").show();
            
//     //         // document.getElementById("notification").innerHTML = "<p className='alert-message'style='cursor:not-allowed;font-weight:bold;font-size:19px;margin:10px;background:rgb(58, 163, 168);color:#fff;padding:20px;letter-spacing: 2px;'>請點選您想要的座位</p>";
//     //         firebase.firestore().collection("courseSeats").where("courseName", "==", courseName).where("bookingDate", "==", bookingDate).get().then((snapshot) => snapshot.forEach(ele => {
//     //             var data = ele.data();
//     //             console.log(data.seatNames);
//     //             //$("#" + data.seatnames).attr("disabled", true);
//     //             $("#" + data.seatNames).attr("disabled", true);
//     //             // $("#" + data.seatnames).css("background-color", "red");
//     //             setBookedSeats(arr => [...arr, { data: data }]);
//     //         }))

        
//     // }
    
    
//     const confirmSelection = () => {
        
//         if ($("input:checked").length == seats) {
//             $(".seatStructure *").prop("disabled", true);
//             $(".confirm-selection").hide();
//             $(".pay-btn").show();
//             var allNameVals = [];
//             var allNumberVals = [];
//             var allSeatsVals = [];
            
//             //Storing in Array
//             allNameVals.push(name);
//             allNumberVals.push(seats);
//             $('#seatsBlock :checked').each(function () {
//                 allSeatsVals.push($(this).val());
//                 allSeatarray.push($(this).val());
//             });
            
//             //Displaying 
//             $('#nameDisplay').val(allNameVals);
//             $('#NumberDisplay').val(allNumberVals);
//             $('#seatsDisplay').val(allSeatsVals);
//             console.log(allSeatarray);
//         }
//         else {
//             alert("請選擇 " + (seats) + " 個座位，謝謝")
//         }
//     }
    
//     const paymentFunction = (e) => {
//         console.log('222');
//         var currentDate = new Date()
//         var day = currentDate.getDate()
//         var month = currentDate.getMonth() + 1
//         var fullyear = currentDate.getFullYear()
//         var fulldate = day + "-" + month + "-" + fullyear;
//         e.preventDefault();
//         firebase.firestore().collection('bookings').doc().set({
//             name: name,
//             currentDate: fulldate,
//             bookingDate: bookingDate,
//             courseName: courseName,
//             totalSeats: seats,
//             seatNames: allSeatarray,
//             totalCost: ticketCost * seats,
//             email: email,
//         })
//         .then (() => {
//             //   setButtonPopup(true);
//         })
//         .catch(error => {
//             alert(error.message);
//         });
//     };
//     // const paymentFunction = (e) => {
//     //     var currentDate = new Date()
//     //     var day = currentDate.getDate()
//     //     var month = currentDate.getMonth() + 1
//     //     var fullyear = currentDate.getFullYear()
//     //     var fulldate = day + "-0" + month + "-" + fullyear;
//     //     console.log(currentDate);
//     //     e.preventDefault();
    
//     //         // key: "rzp_test_xz4tqVIIc6MRSi", // Enter the Key ID generated from the Dashboard
//     //         // key_secret: "7kMiCxUxaQrhuPQ7WJFs8AKn",
//     //         // amount: (ticketCost * 100) * seats, 
//     //         // currency: "NTD",
//     //         // name: "Sunny's CAKE Studio",
//     //         // description: courseName,
//     //         // image: courseImage,
//     //         // handler: 
//     //         // function (response) {
//     //             firebase.firestore().collection("bookings").doc().set({
//     //                 currentDate: fulldate,
//     //                 bookingDate: bookingDate,
//     //                 courseName: courseName,
//     //                 totalSeats: seats,
//     //                 seatNames: allSeatarray,
//     //                 totalCost: ticketCost * seats,
//     //             }).then(() => {
//     //                 firebase.firestore().collection("courseSeats").add({
//     //                     bookingDate: bookingDate,
//     //                     courseName: courseName,
//     //                     seatNames: allSeatarray,
//     //                 });
//     //                 alert("Your Booking Was Successfull");
//     //                 history.push({ pathname: "/success", state: { bookingDate: bookingDate, totalSeats: seats, seatNames: allSeatarray, name: name, courseName: courseName, ticketCost: ticketCost } })
//     //             }).catch((err) => console.log(err));
    
//     //         }
//     //         // prefill: {
//     //         //     name: name,
//     //         //     email: email,
//     //         // },
//     //         // notes: {
//     //         //     address: "Sunny Cake Studio"
//     //         // },
//     //         // theme: {
//     //         //     color: "#3399cc"
//     //         // }
    
//     //     // var pay = new window.Razorpay(options);
//     //     // pay.open();
//     //     // options.open();
//     // // }
    
    
//     useEffect(() => {
//         $(".seatStructure *").prop("disabled", true);
//         $(".displayerBoxes *").prop("disabled", true);
//         $(".pay-btn").hide();
//         $(".confirm-selection").hide();
        
//         //$(".booking-pdf").hide();
        
        
        
//     }, [])
//     return (
//         <>
//         <Navbar />
//         <h1 className='coursebooking'>課程訂購</h1>
//         <div className="wrapper_course">
        
//         {/* <div className="form-container sign-in-container ticket-booking" > */}
//         <form className="seat-pick" >
        
//         {/* <span className="sub-title">學費：NT$ {ticketCost} / ㄧ人</span> */}
//         <br />
//         <div className="inner_wrapper_course_ticket" >
//         {/* <div className="inputForm"> */}
//         {/* <div className="inputForm"> */}
//         {/* <h1 className="title-seat">請填寫以下資料</h1>
//         <label className="label-course-ticket">* 請填寫訂購姓名：</label>
//         <input className="form-course-fillout-ticket" type="text" placeholder="" value={name} onChange={(e) => setName(e.target.value)} />
//         <label className="label-course-ticket">* 請填寫信箱：</label>
//         <input className="form-course-fillout-ticket" type="email" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} />
//         <label className="label-course-ticket">* 請填寫報名人數：</label>
//         <input className="form-course-fillout-ticket" type="number" placeholder="" value={seats} onChange={(e) => setSeats(e.target.value)} /> */}
//        {/* <input type="button" value="選擇上課教室座位 &rarr;" className="pick-seats" onClick={startSelect} /> */}
//         {/* </div> */}
//         {/* </div> */}
//         <div className="actionform_course_ticket">
//         <div className="seatStructure">
//         <center>
//         <p className='alert-message' id="notification" style={{cursor:'not-allowed',fontWeight:'bold',fontSize:'19px',margin:'10px',background:'rgb(58, 163, 168)',color:'#fff',padding:'20px',letterSpacing: '2px'}}>
//         以下請選擇 - {seats} 個您上課想坐的位置
//         </p>
//         <table id="seatsBlock" style={{ marginLeft: "20%" , paddingTop: '30px'}}>
        
//         <tr>
//         <td></td>
//         <td className="seatNum">1</td>
//         <td className="seatNum">2</td>
//         <td></td>
//         <td className="seatNum">3</td>
//         <td className="seatNum">4</td>
//         </tr>
//         <tr>
//         <td className="alpha_list">A</td>
//         <td><input type="checkbox" className="seats" value="A1" id="A1" /></td>
//         <td><input type="checkbox" className="seats" value="A2" id="A2" /></td>
//         <td className="seatGap"></td>
//         <td><input type="checkbox" className="seats" value="A3" id="A3" /></td>
//         <td><input type="checkbox" className="seats" value="A4" id="A4" /></td>
        
        
//         </tr>
//         <tr>
//         <td className="alpha_list">B</td>
//         <td><input type="checkbox" className="seats" value="B1" /></td>
//         <td><input type="checkbox" className="seats" value="B2" /></td>
//         <td></td>
//         <td><input type="checkbox" className="seats" value="B3" /></td>
//         <td><input type="checkbox" className="seats" value="B4" /></td>
//         </tr>
        
//         <tr>
//         <td colspan="14">
//         <div className="screen" style={{
//             width: '120px',
//             height: '60px',
//             background: 'rgb(216 208 78)',
//             color: '#fff',
//             lineHeight: '20px',
//             fontSize: '17px',
//             margin: '0 auto',
//             textAlign: 'center',
//             display: 'flex',
//             alignItems:'center',
//             justifyContent:'center',
//             letterSpacing: '0.5px',
//             borderRadius: '35%',
//         }}>廚房位置</div>
//         </td>
//         <td rowspan="20">
        
//         <div className="smallBox greenBox" style={{ width: 'max-content', color: 'grey' }}>可選擇座位</div>
//         <div className="smallBox redBox" style={{ width: 'max-content',color: 'grey'  }}>已選擇座位</div>
//         <div className="smallBox emptyBox" style={{ width: 'max-content',color: 'grey'  }}>空位</div>
//         <br /><br />
//         </td>
        
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         </tr>
        
//         <tr>
//         <td className="alpha_list">C</td>
//         <td><input type="checkbox" className="seats" value="C1" /></td>
//         <td><input type="checkbox" className="seats" value="C2" /></td>
//         <td></td>
//         <td><input type="checkbox" className="seats" value="C3" /></td>
//         <td><input type="checkbox" className="seats" value="C4" /></td>
        
        
        
//         </tr>
//         <tr>
//         <td className="alpha_list">D</td>
//         <td><input type="checkbox" className="seats" value="D1" /></td>
//         <td><input type="checkbox" className="seats" value="D2" /></td>
//         <td></td>
//         <td><input type="checkbox" className="seats" value="D3" /></td>
//         <td><input type="checkbox" className="seats" value="D4" /></td>
//         </tr>
//         <tr>
//         </tr>
//         </table>
//         <br />
//         <input type="button" value="確認已選座位 &rarr;" className="confirm-selection" id="con-select" 
//         onClick={confirmSelection} onclick="updateTextArea()" 
//         style={{background:'#b8596f',
//         border: 'none', color:'white', padding:'10px 15px',
//         cursor:'pointer',
//         borderRadius: '23.5px',
//         letterSpacing: '2px',
//         fontSize: '19px',
//         fontWeight: 'bold',
//         height:'55px',
//         width: '65%',
//         marginTop: '18px'
//     }}/>
//     </center>
//     </div>
//     <br /><br />
//     <div className="displayerBoxes">
//     <center>
//     <table className="Displaytable" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
//     <tr>
//     <th>姓名</th>
//     <th>上課人數</th>
//     <th>座位</th>
//     </tr>
//     <tr>
//     <td><textarea className="textarea-seat" id="nameDisplay"></textarea></td>
//     <td><textarea className="textarea-seat" id="NumberDisplay"></textarea></td>
//     <td><textarea className="textarea-seat" id="seatsDisplay"></textarea></td>
//     </tr>
//     </table>
//     </center>
//     </div>
//     <div className="form-select-seat" >
//     <button 
//     className="pay-btn select-seat-ticket-button" onClick={paymentFunction}
//    >立即付款</button>
//     {/* onClick={()=>{paymentFunction();}
//     } */}
//     </div>
//     </div>
//     </div>
//     </form>
    
    
    
    
//     </div>
    
//     </>
//     )
// }
