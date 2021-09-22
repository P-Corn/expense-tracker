import './App.css';
import { Provider } from 'react-redux';
import Nav from './views/Nav';
import ResponsiveController from './controllers/ResponsiveController';
import configureStore from './store/configureStore';
import AddExpenseModal from './components/AddExpenseModal';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Nav />
        <ResponsiveController />
        <AddExpenseModal />
      </div>
    </Provider>
  );
}

export default App;
