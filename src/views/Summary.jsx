import ListHeader from "../components/ListHeader";
import DatePickerButton from '../components/DatePickerButton';
import { getDateToSummarize } from '../store/interface';
import { useSelector } from "react-redux";
import SummarizedData from '../controllers/SummarizedData';


function Summary() {
  const dateToSummarize = useSelector(getDateToSummarize);

  return (
    <div>
      <ListHeader title={dateToSummarize} Button={<DatePickerButton />}/>
      <SummarizedData />
    </div>
  );
}

export default Summary;