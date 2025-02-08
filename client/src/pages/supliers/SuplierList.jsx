import { useContext, useEffect } from 'react';
import Container from '../../components/layout/Container';
import SuplierTable from '../../components/suplier/SuplierTable';
import { DataContext } from '../../contexts/DataContext';

const SuplierList = () => {
  const { allSupliers, getAllSupliers } = useContext(DataContext);
  useEffect(() => {
    getAllSupliers();
  }, []);
  return (
    <Container>
      <div className="py-8">
        <h3 className="font-bold text-lg mb-4">Tedarikçiler</h3>
        {allSupliers ? (
          <SuplierTable data={allSupliers.data} />
        ) : (
          <span>Yükleniyor...</span>
        )}
      </div>
    </Container>
  );
};

export default SuplierList;
