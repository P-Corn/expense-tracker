import { css } from '@emotion/react';
import { useEffect } from 'react';
import { addExpense, getOrganizedExpenses, deleteExpense } from '../store/expenses';
import { useDispatch, useSelector } from 'react-redux';
import ListSection from '../components/ListSection';
import { Box } from '@mui/material';

function Expenses() {
  const dispatch = useDispatch();
  const expenses = useSelector(getOrganizedExpenses);

  const handleDelete = id => dispatch(deleteExpense(id));

  useEffect(() => {
    console.log(expenses)
  }, [])

  return (
    <Box>
      <Box>
        {Object.keys(expenses).map((key, index) => (
          <ListSection date={key} listOfExpenses={expenses[key]}/>
        ))}
      </Box>
    </Box>
  )
}

export default Expenses;