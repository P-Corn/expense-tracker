import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExpenses } from '../store/expenses';
import { getCategories, getCategoryTotals } from '../store/categories';
import { getDateToSummarize } from '../store/interface';
import BarChart from '../components/BarChart';
import { Box } from '@mui/system';
import dayjs from 'dayjs';

export default function SummarizedData() {
  const dispatch = useDispatch();
  const categories = useSelector(getCategoryTotals) || [];
  const date = useSelector(getDateToSummarize) || [];
  const expenses = useSelector(getExpenses) || [];

  console.log(categories)

  return (
    <Box sx={{ height: 500 }}>
      <BarChart data={categories} />
      {expenses.map(expense => <div>{expense.amount}</div>)}
    </Box>
  );
}