import { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { useSelector, useDispatch } from 'react-redux';

export default function ListSection({ date, listOfExpenses }) {
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  console.log(listOfExpenses)

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {date}
        </ListSubheader>
      }
    >
      { listOfExpenses.map(expense => (
        <>
          <ListItemButton onClick={handleClick}>
            <ListItemText primary={`$${expense.amount}`} secondary={expense.category}/>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemText primary={`Amount: ${expense.amount}`}/>
              <ListItemText primary={`Title: ${expense.title}`}/>
              <ListItemText primary={`Description: ${expense.description}`}/>
              <ListItemText primary={`Category: ${expense.category}`}/>
              <ListItemText primary={`Date: ${expense.date}`}/>
            </List>
          </Collapse>
        </>
      )) }
    </List>
  );
}