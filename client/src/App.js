import './App.css';
import Homepage from './components/pages/Homepage';
import {StoreProvider} from './utils/GlobalState';

function App() {
  return (
    <StoreProvider>
      <Homepage/>
  </StoreProvider>
  );
}

export default App;
