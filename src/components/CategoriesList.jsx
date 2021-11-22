import { List, ListItem, ListItemText, IconButton, Button, Box, Menu, MenuItem, Divider } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { getCategories, editCategory, deleteCategory } from '../store/settings';
import { toggleAddCategoryModal } from '../store/interface';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

function CategoriesList(props) {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories) || [];
  
  // MENU
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState('');

  const handleClick = (event, category) => {
    setAnchorEl(event.currentTarget);
    setOpen({...category});
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen('');
  };

  useEffect(() => console.log('rendered'), [])

   // HANDLERS
  const handleEdit = category => {
    dispatch(editCategory(category));
    handleClose();
  };
  const handleDelete = category => {
    if (categories.length < 2)
      return;
    dispatch(deleteCategory(category));
    handleClose();
  }
  const handleAddCategory = () => dispatch(toggleAddCategoryModal());

  const CategoryMenu = ({ category }) => (
    <Menu
      id='basic-menu'
      anchorEl={anchorEl}
      open={open._id == category._id ? true : false}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={(e) => handleEdit(category)}>Edit</MenuItem>
      <Divider />
      <MenuItem onClick={() => handleDelete(category)}>Delete</MenuItem>
    </Menu>
  )

  return (
    <div>
      <List>
        {
          categories.map(category => (
            <div key={category._id}>
              <CategoryMenu category={category} />
              <ListItem
                secondaryAction={
                  <IconButton 
                    onClick={(e) => handleClick(e, category)}
                    aria-controls='basic-menu'
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <MoreVertIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={category.title} secondary={`$${category.budget}`} />
              </ListItem>
            </div> 
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