import React, { useEffect, useState } from "react";
import axios from "axios";

const DailyExpensesContext = React.createContext({
  items: [],
  editItems : "",
  isEditing: false,
  loader: false,
  addItem: (item) => {},
  editItem: ( item, id) => {},
  editingObj: (obj) => {},
  removeItem: (id) => {},
});

export const DailyExpensesContextProvider = (props) => {
  const [items, updateItems] = useState([]);
  const [ChangingData, setChangingData] = useState(false)
  const [loader, setLoader] = useState(false)
  const [editItems, setEditItems] = useState([])
  const [editObj, setEditObj] = useState([])
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    setChangingData(false)
    setLoader(true)
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://expense-tracker-84d6a-default-rtdb.firebaseio.com/expenses.json"
        );
          const loadedExpenses = []
          for(const key in response.data)
          {
            loadedExpenses.push({
              id: key,
              amount: response.data[key].amount,
              description: response.data[key].description,
              category: response.data[key].category
            })
          }
        updateItems(loadedExpenses)
        setLoader(false)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData()
    
  }, [ChangingData]);


  const addItemHandler = async (expense) => {
    setLoader(true)
    try {
      let response = await axios.post(
        "https://expense-tracker-84d6a-default-rtdb.firebaseio.com/expenses.json",
        expense
      );
      if (response.status === 200) {
        console.log(response.data)
        //updateItems(...items, loadedExpenses)
        setLoader(false)
      } 
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
    setChangingData(true)
  };
  const removeItemHandler = async(id) => {
    setLoader(true)
    let response = await axios.delete(
      `https://expense-tracker-84d6a-default-rtdb.firebaseio.com/expenses/${id}.json`,
    );
    if (response.status === 200) {
      console.log(response.data)
      //updateItems(...items, loadedExpenses)
      setLoader(false)
    } 
    console.log(id)
    setChangingData(true)
  };
  const fetchingObj = (obj) =>
    {
      setEditObj(obj)
    }
  const editItemHandler = async( item, id) => {
    setEditItems(item)
    console.log(item, id)
    if(editObj.length>0)
    {
    try{
      const response = await axios.put(
        `https://expense-tracker-84d6a-default-rtdb.firebaseio.com/expenses/${id}.json`, editObj
      );
        console.log(response.data);
        }
    catch (error) {
      console.log(error);
    }
  }
    setIsEditing(true)
  }

  const expensesValue = {
    items: items,
    editItems: editItems,
    isEditing: isEditing,
    loader: loader, 
    editingObj: fetchingObj,
    addItem: addItemHandler,
    editItem: editItemHandler,
    removeItem: removeItemHandler,
  };
  return (
    <DailyExpensesContext.Provider value={expensesValue}>
      {props.children}
    </DailyExpensesContext.Provider>
  );
};

export default DailyExpensesContext;
