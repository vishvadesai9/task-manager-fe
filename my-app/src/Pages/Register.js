import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;
const PWD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;

const Register = () => {

  const userRef = useRef(); // set focus on input when component loads
  const errRef = useRef(); // set focus on screen reader when error occurs

  const [user, setUser] = useState(''); 
  const [validName, setValidName] = useState(false); // if the name validate or not
  const [userFocus, setUserFocus] = useState(false); // focus on input field or not

  const [pwd, setPwd] = useState(''); 
  const [validPwd, setValidPwd] = useState(false); // if the valid pwd validate or not
  const [pwdFocus, setPwdFocus] = useState(false); // focus on input field or not

  const [matchPwd, setMatchPwd] = useState(''); 
  const [validMatch, setValidMatch] = useState(false); // if the valid pwd mach validate or not
  const [matchFocus, setMatchFocus] = useState(false); // focus on input field or not

  const [errMsg, setErrMsg] = useState(''); // if error when authenticate
  const [success, setSuccess] = useState(false); // for testing -> will be replace with react router (page)
  let [loading, setLoading] = useState(false);

  
  
  useEffect(() => {
    userRef.current.focus();
}, [])

useEffect(() => {
    setValidName(USER_REGEX.test(user));
}, [user])

useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
}, [pwd, matchPwd])

useEffect(() => {
    setErrMsg('');
}, [user, pwd, matchPwd])

const signUp = async () => {
    

}
const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
        setErrMsg("Invalid Entry");
        return;
    }
    try {
        setLoading(true)
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: pwd })
          }
          const url = 'https://task-manager-api-tcy9.onrender.com/signup/';
          let response = await fetch(url, requestOptions)
          let responseJson = await response.json()
          console.log(responseJson)
          if (responseJson?.success === false){
            console.log(responseJson?.message)
          }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    // try {
    //     const response = await axios.post(REGISTER_URL,
    //         JSON.stringify({ user, pwd }),
    //         {
    //             headers: { 'Content-Type': 'application/json' },
    //             withCredentials: true
    //         }
    //     );
    //     console.log(response?.data);
    //     console.log(response?.accessToken);
    //     console.log(JSON.stringify(response))
    //     setSuccess(true);
    //     //clear state and controlled inputs
    //     //need value attrib on inputs for this
    //     setUser('');
    //     setPwd('');
    //     setMatchPwd('');
    // } catch (err) {
    //     if (!err?.response) {
    //         setErrMsg('No Server Response');
    //     } else if (err.response?.status === 409) {
    //         setErrMsg('Username Taken');
    //     } else {
    //         setErrMsg('Registration Failed')
    //     }
    //     errRef.current.focus();
    // }
}

  return (
    <>
    {success ? (
        <section>
            <h1>Success!</h1>
            <p>
                <Link to="/">Sign In</Link>
            </p>
        </section>
    ) : (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Username:
                    <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                     6 characters minimum.<br />
                    Must have a one uppercase/lowercase and one digit.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>


                <label htmlFor="password">
                    Password:
                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    6 characters minimum.<br />
                    Must have a one uppercase/lowercase and one digit.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>


                <label htmlFor="confirm_pwd">
                    Confirm Password:
                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                </label>
                <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                </p>

                <button disabled={!validName || !validPwd || !validMatch ? true : false} onClick={signUp}>Sign Up</button>
            </form>
            {!loading ? (
                <p>
                Already registered?<br />
            
                <span className="line">
                    
                    <Link to="/">Sign In</Link>
                </span>
            </p>
            ) : null}
            
        </section>
    )}
</>
  )
}

export default Register