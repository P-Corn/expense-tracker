import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadExpenses } from '../store/expenses';
import { loadCategories } from '../store/categories';
import { Box } from '@mui/material';

export default function LoadData({children}) {
  const dispatch = useDispatch();

  useEffect(() => dispatch(loadExpenses()), []);
  useEffect(() => dispatch(loadCategories()), []);

  return (
    <div>
      {children}
    </div>
  );
}