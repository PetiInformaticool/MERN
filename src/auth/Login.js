import React from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = React.memo((props) => {
  const navigate = useNavigate();
  const handleSubmitForm = useCallback((event) => {
    console.log(event.target.email);
    event.preventDefault();
    fetch("http://localhost:8800/login", {
      method: "POST",
      credentials: 'include',
      //mode: "same-origin",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: event.target.email.value,
        password: event.target.password.value
      }),
    }).then(response => response.json()).then(response => {
      console.log(response);
      localStorage.setItem('email', response.email);
      navigate("/");
    });
  }, []);
  
  return (
    <form onSubmit={handleSubmitForm}>
      <input type="text" placeholder="enter your email" name="email"/>
      <input type="password" placeholder="enter your password" name="password"/>
      <input type="submit" value="Login"/>
     </form>
  );
});

export default Login;
