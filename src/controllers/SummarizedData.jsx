import { useSelector } from 'react-redux';
import { getCategoryTotals } from '../store/categories';
import BarChart from '../components/BarChart';
import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { getTotalBudget } from '../store/categories';
import { getViewWidth } from '../store/interface';

export default function SummarizedData() {
  const categories = useSelector(getCategoryTotals);
  const [totalSpent, setTotalSpent] = useState(0);
  const totalBudget = useSelector(getTotalBudget);
  const viewWidth = useSelector(getViewWidth);

  useEffect(() => {
    setTotalSpent(Object.values(categories).reduce((currVal, amount) => (currVal + amount), 0).toFixed(2));
  }, [categories]);

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <BarChart data={categories} totalSpent={totalSpent} />
      <Box sx={{
        marginTop: 3
      }}>
        <Typography variant={viewWidth < 600 ? 'h6' : 'h5'} component="h2">Spent: <strong>{`$${totalSpent}`}</strong></Typography>
        <Typography variant={viewWidth < 600 ? 'h6' : 'h5'} component="h2">Budget: <strong>{`$${totalBudget}`}</strong></Typography>
      </Box>
    </Box>
  );
}