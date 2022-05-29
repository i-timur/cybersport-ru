import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './App';
import {AuthProvider, StoreProvider} from './contexts';
import {ModalConstructor} from './components';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

ReactDOM.render(
  <Router>
    <AuthProvider>
      <StoreProvider>
        <App />
        <ModalConstructor />
      </StoreProvider>
    </AuthProvider>
  </Router>,
  document.getElementById('root')
);
