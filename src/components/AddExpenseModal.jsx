import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';

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

const Form = () => (
  <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <TextField id="standard-basic" label="Amount" variant="standard" />
    <TextField id="standard-basic" label="Title" variant="standard" />
    <TextField id="standard-basic" label="Description" variant="standard" />
    <TextField id="standard-basic" label="Category" variant="standard" />
    <TextField id="standard-basic" label="Date" variant="standard" />
  </Box>
)

export default function AddExpenseModal() {
  const open = useSelector(state => state.entities.interface.openModal);

  console.log(open)

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