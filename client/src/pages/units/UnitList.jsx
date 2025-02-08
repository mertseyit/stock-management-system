import Container from '../../components/layout/Container';
import { useContext, useEffect } from 'react';
import { DataContext } from '../../contexts/DataContext';
import UnitTable from '../../components/unit/UnitTable';
const UnitList = () => {
  const { allUnits, getAllUnits } = useContext(DataContext);
  useEffect(() => {
    getAllUnits();
  }, []);
  useEffect(() => {
    console.log(allUnits);
  }, [allUnits]);
  return (
    <Container>
      <div className="py-8">
        <h3 className="font-bold text-lg mb-4">Birimler</h3>
        {allUnits ? (
          <UnitTable data={allUnits.data} />
        ) : (
          <span>Yükleniyor...</span>
        )}
      </div>
    </Container>
  );
};

export default UnitList;
