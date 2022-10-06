import React, { useState } from "react";
import classes from "./AddExpensesForm.module.css";

const AddExpensesForm = props => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const amountHandler = event => {
    setAmount(event.target.value)
  }

  const descriptionHandler = event => {
    setDescription(event.target.value)
  }

  const categoryHandler = event => {
    setCategory(event.target.value)
  }

  const submitHandler = event => {
    event.preventDefault()
    const newExpenseObj = {amount: amount, description: description, category: category}
    props.onShow(newExpenseObj)
  }

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
        value={amount}
        onChange={amountHandler}
      />
      <input
        autoComplete="on"
        type="text"
        id="description"
        name="description"
        placeholder="Enter description..."
        required
        value={description}
        onChange={descriptionHandler}
      />
      <select required value={category} onChange={categoryHandler}>
        <option value="food">Food</option>
        <option value="petrol">Petrol</option>
        <option value="salary">Salary</option>
      </select>
      <button>Add Expense</button>
    </form>
  );
};

export default AddExpensesForm;
