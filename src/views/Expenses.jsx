import { organizeExpenses, loadExpenses } from '../store/expenses';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function Expenses() {
  const [expenseList, setExpenseList] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(organizeExpenses());
    setExpenseList(useSelector(loadExpenses))
  },[])

  return (
    <div>
      <ul>
        {Object.keys(expenseList).map((key, index) => (
          <li>{expenseList[key]}</li>
        ))}
      </ul>
    </div>
  );
}

export default Expenses;