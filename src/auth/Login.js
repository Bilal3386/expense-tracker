import React, { useRef } from "react";
import classes from "./SignUp.module.css";

const Login = props => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    props.onLogin(enteredEmail, enteredPassword)
  };
  return (
    <section>
      <div className={classes.signUp}>
        <h2>Login</h2>
        <form onSubmit={submitHandler}>
          <input
            autoComplete="on"
            name="email"
            type="email"
            placeholder="Email"
            required
            ref={emailRef}
          />
          <input
            autoComplete="on"
            name="password"
            type="password"
            placeholder="Password"
            required
            ref={passwordRef}
          />
          <button>Login</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
