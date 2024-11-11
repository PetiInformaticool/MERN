import React,  {useCallback, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { catchHandler } from '../../utils';
import './AddItem.css';



const Update = React.memo((props) => {
  const navigate = useNavigate();
  const {itemId} = useParams();
  const catchHandlerBinded = catchHandler.bind(null, navigate);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({product: "", price: ""});
  console.log(item);
  useEffect (() => {
    const init = async () => {
      const response = await fetch(`http://localhost:8800/get-item/${itemId}`, {
        credentials: "include"
      });
      const x = await response.json();
      if (response.status !== 200) {
        catchHandlerBinded(x);
        return;
      }
      setItem(x);
      setLoading(false);
    }
    init();
  }, [])

  const handleSubmitForm = useCallback((event) => {
    event.preventDefault();
    setLoading(true);
    fetch(`http://localhost:8800/update-item/${itemId}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({
        product: event.target.product.value,
        price: event.target.price.value
      }),
      credentials: "include"
    }).then(async response => {
      if (!response.ok) {
        const x = await response.json(); 
        throw x.msg;
      }
      return response.json();
    }).then(response => {
      console.log(response);
    }).catch(catchHandlerBinded).finally(() => {
      setLoading(false);
    });
  }, []);

  const handleBack = useCallback(() => {
    navigate("/")
  }, [navigate])

  return  (
    <form onSubmit={handleSubmitForm}>
      <input type="text" defaultValue={item.product} placeholder="enter the product" name="product"/>
      <br/>
      <input type="number" defaultValue={item.price} placeholder="enter the price" name="price"/>
      <br/>
      <button onClick={handleBack}>Back</button>
      <input type="submit" disabled={loading} value="edit"/>
    </form>
  );
});

export default Update;
