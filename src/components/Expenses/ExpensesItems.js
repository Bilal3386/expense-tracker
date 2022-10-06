import React, { useContext } from "react";
import DailyExpensesContext from "../../store/daily-expenses-context";

const ExpensesItems = (props) => {

  const expenseCtx = useContext(DailyExpensesContext)
  return (
    <ul>
      {expenseCtx.items.map((item) => (
        <li>
          <span>{item.amount}</span>
          <span>{item.description}</span>
          <span>{item.category}</span>
        </li>
      ))}
    </ul>
  );
};

export default ExpensesItems;
