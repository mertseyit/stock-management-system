import { createRoot } from 'react-dom/client';
import './assets/css/index.css';
import 'rsuite/dist/rsuite.min.css';
import App from './App.jsx';
import { DataProvider } from './contexts/DataContext.jsx';

createRoot(document.getElementById('root')).render(
  <DataProvider>
    <App />
  </DataProvider>
);
