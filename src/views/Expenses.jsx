import {addExpense, loadExpenses } from '../store/expenses';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as actions from '../store/api';

function Expenses() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(addExpense({
  //     title: 'Gas',
  //     description: 'just got gas',
  //     amount: 5,
  //     category: 'gas stuff',
  //     date: '10/18/2021'
  //   }));
  // }, []);

  return (
    <div>
      <ul>
        {/* {Object.keys(expenseList).map((key, index) => (
          <li>{expenseList[key]}</li>
        ))} */}
      </ul>
    </div>
  );
}

export default Expenses;