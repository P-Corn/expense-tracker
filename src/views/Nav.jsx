/** @jsxRuntime classic /
/** @jsx jsx */
import * as React from 'react';
import { jsx } from '@emotion/react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { openModal } from '../store/interface';

export default function Nav() {
  const dispatch = useDispatch();

  return (
    <Box 
      sx={{ flexGrow: 1 }}
      css={{
        marginBottom: 25,
        '@media(min-width: 959px)': {
          marginBottom: 50
        }
      }}
    >
      <AppBar position="static">
        <Toolbar sx={{ 
          display: 'flex', 
          justifyContent: 'space-between' 
        }}>
          <Typography variant="h6" component="div">
            Expense Tracker
          </Typography>
          <Button endIcon={<Add/>} color="inherit" onClick={() => dispatch(openModal())}>Add Expense</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}