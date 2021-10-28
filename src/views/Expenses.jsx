import { useEffect } from 'react';
import { addExpense, getOrganizedExpenses, deleteExpense } from '../store/expenses';
import { useDispatch, useSelector } from 'react-redux';
import ListSection from '../components/LIstSection';

function Expenses() {
  const dispatch = useDispatch();
  const expenses = useSelector(getOrganizedExpenses);

  const handleDelete = id => dispatch(deleteExpense(id));

  return (
    <div>
      {Object.keys(expenses).map((key, index) => (
        <>
        <ListSection date={key} listOfExpenses={expenses[key]}/>
        </>
      ))}
    </div>
  )
}

export default Expenses;