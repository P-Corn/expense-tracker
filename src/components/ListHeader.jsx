import { useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';
import Menu from './Menu';
import { getSortMonth, getSortMethod } from '../store/interface';

function ListHeader(props) {

  const sortMethod = useSelector(getSortMethod);
  const sortMonth = useSelector(getSortMonth);

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
          { sortMethod === 'Recent' ? sortMethod : sortMonth }
        </Typography>
      </Box>
      <Box>
        <Menu />
      </Box>
    </Box>
  );
}

export default ListHeader;