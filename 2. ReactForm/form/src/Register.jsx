import React from "react";
// React Hooks
import { useState, useRef, useEffect } from "react";
// FontAwesome
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesomeIcon component: This is the React component from Font Awesome that you use in your JSX to display the imported icons. You pass the specific icon you want to display as a prop (e.g., <FontAwesomeIcon icon={faCheck} />

// Regex
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef(); // Focus on the username input when the component loads.
  const errRef = useRef(); // Focus on the error message if there's an error -> this errRef will be used to put focus on that so it can be announced by accessibility

  // State variable for userName
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  // State variable for password
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  // State variable for matchin Password fields
  const [matchPwd, setmatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  //  state variable for the success and error message
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  // useEffect -> when the component load and it is used to provide the focus on the NameField
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // for testing the valid user Name
  useEffect(() => {
    const result = USER_REGEX.test(user); // Testing whether the input is valid or not
    console.log(result); // true or false
    console.log(user); // current value of 'user'
    setValidName(result); // will be used to show error
  }, [user]); // Dependency array [user]:  This ensures the effect runs only when user changes.

  // UseEffect for the password:
  useEffect(() => {
    const result = PWD_REGEX.test(pwd); // Testing whether the pwd is valid or not
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    // Checks if the password and matchPassword fields are identical. This ensures the confirmation field is always in sync.
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  // This useEffect runs when an error message appears or when the user starts typing in any of the input fields. Its job is to clear any existing error message (errMsg) once the user starts typing again, assuming they're trying to fix the issue.
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Register</h1>
      <form>
        <label htmlFor="username">
          UserName:
          <FontAwesomeIcon
            icon={faCheck}
            className={validName ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validName || !user ? "hide" : "invalid"}
          />
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off" //
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <p
          id="uidnote"
          className={
            userFocus && user && !validName ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters.
          <br />
          Must begin with a letter.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>
      </form>
    </section>
  );
};

export default Register;
