/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import Card from '@mui/material/Card';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { deleteExpense, editExpense } from '../store/expenses';

export default function ListSection({ date, listOfExpenses }) {
  const [openExpense, setOpenExpense] = useState('');
  const dispatch = useDispatch();

  const handleOpenExpense = (id) => {
    if (openExpense == id)
      setOpenExpense('');
    else
      setOpenExpense(id);
  }

  const handleDelete = (id) => dispatch(deleteExpense(id));

  const handleEdit = (expense) => dispatch(editExpense(expense));


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
      { listOfExpenses.map(expense => (
        <div key={expense._id}>
          <ListItemButton onClick={() => handleOpenExpense(expense._id)}>
            <ListItemText primary={`$${expense.amount}`} secondary={expense.category}/>
            {openExpense == expense._id ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openExpense == expense._id} timeout="auto" unmountOnExit>
            <List css={css`
              padding-left: 16px;
              box-shadow: inset 0 0 8px rgba(0,0,0,.3);
            `} component="div">
              <Button onClick={() => handleDelete(expense._id)}>Delete</Button>
              <Button onClick={() => handleEdit(expense)}>Edit</Button>
              <ListItemText primary={`Amount: ${expense.amount}`}/>
              <ListItemText primary={`Title: ${expense.title}`}/>
              <ListItemText primary={`Description: ${expense.description}`}/>
              <ListItemText primary={`Category: ${expense.category}`}/>
              <ListItemText primary={`Date: ${expense.date}`}/>
            </List>
          </Collapse>
        </div>
      )) }
    </List>
  );
}