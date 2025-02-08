import Container from '../../components/layout/Container';
import StockProcessAddForm from '../../components/stock-process/StockProcessAddForm';
const StockProcessAdd = () => {
  return (
    <Container>
      <div className="flex items-center py-8 justify-between">
        <h3 className="font-bold text-lg mb-4">Stok İşlemi Ekle</h3>
      </div>
      <StockProcessAddForm />
    </Container>
  );
};

export default StockProcessAdd;
