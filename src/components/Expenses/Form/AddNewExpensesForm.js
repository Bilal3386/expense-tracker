import React, { useContext, useState } from "react";
import DailyExpensesContext from "../../../store/daily-expenses-context";
import ExpensesItems from "../ExpensesItems";
import AddExpensesForm from "./AddExpensesForm";
import classes from "./AddNewExpensesForm.module.css";

const AddNewExpensesForm = () => {
  const expenseCtx = useContext(DailyExpensesContext)

  const [onShow, setOnShow] = useState(false);

  const submitHandler = (obj) => {
    expenseCtx.addItem(obj)
    setOnShow(false)
  }

  

  const formHandler = () => {
    setOnShow(true);
  };
  return (
    <section className={classes["expenses-form"]}>
      <h2>Daily Expenses</h2>
      {onShow && <AddExpensesForm onShow={submitHandler}/>}
      {!onShow && <button onClick={formHandler}>Add New Expense</button>}

      <ExpensesItems/>
    </section>
  );
};

export default AddNewExpensesForm;
