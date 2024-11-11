import React,  {useCallback, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { catchHandler } from '../../utils';
import './AddItem.css';



const AddItem = React.memo((props) => {
  const navigate = useNavigate();
  const catchHandlerBinded = catchHandler.bind(null, navigate);
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = useCallback((event) => {
    event.preventDefault();
    setLoading(true);
    fetch("http://localhost:8800/create-item", {
      method: "POST",
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
      <input type="text" placeholder="enter the product" name="product"/>
      <br/>
      <input type="number" placeholder="enter the price" name="price"/>
      <br/>
      <button onClick={handleBack}>Back</button>
      <input type="submit" disabled={loading} value="add"/>
    </form>
  );
});

export default AddItem;
