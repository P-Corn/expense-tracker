import './App.css';
import { Provider } from 'react-redux';
import Nav from './views/Nav';
import configureStore from './store/configureStore';
import AddExpenseForm from './components/AddExpenseForm';
import UpdateExpenseForm from './components/UpdateExpenseForm';
import BottomNav from './views/BottomNav';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Summary from './views/Summary';
import Expenses from './views/Expenses';
import Settings from './views/Settings';
import LoadData from './controllers/LoadData';
import AddCategoryForm from './components/AddCategoryForm';
import UpdateCategoryForm from './components/UpdateCategoryForm';
import { Box } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import green from '@mui/material/colors/green';
import Backdrop from './components/Backdrop';

const theme = createTheme({
  palette: {
    primary: {
      main: green[600]
    },
    light: {
      main: '#ffffff'
    },
  },
});

const store = configureStore();

function App() {

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <LoadData>
            <Nav />
            <AddExpenseForm />
            <UpdateExpenseForm />
            <AddCategoryForm />
            <UpdateCategoryForm />
            <Backdrop />
            <Box sx={{ height: `${window.innerHeight - 170}px` }}>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/summary" />
                </Route>
                <Route path="/summary">
                  <Summary />
                </Route>
                <Route path="/expenses">
                  <Expenses />
                </Route>
                <Route path="/settings">
                  <Settings />
                </Route>
              </Switch>
            </Box>
          </LoadData>
          <BottomNav />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
