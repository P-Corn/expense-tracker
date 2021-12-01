import ListHeader from "../components/ListHeader";
import DatePickerButton from '../components/DatePickerButton';
import { getDateToSummarize } from '../store/interface';
import { useSelector } from "react-redux";
import SummarizedData from '../controllers/SummarizedData';
import { Box } from '@mui/material';

function Summary() {
  const dateToSummarize = useSelector(getDateToSummarize);

  return (
    <Box sx={{ maxWidth: 800, height: '100%', mx: 'auto' }}>
      <ListHeader title={dateToSummarize} Button={<DatePickerButton />}/>
      <SummarizedData />
    </Box>
  );
}

export default Summary;