import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { setSortMethod, setSortMonth } from '../store/interface';
import { populateExpensesByMonth } from '../store/expenses';
import dateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import dayjs from 'dayjs';

export default function BasicMenu() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [month, setMonth] = useState('');
  const open = Boolean(anchorEl);
  
  const handleClose = () => setAnchorEl(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSort = (e) => {
    dispatch(setSortMethod('Recent'));
    setMonth('');
    handleClose();
  };

  const handleDateChange = (newDate) => {
    dispatch(populateExpensesByMonth(newDate));
    setMonth(newDate);
    dispatch(setSortMonth(newDate));
    dispatch(setSortMethod('Month'));
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Sort
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={(e) => handleSort(e)}>Recent</MenuItem>
        <LocalizationProvider dateAdapter={dateAdapter}>
          <DatePicker
            views={['month', 'year']}
            minDate={new Date('2012-03-01')}
            maxDate={new Date('2023-06-01')}
            label="Month"
            value={month}
            onClose={() => handleClose()}
            onChange={ (newValue) => handleDateChange(dayjs(newValue).format('MMMM YYYY')) }
            renderInput={(params) =>
              <TextField 
                {...params} 
                error={false}
                sx={{ marginTop: .5 }}
              />
            }
          />
        </LocalizationProvider>
      </Menu>
    </div>
  );
}