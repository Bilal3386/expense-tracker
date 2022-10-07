import React, { useContext } from "react";
import DailyExpensesContext from "../../store/daily-expenses-context";
import classes from "./ExpensesItems.module.css";

const ExpensesItems = (props) => {
  const expenseCtx = useContext(DailyExpensesContext);
  return (
    <ul className={classes["expenses-ul"]}>
      <header className={classes.header}>
        <h4 className={classes.amount}>Amount</h4>
        <h4 className={classes.description}>Description</h4>
        <h4 className={classes.category}>category</h4>
      </header>
      {expenseCtx.items.map((item) => {return !expenseCtx.loader && (
        <li key={item.id} id={item.id}>
          <span className={classes.amount}>${item.amount}</span>
          <span className={classes.description}>{item.description}</span>
          <span className={classes.category}>{item.category}</span>
          <button
            className={classes.delete}
            onClick={() => expenseCtx.removeItem(item.id)}
          >
            DELETE
            {expenseCtx.loader && "Deleting..."}
          </button>
          <button className={classes.edit} onClick={() => expenseCtx.editItem(item, item.id)}>EDIT</button>
        </li>
      )})
      
      }
      {expenseCtx.loader && <p>Loading...</p>}
    </ul>
  );
};

export default ExpensesItems;
