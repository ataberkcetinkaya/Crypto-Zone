import { Route, Routes } from 'react-router-dom';
import './App.css';
import CryptoTable from './components/CryptoTable';
import Stars from './pages/Stars';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CryptoTable />} />
      <Route path="stars" element={<Stars />} />
    </Routes>
  );
}

export default App;
