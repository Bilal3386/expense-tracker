import React, { useContext, useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import classes from "./Authentication.module.css";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button";

const Authentication = (props) => {
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(false);

  const signUpHandler = async (email, password) => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDV6olktSV8IBZY3FvpG5pREDCf4qgvCc",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong...");
      }
      const data = await response.json();
      console.log(data);
    } catch (err) {
      alert(err);
    }
  };

  const loginHandler = (email, password) => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDV6olktSV8IBZY3FvpG5pREDCf4qgvCc",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        console.log(data);
        authCtx.login(data.idToken, data.email);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const clickSignUpHandler = () => {
    setIsLogin(true);
  };

  const clickLoginHandler = () => {
    setIsLogin(false);
  };

  return (
    <section className={classes.auth}>
      {!isLogin && <SignUp onSignUp={signUpHandler} />}
      {isLogin && <Login onLogin={loginHandler} />}
      {!isLogin && (
        <Button onClick={clickSignUpHandler}>Have an account? Login</Button>
      )}
      {isLogin && (
        <Button onClick={clickLoginHandler}>
          Don't have an account? Sign up
        </Button>
      )}
    </section>
  );
};

export default Authentication;
