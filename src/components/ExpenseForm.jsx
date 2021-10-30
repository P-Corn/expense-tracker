import {useEffect, useState} from 'react';
import { Modal, TextField, Box, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../store/interface';
import { addExpense, getExpenseToEdit } from '../store/expenses';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  width: "80vw",
  maxWidth: 500
};

const btnGroup = {
  width: '100%'
}

const Form = () => {
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const [editingExpense, setEditingExpense] = useState(false);

  const dispatch = useDispatch();
  const expenseToEdit = useSelector(getExpenseToEdit);

  useEffect(() => {
    if (expenseToEdit === {}) {
      setEditingExpense(false);
    } else {
      setEditingExpense(true);
      setAmount(expenseToEdit.amount);
      setTitle(expenseToEdit.title);
      setDescription(expenseToEdit.description);
      setCategory(expenseToEdit.category);
      setDate(expenseToEdit.date);
    }
  }, [expenseToEdit]);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addExpense({
      amount,
      title,
      description,
      category,
      date
    }));
    dispatch(closeModal());
  }

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { my: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={(e) => handleSubmit(e)}
    >
      <TextField onChange={(e) => setAmount(e.target.value)} value={amount} id="standard-basic" label="Amount" variant="standard" />
      <TextField onChange={(e) => setTitle(e.target.value)} value={title} id="standard-basic" label="Title" variant="standard" />
      <TextField onChange={(e) => setDescription(e.target.value)} value={description} id="standard-basic" label="Description" variant="standard" />
      <TextField onChange={(e) => setCategory(e.target.value)} value={category} id="standard-basic" label="Category" variant="standard" />
      <TextField onChange={(e) => setDate(e.target.value)} value={date} id="standard-basic" label="Date" variant="standard" />
      <Box className={btnGroup} sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button onClick={() => dispatch(closeModal())}>Cancel</Button>
        <Button type="submit" sx={{ ml: 3 }} variant="contained">Submit</Button>
      </Box>
    </Box>
  )
}

export default function ExpenseForm() {
  const open = useSelector(state => state.entities.interface.openModal);

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form />
        </Box>
      </Modal>
    </div>
  );
}