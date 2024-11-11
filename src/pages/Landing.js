import React from 'react';
import { Link } from 'react-router-dom';

const Landing = React.memo((props) => {
  return (
    <div>
      Landing Page.
<br/>
      <Link to='/register'>Register</Link>
<br/>
      <Link to='/login'>Login</Link>
    </div>
  );
});

export default Landing;
