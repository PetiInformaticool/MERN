import React from 'react';
import  App  from './AppOld.js';

const Dashboard = React.memo((props) => {
  return (
    <div>
      <App/>
    </div>
  );
});

export default Dashboard;
