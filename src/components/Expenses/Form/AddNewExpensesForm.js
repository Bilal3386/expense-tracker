import React, { useState } from "react";
import ExpensesItems from "../ExpensesItems";
import AddExpensesForm from "./AddExpensesForm";
import classes from "./AddNewExpensesForm.module.css";
import { addNewExpenseData } from "../../../redux-store/expenses/expenses-actions";
import { useDispatch } from "react-redux";
import { editExpenseData } from "../../../redux-store/expenses/expenses-actions";

const AddNewExpensesForm = () => {
  const dispatch = useDispatch()
  const [onShow, setOnShow] = useState(false);
  const [editExpense, setEditExpense] = useState([])
  const [isEditing, setIsEditing]= useState(false)

  const editHandler = value => {
    console.log(value)
    setEditExpense(value)
    setIsEditing(true)
    setOnShow(true)
  }
  const submitHandler = (obj) => {
    dispatch(addNewExpenseData(obj))
  };

  const editItemHandler = (obj) => {
    console.log(obj)

    dispatch(editExpenseData(obj, editExpense));
  };

  const formHandler = () => {
    setOnShow(true);
  };
  return (
    <section className={classes["expenses-form"]}>
      <h2>Daily Expenses</h2>
      {onShow && (
        <AddExpensesForm
          itemEdit= {editExpense}
          isEditing= {isEditing}
          onEditShow={editItemHandler}
          onAddShow={submitHandler}
        />
      )}
      {!onShow && (
        <button className={classes.btn} onClick={formHandler}>
          Add New Expense
        </button>
      )}
      <ExpensesItems onEdit={editHandler}/>
    </section>
  );
};

export default AddNewExpensesForm;
