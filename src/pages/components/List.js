import React from 'react';
import './List.css';
import Item from './Item.js'



const List = React.memo((props) => {
  console.log("list");
  return (
    <table className="table-container">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Modify</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          props.items.map((item, i) => (
            <Item key={`item-list-${i}`} index={i} item={item}/>
          ))
        }
      </tbody>
    </table>
  );
});

export default List;
