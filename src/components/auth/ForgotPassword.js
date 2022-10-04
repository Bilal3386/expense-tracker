import React, { useRef } from "react";
import classes from "./SignUp.module.css";

const ForgotPassword = props => {
  const emailRef = useRef("");
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    props.onForgot(enteredEmail)
  };
  return (
    <section className={classes.signUp}>
        <h2>Forgot Password</h2>
        <form onSubmit={submitHandler}>
          <input
            autoComplete="on"
            name="email"
            type="email"
            placeholder="Email"
            required
            ref={emailRef}
          />
          <button>Forgot Password</button>
        </form>
    </section>
  );
};

export default ForgotPassword;