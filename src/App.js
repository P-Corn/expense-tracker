import './App.css';
import { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import Nav from './views/Nav';
import configureStore from './store/configureStore';
import ExpenseForm from './components/ExpenseForm';
import BottomNav from './views/BottomNav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Summary from './views/Summary';
import Expenses from './views/Expenses';
import Settings from './views/Settings';
import LoadData from './controllers/LoadData';
import { Box } from '@mui/material';

const store = configureStore();

function App() {

  return (
    <Provider store={store}>
      <Router>
        <LoadData>
          <Nav />
          <ExpenseForm />
          <Switch>
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
        </LoadData>
        <BottomNav />
      </Router>
    </Provider>
  );
}

export default App;
