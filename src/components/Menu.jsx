import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { setSortMethod } from '../store/interface';

export default function BasicMenu() {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    if (e.target.textContent === 'Recent')
      dispatch(setSortMethod('recent'));
    if (e.target.textContent === 'Month')
      dispatch(setSortMethod('month'));
    setAnchorEl(null);
  };

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
        <MenuItem onClick={(e) => handleClose(e)}>Recent</MenuItem>
        <MenuItem onClick={handleClose}>Month</MenuItem>
      </Menu>
    </div>
  );
}