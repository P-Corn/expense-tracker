import { useDispatch, useSelector } from 'react-redux';
import { getCategoryTotals } from '../store/categories';
import BarChart from '../components/BarChart';
import { Box } from '@mui/system';

export default function SummarizedData() {
  const dispatch = useDispatch();
  const categories = useSelector(getCategoryTotals)

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <BarChart data={categories} />
    </Box>
  );
}