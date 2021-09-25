import * as React from 'react';
import { Modal, TextField, Box, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../store/interface';
import { flexbox } from '@mui/system';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 465,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const btnGroup = {
  width: '100%'
}

const Form = ({ dispatch }) => (
  <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '100%' },
    }}
    noValidate
    autoComplete="off"
  >
    <TextField id="standard-basic" label="Amount" variant="standard" />
    <TextField id="standard-basic" label="Title" variant="standard" />
    <TextField id="standard-basic" label="Description" variant="standard" />
    <TextField id="standard-basic" label="Category" variant="standard" />
    <TextField id="standard-basic" label="Date" variant="standard" />
    <Box className={btnGroup} sx={{ display: 'flex', justifyContent: 'end' }}>
      <Button onClick={() => dispatch(closeModal())}>Cancel</Button>
      <Button variant="contained">Submit</Button>
    </Box>
  </Box>
)

export default function AddExpenseModal() {
  const open = useSelector(state => state.entities.interface.openModal);

  const dispatch = useDispatch();

  console.log(open)

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form dispatch={dispatch} />
        </Box>
      </Modal>
    </div>
  );
}