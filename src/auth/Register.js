import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const Register = React.memo((props) => {
  const navigate = useNavigate();
  const handleSubmitForm = useCallback((event) => {
    event.preventDefault();
    fetch("http://localhost:8800/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: event.target.email.value,
        password: event.target.password.value
      }),
    }).then(response => response.json()).then(response => {
      console.log(response.msg);
      localStorage.setItem('token', response.token);
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

export default Register;
