import { ListSubheader, List, Divider } from '@mui/material';
import ListItem from './ListItem';
import dayjs from 'dayjs';

export default function ListSection({ date, expenses, sortMethod }) {

  return (
      <List
        sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <>
          <ListSubheader component="div" id="nested-list-subheader">
            { sortMethod === 'Recent' ? date : dayjs(date).format('ddd D') }
          </ListSubheader>
          <Divider />
          </>
        }
      >
      {
        expenses.filter(expense => dayjs(expense.date).format('MMM D YYYY') === dayjs(date).format('MMM D YYYY'))
        .map((expense) => (
          <ListItem key={expense._id} expense={expense}/>
        ))
      }
    </List>
  );
}