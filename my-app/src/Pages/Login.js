import React from 'react';
import {useEffect, useRef, useState} from 'react';
import { Link } from 'react-router-dom';


const Login = () => {
  let userData = new Object()

    const userRef = useRef(); // set focus on input when component loads
    const errRef = useRef(); // set focus on screen reader when error occurs

    const [user, setUser] = useState(''); 
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState(''); // if error when authenticate 
    const [success, setSuccess] = useState(false); // for testing -> will be replace with react router (page)
    const [loading, setLoading] = useState(false);
    // set focus on input when component loads
    useEffect(() => {
        userRef.current.focus();
    }, [])
    
    // empty out errors msg if user change user/pwd state
    useEffect(() => {
       setErrMsg('');
    }, [user, pwd])

    // prevent reload of the page
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true)
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: user, password: pwd })
        }
        const url = 'https://task-manager-api-tcy9.onrender.com/login/';
        let response = await fetch(url, requestOptions)
        let responseJson = await response.json()
        console.log(responseJson)
        if (responseJson.success){
          setSuccess(responseJson.success)
          userData = responseJson
        }
        else{
          setErrMsg(responseJson.message)
        }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
      
    }
  
  return (
    
  <> {success ? ( // ternary operator
    <section>
      <h1>You are logged in!</h1>
      <br />
      <p>
      <Link to="/taskmanager">Go to Task Manager</Link>
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
        <button disabled={loading} type="submit">Sign In</button>
      </form>
        { !loading ? (<p>
           Need an Account? <br />
                  
              <Link to="/register">Sign Up</Link>

          
        </p>): null}
    </section>
  )}
  </>
  )
}

export default Login