import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./Profile.module.css";
import Button from "../UI/Button";
import CompleteUserProfile from "../CompleteUserProfile/CompleteUserProfile";

const Profile = () => {
  const authCtx = useContext(AuthContext);

  const verifyEmailHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDDV6olktSV8IBZY3FvpG5pREDCf4qgvCc",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: authCtx.token,
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
  return (
    <section className={classes.profile}>
      <h1>Complete Your Profile</h1>
      <CompleteUserProfile />
      <h2>Verify your email address</h2>
      <p>
        you've entered{" "}
        <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
          {authCtx.email}
        </span>{" "}
        as the email address for your account.
        <br />
        Please Verify this email by clicking button below.
      </p>
      <Button onClick={verifyEmailHandler}>Verify your email</Button>
    </section>
  );
};

export default Profile;
