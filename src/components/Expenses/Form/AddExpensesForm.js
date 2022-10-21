import React, { useState } from "react";
import classes from "./AddExpensesForm.module.css";

const AddExpensesForm = (props) => {

  const [amount, setAmount] = useState(props.itemEdit.amount|| '');
  const [description, setDescription] = useState(props.itemEdit.description|| '');
  const [category, setCategory] = useState(props.itemEdit.category|| '');

  const temp  = [props.itemEdit]
  const submitHandler = (event) => {
    event.preventDefault();
    if (props.isEditing) {
      temp.amount = amount;
      temp.description = description;
      temp.category = category;
      const newExpenseObj = {
        amount: amount,
        description: description,
        category: category,
      };
      props.onEditShow(newExpenseObj);
    } else {
      console.log('submitted')
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
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        autoComplete="on"
        type="text"
        id="description"
        name="description"
        placeholder="Enter description..."
        required
        value={ description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        required
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="0">Select category</option>
        <option value="food">Food</option>
        <option value="petrol">Petrol</option>
        <option value="salary">Salary</option>
      </select>
      <button>Add Expense</button>
    </form>
  );
};

export default AddExpensesForm;
