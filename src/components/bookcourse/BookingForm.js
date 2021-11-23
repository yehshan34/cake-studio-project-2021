import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import Navbar from '../Navbar';
import firebase from 'firebase';
import './BookingForm.css';
// import './TicketBookingForm.css'
import $ from 'jquery';
import Swal from 'sweetalert2';


export const BookingForm = (props) => {
    const history = useHistory();
    const location = useLocation();
    // const name = location.state.name;
    const courseName = location.state.courseName;
    const ticketCost = location.state.ticketCost;
    const courseImage = location.state.courseImage;
    const startDate = location.state.startDate;
    const endDate = location.state.endDate;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [seats, setSeats] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const [courses, setCourses] = useState('');
    const [bookedSeats, setBookedSeats] = useState([]);
    const allSeatarray = [];
    
    $(".wrapper_course_later").hide();
    $(".displayerBoxes").hide();
    $(".alert-message-seats").hide();
    
    React.useEffect(() => {
        firebase
        .firestore()
        .collection("current-courses")
        .get()
        .then((collectionSnapShot) => {
            const data = collectionSnapShot.docs.map(doc => {
                return doc.data();
            });
            setCourses(data);
        });
    }, []);
    
    const startSelect = (e) => {
        
        e.preventDefault();
        if (name === "" || bookingDate === "" || email==="" || seats==="") {
            Swal.fire({
                title: "請填寫所有 * 必填欄位",
                text: "Sunny's Studio 感謝您的預約",
                imageUrl: 'https://firebasestorage.googleapis.com/v0/b/personal-project-sunny.appspot.com/o/pic4.png?alt=media&token=eadf68d1-84dc-4cff-b890-5e930f9384c0',
                imageWidth: 400,
                imageHeight: 300,
                imageAlt: 'Custom image',
                customClass: {
                    confirmButton: "confirmbutton",
                    cancelButton: "cancelbutton",
                },
            })
        } else {
            $(".wrapper_course").hide();
            $(".wrapper_course_later").show();
            $(".inputForm *").prop("disabled", true);
            $(".seatStructure *").prop("disabled", false);
            $(".inputForm *").hide();
            $(".confirm-selection").show();
            
            firebase.firestore().collection("courseSeats").where("courseName", "==", courseName).where("bookingDate", "==", bookingDate).get().then((snapshot) => snapshot.forEach(ele => {
                var data = ele.data();
                console.log(data.seatNames);
                $("#" + data.seatNames).attr("disabled", true);
                setBookedSeats(arr => [...arr, { data: data }]);
            }))
        }
    }
    
    const confirmSelection = () => {
        
        if ($("input:checked").length == seats) {
            $(".seatStructure *").prop("disabled", true);
            $(".confirm-selection").hide();
            $(".pay-btn").show();
            $(".displayerBoxes").show();
            $(".alert-message").hide();
            $(".alert-message-seats").show();
            var allNameVals = [];
            var allNumberVals = [];
            var allSeatsVals = [];
            
            allNameVals.push(name);
            allNumberVals.push(seats);
            $('#seatsBlock :checked').each(function () {
                allSeatsVals.push($(this).val());
                allSeatarray.push($(this).val());
            });
            
            $('#nameDisplay').val(allNameVals);
            $('#NumberDisplay').val(allNumberVals);
            $('#seatsDisplay').val(allSeatsVals);
            console.log(allSeatarray);
        }
        else {
            Swal.fire({
                title: "快要完成預約囉",
                text: `請選擇您所報名的 ${seats} 個座位，謝謝`,
                imageUrl: 'https://firebasestorage.googleapis.com/v0/b/personal-project-sunny.appspot.com/o/logo_black.png?alt=media&token=01ec64a3-e007-44e2-b740-777ec24cc102',
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: 'Custom image',
                customClass: {
                    confirmButton: "confirmbutton",
                    cancelButton: "cancelbutton",
                },
            })
        }
    }
    
    const startPayment = (e) => {
        var currentDate = new Date()
        var day = currentDate.getDate()
        var month = currentDate.getMonth() + 1
        var fullyear = currentDate.getFullYear()
        var fulldate = day + "-" + month + "-" + fullyear;
        var totalCost = ticketCost * seats;
        history.push({ pathname: '/bookingpayment', state: { totalCost: totalCost, currentDate: fulldate,name: name, email: email, courseImage: courseImage, courseName: courseName, ticketCost: ticketCost, bookingDate: bookingDate , seats: seats, allSeatarray: allSeatarray} })
    };
    
    const onCheckLimit = (e) => {
        
        const parsedQty = Number.parseInt(e.target.value)
        if (parsedQty > 16) {
            setSeats(16)
        } else if (parsedQty < 1) {
            setSeats(1)
        } else {
            setSeats(parsedQty)
        }
    }
    
    useEffect(() => {
        $(".seatStructure *").prop("disabled", true);
        $(".displayerBoxes *").prop("disabled", true);
        $(".pay-btn").hide();
        $(".confirm-selection").hide(); 
    }, [])
    
    
    return (
        <>
        <Navbar />
        <h1 className='coursebooking'>訂購課程</h1>
        <div className="wrapper_course">
        <div className="inner_wrapper_course" >
        <div className="image_holder">
        <img className="course-pic-image" src={courseImage} alt="course-img" />
        </div>
        <form className="actionform_course">
        <h1>{courseName}</h1>
        <p>一人費用： NT$ {ticketCost}</p>
        <br />
        <label className="label-course">* 請填寫姓名：</label>
        <input className="form-course-fillout"
        type="text" placeholder="" style={{fontSize:"15px" , cursor:'pointer'}}  value={name} onChange={(e) => setName(e.target.value)}  />
        <label className="label-course">* 請填寫收件信箱：</label>
        <input className="form-course-fillout" type="email" placeholder="" style={{fontSize:"15px" , cursor:'pointer'}} value={email} onChange={(e) => setEmail(e.target.value)}  />
        <label className="label-course">* 請填寫報名人數：（最少 1 人 / 最多 16 位）</label>
        <input className="form-course-fillout" type="number" 
        value={seats} style={{fontSize:"15px" , cursor:'pointer'}} onChange={(e) => onCheckLimit(e)} />
        <label className="label-course">* 請選擇上課日期：</label>
        <input className="form-course-fillout" type="date" placeholder="選擇上課時間" style={{fontSize:"15px" , cursor:'pointer'}} max={endDate} min={startDate} value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
        
        <div className="form-select-seat">
        <button className="select-seat-button"onClick={startSelect}>開始選擇教室座位 &rarr; </button>
        </div>
        </form>
        </div>
        </div>
        
        
        
        <div className="wrapper_course_later">
        <form className="seat-pick" >
        <br />
        <div className="inner_wrapper_course_ticket" >
    <div className="actionform_course_ticket">
    <div className="seatStructure">
    <center>
    <p className='alert-message' id="notification" style={{cursor:'not-allowed',fontWeight:'bold',fontSize:'19px',margin:'10px',background:'rgb(58, 163, 168)',color:'#fff',padding:'20px',letterSpacing: '2px'}}>
    您的報名人數：共 {seats} 位，請任選以下 {seats} 個座位。
    </p>
    <p className='alert-message-seats' id="notification" style={{cursor:'not-allowed',fontWeight:'bold',fontSize:'19px',margin:'10px',background:'rgb(58, 163, 168)',color:'#fff',padding:'20px',letterSpacing: '2px'}}>
    以下為您所選擇的 {seats} 個座位。
    </p>
    <table id="seatsBlock" style={{ marginLeft: "20%" , paddingTop: '30px'}}>
    
    <tr>
    <td></td>
    <td className="seatNum">1</td>
    <td className="seatNum">2</td>
    <td></td>
    <td className="seatNum">3</td>
    <td className="seatNum">4</td>
    </tr>
    <tr>
    <td className="alpha_list">A</td>
    <td><input type="checkbox" className="seats" value="A1" id="A1" /></td>
    <td><input type="checkbox" className="seats" value="A2" id="A2" /></td>
    <td className="seatGap"></td>
    <td><input type="checkbox" className="seats" value="A3" id="A3" /></td>
    <td><input type="checkbox" className="seats" value="A4" id="A4" /></td>
    
    
    </tr>
    <tr>
    <td className="alpha_list">B</td>
    <td><input type="checkbox" className="seats" value="B1" /></td>
    <td><input type="checkbox" className="seats" value="B2" /></td>
    <td></td>
    <td><input type="checkbox" className="seats" value="B3" /></td>
    <td><input type="checkbox" className="seats" value="B4" /></td>
    </tr>
    
    <tr>
    <td colspan="14">
    <div className="screen" style={{
        width: '120px',
        height: '60px',
        background: 'rgb(216 208 78)',
        color: '#fff',
        lineHeight: '20px',
        fontSize: '17px',
        margin: '0 auto',
        textAlign: 'center',
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
        letterSpacing: '0.5px',
        borderRadius: '35%',
    }}>廚房位置</div>
    </td>
    <td rowspan="20">
    
    <div className="smallBox greenBox" style={{ width: 'max-content', color: 'grey' }}>可選擇座位</div>
    <div className="smallBox redBox" style={{ width: 'max-content',color: 'grey'  }}>已選擇座位</div>
    <div className="smallBox emptyBox" style={{ width: 'max-content',color: 'grey'  }}>空位</div>
    <br /><br />
    </td>
    
    <br />
    <br />
    <br />
    <br />
    <br />
    </tr>
    
    <tr>
    <td className="alpha_list">C</td>
    <td><input type="checkbox" className="seats" value="C1" /></td>
    <td><input type="checkbox" className="seats" value="C2" /></td>
    <td></td>
    <td><input type="checkbox" className="seats" value="C3" /></td>
    <td><input type="checkbox" className="seats" value="C4" /></td>
    
    
    
    </tr>
    <tr>
    <td className="alpha_list">D</td>
    <td><input type="checkbox" className="seats" value="D1" /></td>
    <td><input type="checkbox" className="seats" value="D2" /></td>
    <td></td>
    <td><input type="checkbox" className="seats" value="D3" /></td>
    <td><input type="checkbox" className="seats" value="D4" /></td>
    </tr>
    <tr>
    </tr>
    </table>
    <br />
    <input type="button" value="確認已選座位 &rarr;" className="confirm-selection" id="con-select" 
    onClick={confirmSelection} onclick="updateTextArea()" 
    style={{background:'#b8596f',
    border: 'none', color:'white', padding:'10px 15px',
    cursor:'pointer',
    borderRadius: '23.5px',
    letterSpacing: '2px',
    fontSize: '19px',
    fontWeight: 'bold',
    height:'55px',
    width: '65%',
    marginTop: '18px'
}}/>
</center>
</div>
<br /><br />
<div className="displayerBoxes">
<center>
<table className="Displaytable" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
<tr>
<th>姓名</th>
<th>上課人數</th>
<th>座位</th>
</tr>
<tr>
<td><textarea className="textarea-seat" id="nameDisplay"></textarea></td>
<td><textarea className="textarea-seat" id="NumberDisplay"></textarea></td>
<td><textarea className="textarea-seat" id="seatsDisplay"></textarea></td>
</tr>
</table>
</center>
</div>
<div className="form-select-seat" >
<button 
className="pay-btn select-seat-ticket-button" 
onClick={
    startPayment
}>開始付款</button>
</div>
</div>
</div>
</form>
</div>


</>
)
}
