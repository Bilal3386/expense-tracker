import React, { useContext, useRef } from "react";
import Model from "../UI/Model";
import classes from "./Cart.module.css";
import { BsGithub, BsGlobe } from "react-icons/bs";
import AuthContext from "../../store/auth-context";

const Cart = (props) => {
  const fullNameRef = useRef("");
  const urlRef = useRef("");
  const authCtx = useContext(AuthContext)

  const updateProfileHandler = (event) => {
    event.preventDefault();
    const enteredFullName = fullNameRef.current.value;
    const enteredUrl = urlRef.current.value;
    //console.log(enteredFullName,enteredUrl, authCtx.token)
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDDV6olktSV8IBZY3FvpG5pREDCf4qgvCc',
    {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        displayName: enteredFullName,
        photoUrl: enteredUrl,
        deleteAttribute: null,
        //returnSecureToken: true,
      }),
      headers: {
        'Content-Type' : 'application/json'
      }
    }).then((res) => {
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
  return (
    <Model>
      <div className={classes.wrapper}>
        <h2>Contact Details</h2>
        <button onClick={props.onCloseCart}>Cancel</button>
      </div>
      <form onSubmit={updateProfileHandler}>
        <div className={classes.container}>
          <BsGithub size={25} />
          <label htmlFor="name">Full Name: </label>
          <input
            autoComplete="on"
            id="name"
            name="name"
            type="text"
            required
            ref={fullNameRef}
          />
          <BsGlobe size={25} />
          <label htmlFor="url">Profile Photo URL: </label>
          <input
            autoComplete="on"
            id="url"
            name="url"
            type="url"
            required
            ref={urlRef}
          />
        </div>
        <button className={classes.update}>Update</button>
      </form>
    </Model>
  );
};

export default Cart;
