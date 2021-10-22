import {addExpense, getExpenses, deleteExpense } from '../store/expenses';
import { useDispatch, useSelector } from 'react-redux';

function Expenses() {
  const dispatch = useDispatch();
  const expenses = useSelector(getExpenses);

  const handleDelete = (id) => dispatch(deleteExpense(id));

  return (
    <div>
      <ul>
        {expenses.map(expense => (
          <>
            <li>{expense.title}</li>
            <button onClick={() => handleDelete(expense._id)}>Delete</button>
          </>
        ))}
      </ul>
    </div>
  );
}

export default Expenses;