import React, { useRef } from "react";
import classes from "./SignUp.module.css";

const SignUp = props => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const submitHandler =  (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;
    if (enteredPassword !== enteredConfirmPassword) {
      alert("Password don't match");
    } else {
      props.onSignUp(enteredEmail, enteredConfirmPassword)
    }
  };

  return (
    <section className={classes.signUp}>
        <h2>SignUp</h2>
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
          <input
            autoComplete="on"
            name="password"
            type="password"
            placeholder="Confirm Password"
            required
            ref={confirmPasswordRef}
          />
          <button>Sign Up</button>
        </form>
    </section>
  );
};

export default SignUp;
