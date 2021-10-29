import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadExpenses } from '../store/expenses';
import { Box } from '@mui/material';

export default function LoadData({children}) {
  const dispatch = useDispatch();

  useEffect(() => dispatch(loadExpenses()), []);
  return (
    <div>
      {children}
    </div>
  );
}