import { useSelector } from 'react-redux';
import ListHeader from '../components/ListHeader';
import { Box } from '@mui/material';
import { getExpenseDates } from '../store/expenses';
import SortController from '../controllers/SortController';
import { getSortMethod } from '../store/interface';
import { getSortMonth } from '../store/expenses';
import Menu from '../components/Menu';


function Expenses() {
  const sortMethod = useSelector(getSortMethod);
  const sortMonth = useSelector(getSortMonth);

  return (
    <Box>
      <ListHeader title={ sortMethod === 'Recent' ? sortMethod : sortMonth } Button={<Menu />} />
      <Box>
        <SortController />
      </Box>
    </Box>
  )
}

export default Expenses;