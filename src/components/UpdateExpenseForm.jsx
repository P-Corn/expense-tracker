import {useEffect, useState} from 'react';
import { Modal, TextField, Box, Button, Select, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toggleUpdateExpenseModal } from '../store/interface';
import { getCategories } from '../store/categories';
import { getExpenseToEdit, updateExpense } from '../store/expenses';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDate from '@mui/lab/AdapterDayjs';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

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
  const { _id, amount, title, description, category, date } = useSelector(getExpenseToEdit);
  const dispatch = useDispatch();

  const categories = useSelector(getCategories);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      id: _id, 
      amount,
      title,
      description,
      category,
      date
    }
  });

  const [displayedDate, setDisplayedDate] = useState(date);

  const onSubmit = (data) => {
    dispatch(updateExpense({...data}));
    dispatch(toggleUpdateExpenseModal());
  }

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { my: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField 
        {...register("amount", {
          required: 'Required',
          maxLength: {
            value: 10,
            message: 'Too long'
          }
        })} 
        type="number"
        helperText={ errors.amount ? errors.amount.message : ''}
        label="Amount" 
        variant="outlined"
        error={errors.amount ? true : false}
        InputProps={{
          startAdornment: '$'
        }}
      />
      <TextField 
        {...register("title", {
          required: 'Required',
          maxLength: {
            value: 30,
            message: 'Too long'
          }
        })}
        helperText={ errors.title ? errors.title.message : ''}
        label="Title" 
        variant="outlined"
        error={errors.title ? true : false}
      />
      <TextField 
        {...register("description", {
          maxLength: {
            value: 60,
            message: 'Too long'
          }
        })}
        helperText={ errors.description ? errors.description.message : ''}
        label="Description"
        variant="outlined"
        error={errors.description ? true : false}
      />
      <TextField 
        {...register("category", {
          required: 'Required',
        })}
        select
        onChange={(category) => { setValue('category', category, { shouldValidate: true }) }}
        label="Category"
        variant="outlined"
        error={errors.category ? true : false}
      >
        {
          categories.map(category => (
            <MenuItem key={category._id} value={category.title}>{category.title}</MenuItem>
          ))
        }
      </TextField>
      <LocalizationProvider dateAdapter={AdapterDate}>
        <MobileDatePicker
          error={errors.date ? true : false}
          label="Date"
          value={displayedDate}
          {...register("date")}
          onChange={(newDate) => {
            const formattedDate = dayjs(newDate).format('MMMM D YYYY');
            setDisplayedDate(formattedDate);
            setValue('date', formattedDate, { shouldValidate: true });
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Box className={btnGroup} sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button onClick={() => dispatch(toggleUpdateExpenseModal())}>Cancel</Button>
        <Button type="submit" sx={{ ml: 3 }} variant="contained">Submit</Button>
      </Box>
    </Box>
  )
}

export default function ExpenseForm() {
  const open = useSelector(state => state.entities.interface.updateExpenseModalActive);

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