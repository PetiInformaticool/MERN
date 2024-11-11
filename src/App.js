import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute, PublicRoute,  FallbackRoute} from './routes';

import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import AddItem from './pages/components/AddItem';
import Update from './pages/components/Update';
import Login from './auth/Login';
import Register from './auth/Register';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/NotFound';


const App = (props) => {
  return  (
    <div className="app-container">
      <Routes>
        <Route path="/login" element={<PublicRoute component={Login}/>} />
        <Route path="/register" element={<PublicRoute component={Register}/>} />
        <Route path="/" element={<FallbackRoute component={Dashboard} fallback={Landing}/>} />
        <Route path="/add" element={<PrivateRoute component={AddItem}/>} />
        <Route path="/update/:itemId" element={<PrivateRoute component={Update}/>} />
        <Route path="*" element={<NotFound/>} />
    
      </Routes>
      <ToastContainer/>
    </div>
  );
};

export default App;
