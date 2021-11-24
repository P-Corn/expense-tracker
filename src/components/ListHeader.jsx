import { useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';

function ListHeader({ title, Button }) {

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between',
      px: 2
    }}>
      <Box>
        <Typography
          variant="h5"
          component="h2"
        >
          { title }
        </Typography>
      </Box>
      <Box>
        { Button }
      </Box>
    </Box>
  );
}

export default ListHeader;