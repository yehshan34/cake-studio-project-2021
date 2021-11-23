import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import Calendar from '../calendar/compo/Calendar';
import store from '../calendar/redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RootContainer } from '../calendar/styles/AppStyles';
import './CourseBooking.css';
import Navbar from './../Navbar';

export default function CourseBooking() {
  return (
    <>
    <Navbar />
    <h1 className='coursebooking'>訂購課程</h1>
    <RootContainer>
      <Provider store = {store}>
        <Router>
          <Switch>
              <Route exact path="/coursebooking">
                <Calendar/>
              </Route>
              <Route path="/year/:year/month/:monthDate">
                  <Calendar/>
              </Route>
            </Switch>
        </Router>
      </Provider>
    </RootContainer>
    <Footer />
    </>);
  }