import { Route, Routes } from 'react-router-dom';
import './App.css';
import CryptoTable from './components/CryptoTable';
import Stars from './pages/Stars';
import DataContext from './context/DataContext';

function App() {
  return (
    <DataContext>
      <Routes>
        <Route path="/" element={<CryptoTable />} />
        <Route path="stars" element={<Stars />} />
      </Routes>
    </DataContext>
  );
}

export default App;
