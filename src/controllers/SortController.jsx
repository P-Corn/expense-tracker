import ListSection from '../components/ListSection';
import ListItem from '../components/ListItem';
import { useSelector } from 'react-redux';
import { getExpenseDates } from '../store/expenses';
import { getSortMethod } from '../store/interface';

function SortController() {
  const dates = useSelector(getExpenseDates);
  const sortMethod = useSelector(getSortMethod);

  const listView = (sortMethod) => {
    if (sortMethod === 'Recent') {
      return(
        dates.map((date) => (
          <ListSection key={date} date={date}/>
        ))
      )
    } else if (sortMethod === 'Month') {
      
    }
  }

  return (
    <div>
      {listView(sortMethod)}
    </div>
  );
}

export default SortController;