import { useContext, useEffect } from 'react';
import Container from '../../components/layout/Container';
import MaterialTable from '../../components/material/MaterialTable';
import { DataContext } from '../../contexts/DataContext';
import { Link } from 'react-router-dom';
import { RiAddLine } from 'react-icons/ri';

const MaterialList = () => {
  const { allMaterials, getAllMaterials } = useContext(DataContext);
  useEffect(() => {
    getAllMaterials();
  }, [allMaterials]);
  return (
    <Container>
      <div className="py-8">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg mb-4">Malzemeler</h3>
          <Link
            to="/materials/add"
            className="flex bg-green-700 text-white px-3 py-2 rounded-md hover:text-white"
          >
            <RiAddLine className="me-2 text-lg" />
            <span className="font-bold text-xs">Yeni Malzeme</span>
          </Link>
        </div>
        {allMaterials ? (
          <MaterialTable data={allMaterials.data} />
        ) : (
          <span>Yükleniyor...</span>
        )}
      </div>
    </Container>
  );
};

export default MaterialList;
