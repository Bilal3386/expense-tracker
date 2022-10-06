import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { BrowserRouter } from "react-router-dom";
import { DailyExpensesContextProvider } from "./store/daily-expenses-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <DailyExpensesContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DailyExpensesContextProvider>
  </AuthContextProvider>
);
