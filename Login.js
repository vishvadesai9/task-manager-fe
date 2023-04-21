import React from 'react';
import {useEffect, useRef, useState} from 'react';
import { Link } from 'react-router-dom';


const Login = () => {

    const userRef = useRef(); // set focus on input when component loads
    const errRef = useRef(); // set focus on screen reader when error occurs

    const [user, setUser] = useState(''); 
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState(''); // if error when authenticate
    const [success, setSuccess] = useState(false); // for testing -> will be replace with react router (page)

    // set focus on input when component loads
    useEffect(() => {
        userRef.current.focus();
    }, [])

// h
    
    // empty out errors msg if user change user/pwd state
    useEffect(() => {
       setErrMsg('');
    }, [user, pwd])

    // prevent reload of the page
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(user,pwd);
      setUser("");
      setPwd("");
      setSuccess(true);
    }
  
  return (
    
  <> {success ? ( // ternary operator
    <section>
      <h1>You are logged in!</h1>
      <br />
      <p>
      <a href="#">Go to Task Manager</a>
      </p>
    </section>
  ) : ( 
    <section>
      {/* <p ref={errRef} className={errMsg , "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> */}
      <h1>Sign In</h1>
      <form onSubmit = {handleSubmit}>
        <label htmlFor='username'>Username:</label>
        <input
         placeholder="Username"
         type="text" 
         name ="username" 
         id="username"
         ref={userRef}
         autoComplete="off"
         onChange={(e) => setUser(e.target.value)}
         value = {user}
         required
        />
        <label htmlFor="password">Password:</label>
        <input 
          placeholder="Password"
          type="paswword" 
          name ="paswword" 
          id="username" 
          onChange={(e) => setPwd(e.target.value)}
          value = {pwd}
          required
        />
        <button>Sign In</button>
      </form>
        <p>
           Need an Account? <br />
            <span className='line'>
              <Link to="/register">Sign In</Link>
            </span>
        </p>
    </section>
  )}
  </>
  )
}

export default Login