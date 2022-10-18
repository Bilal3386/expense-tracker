import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import classes from "./Authentication.module.css";
import {useDispatch} from "react-redux";
import Button from "../UI/Button"
import ForgotPassword from "./ForgotPassword";
import { authAction } from "../../redux-store/auth-reducer";

const Authentication = (props) => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [isForgot, setIsForgot] = useState(false);

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
        // authCtx.login(data.idToken, data.email);
        const loginObj={idToken: data.idToken, email: data.email}
        dispatch(authAction.login(loginObj))
      })
      .catch((err) => {
        alert(err);
      });
  };

  const forgotPasswordUserHandler = (email) => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDDV6olktSV8IBZY3FvpG5pREDCf4qgvCc",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email,
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

  const forgotPasswordHandler = () => {
    setIsForgot(true);
  };
  return (
    <section className={classes.auth}>
      {!isLogin && <SignUp onSignUp={signUpHandler} />}
      {isLogin && <Login onLogin={loginHandler} />}
      {!isLogin && (
        <Button onClick={clickSignUpHandler}>Have an account? Login</Button>
      )}
      {isForgot && <ForgotPassword onForgot={forgotPasswordUserHandler} />}
      {isLogin && (
        <Button onClick={forgotPasswordHandler}>Forgot Password?</Button>
      )}
      <br />
      {isLogin && (
        <Button onClick={clickLoginHandler}>
          Don't have an account? Sign up
        </Button>
      )}
    </section>
  );
};

export default Authentication;
