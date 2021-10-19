import {addExpense, loadExpenses, getExpenses } from '../store/expenses';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as actions from '../store/api';

function Expenses() {
  const dispatch = useDispatch();
  const expenses = useSelector(getExpenses);

  useEffect(() => {
    dispatch(loadExpenses());
  }, [])

  return (
    <div>
      <ul>
        {expenses.map(expense => (
          <li>{expense.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Expenses;