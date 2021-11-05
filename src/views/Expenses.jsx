import { useSelector } from 'react-redux';
import ListHeader from '../components/ListHeader';
import { Box } from '@mui/material';
import { getExpenseDates } from '../store/expenses';
import SortController from '../controllers/SortController';


function Expenses() {

  return (
    <Box>
      <ListHeader />
      <Box>
        <SortController />
      </Box>
    </Box>
  )
}

export default Expenses;