import * as React from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { changeTab } from '../store/interface';

export default function TopNavController() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    const tabId = event.target.id;
    dispatch(changeTab(tabId));
    setValue(newValue);
  };

  return (
    <Box sx={{ 
      width: '100%',
      bgcolor: 'background.paper',
      mt: -4,
      mb: 4,
    }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab id="2" label="Expenses" />
        <Tab id="3" label="Settings" />
      </Tabs>
    </Box>
  );
}