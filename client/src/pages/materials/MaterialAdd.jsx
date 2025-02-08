import Container from '../../components/layout/Container';
import MaterialAddForm from '../../components/material/MaterialAddForm';

const MaterialAdd = () => {
  return (
    <Container>
      <div className="py-8">
        <div className="flex items-center py-8 justify-between">
          <h3 className="font-bold text-lg mb-4">Malzeme Ekle</h3>
        </div>
        <MaterialAddForm />
      </div>
    </Container>
  );
};

export default MaterialAdd;
