import React from 'react'
import { Provider } from 'react-redux';
import { Outlet } from "react-router-dom";
import store from '../redux/store';
import Header from './Header';
import Footer from './Footer';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '../App.css'

function App() {
  return (
    <Provider store={store}>
      <Header />
      <div className='App'>
        <Outlet />
      </div>
      <Footer />
    </Provider>
  );
}

export default App;
