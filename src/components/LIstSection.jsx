import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from './ListItem';
import { useSelector } from 'react-redux';
import { getExpenses } from '../store/expenses';
import { useEffect } from 'react';
import dayjs from 'dayjs';

export default function ListSection({ date }) {
  
  const expenses = useSelector(getExpenses);

  return (
    <List
      sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {date}
        </ListSubheader>
      }
    >
      { expenses.filter(expense => dayjs(expense.date).format('MMM D YYYY') == date).map((expense) => (
        <ListItem expense={expense}/>
      )) }
    </List>
  );
}