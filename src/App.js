import SignUp from "./auth/SignUp";

function App() {
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

  return (
    <>
      <SignUp onSignUp={signUpHandler} />
    </>
  );
}

export default App;
