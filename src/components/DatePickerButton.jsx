import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import TextField from '@mui/material/TextField';
import { getDateToSummarize, setDateToSummarize } from '../store/interface';
import dateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import dayjs from 'dayjs';

export default function BasicMenu() {
  const dispatch = useDispatch();
  const dateToSummarize = useSelector(getDateToSummarize);

  const [anchorEl, setAnchorEl] = useState(null);
  const [month, setMonth] = useState(dateToSummarize);
  const open = Boolean(anchorEl);
  
  const handleClose = () => setAnchorEl(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDateChange = (newDate) => {
    if (newDate === 'Invalid Date')
      return;
    setMonth(newDate);
    dispatch(setDateToSummarize(newDate));
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
          sx: { padding: 0 }
        }}
      >
        <LocalizationProvider dateAdapter={dateAdapter}>
          <MobileDatePicker
            views={['month', 'year']}
            minDate={dayjs('2012-03-01')}
            maxDate={dayjs('2023-06-01')}
            value={month}
            onClose={() => handleClose()}
            onChange={ (newValue) => handleDateChange(dayjs(newValue).format('MMMM YYYY')) }
            renderInput={(params) =>
              <TextField 
                {...params} 
                error={false}
              />
            }
          />
        </LocalizationProvider>
      </Menu>
    </div>
  );
}