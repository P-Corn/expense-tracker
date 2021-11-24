import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExpenses } from '../store/expenses';
import { getCategories } from '../store/categories';
import { getDateToSummarize } from '../store/interface';
import BarChart from '../components/BarChart';
import { Box } from '@mui/system';
import dayjs from 'dayjs';

export default function SummarizedData() {
  const expenses = useSelector(getExpenses) || [];
  const categories = useSelector(getCategories) || [];
  const date = useSelector(getDateToSummarize) || [];

  const [amountSpentPerCategory, setAmountSpentPerCategory] = useState();

  useEffect(() => {
    const filteredExpenses = expenses.filter(expense => (
      dayjs(expense.date).format('MMMM YYYY') === date)
    );

    let categoryTotals = {};
    for (let expense of filteredExpenses) {
      // categoryTotals[expense.category] = parseInt(expense.amount) + parseInt(categoryTotals[expense.category])
      // console.log(categoryTotals, expense.category, expense.amount)
    }
  })

  return (
    <Box sx={{ height: 500 }}>
      <BarChart categories={categories} expenses={expenses} />
    </Box>
  );
}