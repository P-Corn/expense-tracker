import { useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';
import Menu from './Menu';

function ListHeader(props) {
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
          Recent
        </Typography>
      </Box>
      <Box>
        <Menu />
      </Box>
    </Box>
  );
}

export default ListHeader;