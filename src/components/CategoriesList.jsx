import { List, ListItem, ListItemText, IconButton, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { getCategories, updateCategory } from '../store/settings';
import { toggleAddCategoryModal } from '../store/interface';
import { useDispatch, useSelector } from 'react-redux';

function CategoriesList(props) {

  const dispatch = useDispatch();
  const categories = useSelector(getCategories);

  const onEdit = () => {
    
  }

  const handleAddCategory = () => dispatch(toggleAddCategoryModal())

  return (
    <div>
      <List>
        {
          categories.map(category => (
            <ListItem
              secondaryAction={
                <IconButton>
                  <EditIcon />
                </IconButton>
              }
            >
              <ListItemText primary={category.title} secondary={category.budget} />
            </ListItem>
          ))
        }
      </List>
      <Box sx={{ px: 2 }}>
        <Button 
          variant="outlined" 
          fullWidth 
          onClick={() => handleAddCategory()}
          endIcon={<AddIcon />}
        >
          Add Category
        </Button>
      </Box>
    </div>
  );
}

export default CategoriesList;