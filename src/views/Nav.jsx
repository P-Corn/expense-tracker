/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from '@emotion/react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { toggleAddExpenseModal } from '../store/interface';

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
          <Typography color="white" variant="h6" component="div">
            Expense Tracker
          </Typography>
          <Button color="light" endIcon={<Add/>} onClick={() => dispatch(toggleAddExpenseModal())}>Add Expense</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}