import React, { useState } from "react";

const DailyExpensesContext = React.createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

export const DailyExpensesContextProvider = (props) => {

  const [items, updateItems] = useState([])

  const addItemHandler = expense => {
    updateItems([...items, expense])
  }

  const removeItemHandler = id => {

  }

  const expensesValue = {
    items: items,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  }
  return (
    <DailyExpensesContext.Provider value={expensesValue}>
      {props.children}
    </DailyExpensesContext.Provider>
  );
};

export default DailyExpensesContext;
