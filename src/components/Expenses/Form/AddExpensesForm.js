import React, { useContext, useState } from "react";
import DailyExpensesContext from "../../../store/daily-expenses-context";
import classes from "./AddExpensesForm.module.css";

const AddExpensesForm = (props) => {
  const expenseCtx = useContext(DailyExpensesContext);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    if (expenseCtx.isEditing) {
      expenseCtx.editItems.amount = amount;
      expenseCtx.editItems.description = description;
      expenseCtx.editItems.category = category;
      const newExpenseObj = {
        amount: amount,
        description: description,
        category: category,
      };
      props.onEditShow(newExpenseObj);
    } else {
      const newExpenseObj = {
        amount: amount,
        description: description,
        category: category,
      };
      props.onAddShow(newExpenseObj);
      setAmount("");
      setDescription("");
      setCategory("");
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <h2>Add New Expense</h2>
      <input
        autoComplete="on"
        type="number"
        id="amount"
        name="amount"
        placeholder="Enter your amount..."
        required
        defaultValue={expenseCtx.editItems.amount || ""}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        autoComplete="on"
        type="text"
        id="description"
        name="description"
        placeholder="Enter description..."
        required
        defaultValue={expenseCtx.editItems.description || ""}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        required
        defaultValue={expenseCtx.editItems.category || ""}
        onChange={(e) => setCategory(e.target.value)}
      >
      <option value="0">Select category</option>
        <option value="food">Food</option>
        <option value="petrol">Petrol</option>
        <option value="salary">Salary</option>
      </select>
      {!expenseCtx.loader && <button>Add Expense</button>}
      {expenseCtx.loader && <p>Adding...</p>}
    </form>
  );
};

export default AddExpensesForm;
