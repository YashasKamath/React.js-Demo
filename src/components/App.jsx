import React from 'react'
import { Outlet } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import '../App.css'
import { Provider } from 'react-redux';
import store from '../redux/store';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <div className='App'>
      <div style={{"height":"35px"}}></div>
        <Outlet />
      </div>
      <Footer />
    </Provider>
  );
}

export default App;
