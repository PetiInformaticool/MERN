import React, {useCallback, useState, useMemo, useEffect,} from 'react';
import { AppContext, catchHandler, logout } from '../utils';
import List from './components/List';
import AddItem from './components/AddItem';
import '../App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';


///REACT.memo




const App = React.memo((props) => {
  const [itemList, setItemList] = useState([]);
  console.log("apps");
  console.log(itemList);
  const navigate = useNavigate();
  const catchHandlerBinded = catchHandler.bind(null, navigate);

  

  useEffect(() => {
    const init = async () => {
    //  toast('Are you the 6 fingered man?');
  //    console.log(!localStorage.getItem('token'));
      const response = await fetch("http://localhost:8800/get-items", {
        credentials: "include"
      });
      console.log(response.status);
      const x = await response.json();
      if (response.status !== 200) {
        catchHandlerBinded(x);
        return;
      }
      setItemList(x); 
    }
    init()
  }, [])

   

  const handleRemoveButton = useCallback((index, id) => {
    fetch(`http://localhost:8800/delete-item/${id}`, {
      method: "DELETE",
      credentials: "include"
    }).then(async response => {
      if (!response.ok) {
        const x = await response.json(); 
        throw x;
      };
      return response.json();
    }).then(response => {
      if (response._id === id) {
        setItemList((prevItemList) => {
          const aux = [...prevItemList];
          aux.splice(index, 1);
          return aux;
        });
      }
    }).catch(catchHandlerBinded);
  }, []);

  
  const contextValue = useMemo(() => ({removeItem: handleRemoveButton}), [handleRemoveButton]);

  

  return  (
    <div className="app-container">
      
       <a href="/" onClick={logout}>Log Out</a>
      <AppContext.Provider value={contextValue}>
        <List items={itemList}></List> 
      </AppContext.Provider>
      <br/>
      <Link to="/add"><button className="addButton">add</button></Link>
      <ToastContainer/>
    </div>
  );
});

export default App;
