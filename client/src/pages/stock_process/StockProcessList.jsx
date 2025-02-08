import StockProcessTable from '../../components/stock-process/StockProcessTable';
import { useContext, useEffect } from 'react';
import { DataContext } from '../../contexts/DataContext';
import Container from '../../components/layout/Container';
import { RiAddLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
const StockProcessList = () => {
  const { allStockProcess, getAllStockProcess } = useContext(DataContext);
  useEffect(() => {
    getAllStockProcess();
  }, [allStockProcess]);
  return (
    <Container>
      <div className="py-8">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg mb-4">Stok İşlemleri</h3>
          <Link
            to="/stock-processes/add"
            className="flex bg-green-700 text-white px-3 py-2 rounded-md hover:text-white"
          >
            <RiAddLine className="me-2 text-lg" />
            <span className="font-bold text-xs">Yeni Stok İşlemi</span>
          </Link>
        </div>
        {allStockProcess ? (
          <StockProcessTable data={allStockProcess.data} />
        ) : (
          <span>Yükleniyor...</span>
        )}
      </div>
    </Container>
  );
};

export default StockProcessList;
