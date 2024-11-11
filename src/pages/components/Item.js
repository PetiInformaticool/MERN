import React, {useState, useContext, useCallback} from 'react';
import './Item.css';
import {AppContext} from '../../utils/context';
import { useNavigate } from 'react-router-dom';

const Item = React.memo((props) => {
  const actions = useContext(AppContext);
  const navigate = useNavigate();
  const {item, index} = props;
  const {_id: id, product, price} = item;
  console.log(item, props);

  const handleRemoveButton = useCallback(() => {
    actions.removeItem(index, id);
  }, [actions.removeItem, index, id])

  const handleUpdateButton = useCallback(() => {
    navigate(`/update/${id}`)
  })

  return (
    <tr>
      <td>{product}</td>
      <td>{price}</td>
      <td><button onClick={handleUpdateButton}>update</button></td>
      <td><button onClick={handleRemoveButton}>X</button></td>
    </tr>
   
  );
   
});

export default Item;
