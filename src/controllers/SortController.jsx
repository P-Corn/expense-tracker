import ListSection from '../components/ListSection';
import { useSelector, useDispatch } from 'react-redux';
import { getDates, getDatesByMonth, getExpenses, getExpensesByMonth, populateExpensesByMonth, getSortMonth } from '../store/expenses';
import { getSortMethod } from '../store/interface';
import { useEffect } from 'react';

function SortController() {
  const dates = useSelector(getDates);
  const datesByMonth = useSelector(getDatesByMonth);
  const sortMethod = useSelector(getSortMethod);
  const expenses = useSelector(getExpenses);
  const sortMonth = useSelector(getSortMonth)
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(sortMonth)
    dispatch(populateExpensesByMonth(sortMonth))
  }, [expenses])

  const listView = (sortMethod) => {
    if (sortMethod === 'Recent') {
      return(
        dates.map((date) => (
          <ListSection 
            key={date} 
            date={date} 
            selector={getExpenses} 
            sortMethod={sortMethod}
          />
        ))
      )
    } else if (sortMethod === 'Month') {
      return(
        datesByMonth.map((date) => (
          <ListSection 
            key={date} 
            date={date} 
            selector={getExpensesByMonth}
            sortMethod={sortMethod}
          />
        ))
      )
    }
  }

  return (
    <div>
      {listView(sortMethod)}
    </div>
  );
}

export default SortController;