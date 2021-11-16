/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import dayjs from 'dayjs';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { deleteExpense, editExpense, populateDates } from '../store/expenses';

export default function ListItem({ expense }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    await dispatch(deleteExpense(id));
    dispatch(populateDates(id));
  };

  const handleEdit = (expense) => dispatch(editExpense(expense));

  return (
    <div>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemText primary={`$${expense.amount}`} secondary={expense.category}/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
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
          <ListItemText primary={`Date: ${dayjs(expense.date).format('MM/DD/YYYY')}`}/>
        </List>
      </Collapse>
    </div>
  );
}