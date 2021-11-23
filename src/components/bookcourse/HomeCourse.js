import React,{ useState}  from 'react';
import firebase from 'firebase';
import { useHistory, useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import './HomeCourse.css';
import Footer from '../Footer';

export const HomeCourse = (props) => {
    const history = useHistory();
    const [courseData, setCourseData] = useState([]);
    React.useEffect(() => {
        firebase
        .firestore()
        .collection("current-courses")
        .get()
        .then((Snapshot) => {
            const data = Snapshot.docs.map(doc => {
                return doc.data();
                
            });
            setCourseData(data);
        })
    }, [])

    return (
        <>
        <Navbar />
        <h1 className='coursebooking'>訂購課程</h1>
        {
            courseData.map((data, index) => {
                return (
                    <>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                    <div id="container" key={index}>	
                    
                    <div className="product-details">
                    
                    <h1>{data.courseName}</h1>
                    <span className="hint-star star">
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star-o" aria-hidden="true"></i>
                    </span>
                    <p className="information">{data.courseIntro}</p>
                    <div className="control">
                    <button className="btn_course" 
                    onClick={() => history.push({ 
                        pathname: "/bookingform", 
                        state: { 
                            startDate: data.startDate, 
                            endDate: data.endDate,
                            courseImage: data.courseImg, 
                            courseName: data.courseName, 
                            ticketCost: data.coursePrice }
                        })}
                        >
                        <span className="price">NT$ {data.coursePrice}</span>
                        <span className="shopping-cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i></span>
                        <span className="buy">預約 &rarr;</span>
                        </button>
                        </div>
                        </div>
                        <div className="product-image">
                        <img src={data.courseImg} alt="courseImage" />
                        <div className="info-course">
                        <h2>課程簡介</h2>
                        <ul>
                        <li><strong>上課人數：</strong>小班制，3 人即開班</li>
                        <li><strong>上課時數：</strong>每天 6-8 小時</li>
                        <li><strong>贈品：</strong>證書班即贈送裱花工具/花嘴一套</li>
                        <li><strong>注意事項：</strong>防疫期間，上課請全程配戴口罩</li>
                        </ul>
                        </div>
                        </div>
                        
                        </div>
                        </>
                        )})
                    }
                    <Footer />
                    </>
                    )
                }
                
                export default HomeCourse;
                