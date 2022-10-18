import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-reducer";
import expensesReducer from "./expenses/expenses-reducer";

const store = configureStore({
  reducer: { auth: authReducer, expenses: expensesReducer },
});

export default store;
