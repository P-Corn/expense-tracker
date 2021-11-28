import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExpenses } from '../store/expenses';
import { getCategories, setCategoryTotals } from '../store/categories';
import { getDateToSummarize } from '../store/interface';
import BarChart from '../components/BarChart';
import { Box } from '@mui/system';
import dayjs from 'dayjs';

export default function SummarizedData() {
  const dispatch = useDispatch();
  const expenses = useSelector(getExpenses) || [];
  const categories = useSelector(getCategories) || [];
  const date = useSelector(getDateToSummarize) || [];

  useEffect(() => {
    dispatch(setCategoryTotals())
    // const filteredExpenses = expenses.filter(expense => (
    //   dayjs(expense.date).format('MMMM YYYY') === date)
    // );

    // const totals = categories.map((category) => ({ title: category.title, total: 0 }));

    // filteredExpenses.forEach((expense) => {
    //   const index = totals.findIndex(item => item.title === expense.category);
    //   totals[index].total += parseFloat(expense.amount);
    //   setCategoryTotals(totals);
    // })
  }, []);

  return (
    <Box sx={{ height: 500 }}>
      <BarChart categories={[{ title: 'fuck', total: 0 }]} expenses={expenses} />
    </Box>
  );
}