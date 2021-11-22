import ListSection from '../components/ListSection';
import { useSelector, useDispatch } from 'react-redux';
import { getDates, getDatesByMonth, getExpenses, getExpensesByMonth, loadExpenses } from '../store/expenses';
import { getSortMethod } from '../store/interface';
import { useEffect } from 'react';
import dayjs from 'dayjs';

function SortController() {
  const dates = useSelector(getDates);
  const datesByMonth = useSelector(getDatesByMonth);
  const sortMethod = useSelector(getSortMethod);
  const expenses = useSelector(getExpenses);
  const expensesByMonth = useSelector(getExpensesByMonth);
  const dispatch = useDispatch();

  const listView = (sortMethod) => {
    if (sortMethod === 'Recent') {
      return(
        dates.map((date) => (
          <ListSection 
            key={date} 
            date={date} 
            expenses={expenses} 
            sortMethod={sortMethod}
          />
        ))
      )
    } else if (sortMethod === 'Month') {
      return(
        [...datesByMonth]
        .sort((a, b) => (dayjs(a).isAfter(dayjs(b)) ? 1 : -1))
        .map((date) => (
          <ListSection 
            key={date} 
            date={date} 
            expenses={expensesByMonth}
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