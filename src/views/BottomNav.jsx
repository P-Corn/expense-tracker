import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BarChartIcon from '@mui/icons-material/BarChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch } from 'react-redux';
import { changeTab } from '../store/interface';
import { useHistory } from 'react-router-dom';

export default function BottomNav() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) history.push('/summary')
    if (newValue === 1) history.push('/expenses')
    if (newValue === 2) history.push('/settings')
  }

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(e, newValue) => handleChange(e, newValue)}
      >
        <BottomNavigationAction label="Summary" icon={<BarChartIcon />} />
        <BottomNavigationAction label="Expenses" icon={<AttachMoneyIcon />} />
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
      </BottomNavigation>
    </Paper>
  );
}