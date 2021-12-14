import { useSelector } from 'react-redux';
import { getCategoryTotals } from '../store/categories';
import BarChart from '../components/BarChart';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';

export default function SummarizedData() {
  const categories = useSelector(getCategoryTotals);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    setTotalSpent(Object.values(categories).reduce((currVal, amount) => (currVal + amount), 0).toFixed(2));
  }, [categories]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <BarChart data={categories} totalSpent={totalSpent} />
    </Box>
  );
}