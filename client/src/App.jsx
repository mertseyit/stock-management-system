import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MaterialList from './pages/materials/MaterialList';
import MaterialAdd from './pages/materials/MaterialAdd';
import MaterialEdit from './pages/materials/MaterialEdit';
import StockProcessList from './pages/stock_process/StockProcessList';
import SuplierList from './pages/supliers/SuplierList';
import UnitList from './pages/units/UnitList';
import StockProcessAdd from './pages/stock_process/StockProcessAdd';
import CustomNavbar from './components/layout/CustomNavbar';
const App = () => {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/materials" element={<MaterialList />} />
        <Route path="/materials/add" element={<MaterialAdd />} />
        <Route path="/materials/edit/:id" element={<MaterialEdit />} />
        <Route path="/stock-processes" element={<StockProcessList />}></Route>
        <Route path="/stock-processes/add" element={<StockProcessAdd />} />
        <Route path="/supliers" element={<SuplierList />} />
        <Route path="/unit" element={<UnitList />} />
        <Route path="*" element />
      </Routes>
    </Router>
  );
};

export default App;
