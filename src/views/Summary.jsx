import { useEffect } from 'react';
import { loadExpenses } from '../store/expenses.js';
import { useDispatch } from 'react-redux';

function Summary() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(loadExpenses()));

  return (
    <div>
      Summary
    </div>
  );
}

export default Summary;