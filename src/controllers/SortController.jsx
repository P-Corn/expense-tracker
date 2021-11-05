import ListSection from '../components/ListSection';
import ListItem from '../components/ListItem';
import { useSelector } from 'react-redux';
import { getExpenseDates } from '../store/expenses';
import { getSortMethod } from '../store/interface';

function SortController() {
  const dates = useSelector(getExpenseDates);
  const sortMethod = useSelector(getSortMethod);

  const listView = (sortMethod) => {
    if (sortMethod === 'recent') {
      return(
        dates.map((date) => (
          <ListSection date={date}/>
        ))
      )
    } else if (sortMethod === 'month') {
      
    }
  }

  return (
    <div>
      {listView(sortMethod)}
    </div>
  );
}

export default SortController;