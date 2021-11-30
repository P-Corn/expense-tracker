import React from 'react';
import CategoriesList from '../components/CategoriesList';
import ListHeader from '../components/ListHeader';
import {Box} from '@mui/material';

function Settings() {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <CategoriesList />
    </Box>
  );
}

export default Settings;