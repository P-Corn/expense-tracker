import './App.css';
import { Provider } from 'react-redux';
import Nav from './views/Nav';
import ResponsiveController from './controllers/ResponsiveController';
import configureStore from './store/configureStore';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Nav />
        <ResponsiveController />
      </div>
    </Provider>
  );
}

export default App;
