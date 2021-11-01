import {useEffect, useState} from 'react';
import { Modal, TextField, Box, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { closeUpdateModal } from '../store/interface';
import { getExpenseToEdit, updateExpense } from '../store/expenses';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import dayjs from 'dayjs';

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
  const [id, setId] = useState("");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => console.log(value), [value])

  const dispatch = useDispatch();
  const expenseToEdit = useSelector(getExpenseToEdit);

  useEffect(() => {
    setId(expenseToEdit._id);
    setAmount(expenseToEdit.amount);
    setTitle(expenseToEdit.title);
    setDescription(expenseToEdit.description);
    setCategory(expenseToEdit.category);
    setDate(expenseToEdit.date);
    }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateExpense({
      id,
      amount,
      title,
      description,
      category,
      date
    }));
    dispatch(closeUpdateModal());
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
      <TextField onChange={(e) => setAmount(e.target.value)} value={amount || ''} id="standard-basic" label="Amount" variant="outlined" />
      <TextField onChange={(e) => setTitle(e.target.value)} value={title || ''} id="standard-basic" label="Title" variant="outlined" />
      <TextField onChange={(e) => setDescription(e.target.value)} value={description || ''} id="standard-basic" label="Description" variant="outlined" />
      <TextField onChange={(e) => setCategory(e.target.value)} value={category || ''} id="standard-basic" select label="Category" variant="outlined" />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          label="For mobile"
          value={date}
          onChange={(newDate) => {
            setDate(dayjs(newDate).format('MMMM D YYYY'));
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Box className={btnGroup} sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button onClick={() => dispatch(closeUpdateModal())}>Cancel</Button>
        <Button type="submit" sx={{ ml: 3 }} variant="contained">Submit</Button>
      </Box>
    </Box>
  )
}

export default function ExpenseForm() {
  const open = useSelector(state => state.entities.interface.updateModalActive);

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