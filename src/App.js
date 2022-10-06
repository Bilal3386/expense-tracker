import { useContext } from "react";
import Authentication from "./components/auth/Authentication";
import Header from "./components/layout/Header";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AuthContext from "./store/auth-context";
import DailyExpensesPage from "./pages/DailyExpensesPage";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route path="/auth">{!isLoggedIn && <Authentication />}</Route>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path='/dailyExpenses'>
          {isLoggedIn && <DailyExpensesPage />}
          {!isLoggedIn && <Redirect to="/auth" />}
          </Route>
          <Route>
            {isLoggedIn && <ProfilePage />}
            {!isLoggedIn && <Redirect to="/auth" />}
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
