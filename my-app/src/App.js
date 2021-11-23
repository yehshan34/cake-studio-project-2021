import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import News from './components/pages/News';
import AboutUs from './components/pages/AboutUs';
import Products from './components/pages/Products';
import ContactUs from './components/pages/ContactUs';
import CourseBooking from './components/pages/CourseBooking';
import CourseIntro from './components/pages/CourseIntro';
// import Customize from './components/pages/Customize';
import WorkDisplay from './components/pages/WorkDisplay';
import SignIn from './components/pages/SignIn';
import Admin from './components/admin/Admin';
import { AddProducts } from './components/cart/AddProducts';
import {Cart} from './components/cart/Cart'
import { NotFound } from './components/cart/NotFound'
import { HomeProduct } from './components/cart/HomeProduct';
import { Signup } from './components/cart/Signup';
import { Login } from './components/cart/Login';
import About from './components/member/About';
import AddEdit from './components/member/AddEdit';
import View from './components/member/View';
// import { AddProducts } from './components/cart/AddProducts';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Member from './components/member/Member';
import ContactUsMessage from './components/member/ContactUsMessage';
import OrderList from './components/admin/OrderList';
import CourseBookingList from './components/admin/CourseBookingList';
import OrderListView from './components/admin/OrderListView';
import HomeCourse from './components/bookcourse/HomeCourse';
import { BookingForm} from './components/bookcourse/BookingForm';
import { TicketBookingForm } from './components/bookcourse/TicketBookingForm';
import BookingList from './components/admin/BookingList';
import BookingPayment from './components/bookcourse/BookingPayment';


function App() {
  return (
    <>
    <Router>
      <ToastContainer position="top-center" />
    <Switch>
    <Route path="/" exact component={Home}/>
    <Route path="/news" exact component={News}/>
    <Route path="/aboutus" exact component={AboutUs}/>
    <Route path="/products" exact component={Products}/>
    <Route path="/contactus" exact component={ContactUs}/>
    <Route path="/coursebooking" exact component={CourseBooking}/>
    <Route path="/courseintro" exact component={CourseIntro}/>
    {/* <Route path="/customize" exact component={Customize}/> */}
    <Route path="/workdisplay" exact component={WorkDisplay}/>
    <Route path="/signin" exact component={SignIn} />
    <Route path="/admin-0" exact component={Admin} />
    <Route path="/admin-1" exact component={AddProducts} />
    <Route path="/cart" component={Cart}/> 
    <Route exact path="/homeproduct" component={HomeProduct}/>
    {/* <Route path="/add-produtcs" component={AddProducts}/> */}
    <Route path="/signup" component={Signup}/>
    <Route path="/login" component={Login}/>
    {/* <Route component={NotFound}/>  */}
    <Route path="/add" component={AddEdit}/>
    <Route path="/update/:id" component={AddEdit}/>
    {/* <Route path="/view/" component={View}/> */}
    <Route path="/about" component={About}/>
    <Route path="/member" component={Member}/>
    <Route path="/bookinglist" component={BookingList}/>
    <Route path="/contactusmessage" component={ContactUsMessage}/>
    <Route path="/orderlist" component={OrderList}/>
    <Route path="/orderlistview/:orderID" component={OrderListView}/>
    <Route path="/coursebookinglist" component={CourseBookingList}/>
    <Route path="/homecourse" component={HomeCourse}/>
    <Route path="/bookingform" exact component={BookingForm} />
    <Route path="/bookingpayment" exact component={BookingPayment} />

    </Switch>
    </Router>
    </>
    );
  }
  
  export default App;
  