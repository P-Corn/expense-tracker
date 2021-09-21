import React from 'react';
import Paper from '@mui/material/Paper';

function CardContainer({ children }) {
  return (
    <Paper
      elevation={7}
      sx={{ 
        height: '75vh',
        p: 4
      }}
    >
      {children}
    </Paper>
  );
}

export default CardContainer;