import { Modal, TextField, Box, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toggleUpdateCategoryModal } from '../store/interface';
import { updateCategory, getCategoryBeingEdited, editCategory } from '../store/settings';
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
  const dispatch = useDispatch();
  const { _id, title, budget } = useSelector(getCategoryBeingEdited);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      id: _id,
      title,
      budget
    }
  });

  const handleClose = () => {
    dispatch(editCategory({}));
  }

  const onSubmit = (data) => {
    dispatch(updateCategory(data));
    dispatch(toggleUpdateCategoryModal());
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
        {...register("budget", {
          required: 'Required',
          maxLength: {
            value: 10,
            message: 'Too long'
          }
        })}
        type="number"
        helperText={ errors.budget ? errors.budget.message : ''}
        label="Budget" 
        variant="outlined"
        error={errors.amount ? true : false}
      />
      <Box className={btnGroup} sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" sx={{ ml: 3 }} variant="contained">Submit</Button>
      </Box>
    </Box>
  )
}

export default function UpdateCategoryForm() {
  const open = useSelector(state => state.entities.interface.updateCategoryModalActive);

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