import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../contexts/DataContext';
import {
  Button,
  Input,
  InputNumber,
  Message,
  SelectPicker,
  useToaster,
} from 'rsuite';
import { useNavigate } from 'react-router-dom';
import { RiCheckLine } from 'react-icons/ri';

const MaterialAddForm = () => {
  const {
    allSupliers,
    allUnits,
    getAllUnits,
    getAllSupliers,
    getAllMaterials,
    createMaterial,
  } = useContext(DataContext);

  const [material, setMaterial] = useState('');
  const [stockAmount, setStockAmount] = useState();
  const [criticalStockLevel, setCriticalStockLevel] = useState();
  const [unit, setUnit] = useState();

  const toaster = useToaster();
  const [submiting, setSubmiting] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getAllUnits();
    getAllSupliers();
  }, []);
  const handleSubmit = async () => {
    if (
      material === undefined ||
      stockAmount === undefined ||
      criticalStockLevel === undefined ||
      unit === undefined
    ) {
      toaster.push(
        <Message showIcon type={'error'} closable>
          Lütfen tüm alanları eksiksiz doldurun
        </Message>,
        {
          placement: 'topEnd',
          duration: 4000,
        }
      );
    } else {
      setSubmiting(true);
      console.log(material, stockAmount, criticalStockLevel, unit);
      createMaterial({
        malzeme_adi: material,
        stok_seviyesi: stockAmount,
        kritik_stok_seviyesi: criticalStockLevel,
        birim_id: unit,
      });
      setSubmiting(false);
      getAllMaterials();
      navigate('/materials');
    }
  };
  return (
    <div className="flex w-full justify-start ">
      {allSupliers && allUnits ? (
        <div className="max-w-[600px] w-full border rounded-ms shadow-md p-4">
          <div className="mb-5">
            <label
              className="font-semibold mb-2 pb-2 d-block text-md"
              htmlFor="malzeme_adi"
            >
              Malzeme Adı
            </label>
            <Input
              type="text"
              name="malzeme_adi"
              value={material}
              onChange={(e) => setMaterial(e)}
            />
          </div>
          <div className="mb-5">
            <label
              className="font-semibold mb-2 pb-2 d-block text-md"
              htmlFor="stok_seviyesi"
            >
              Stok Seviyesi
            </label>
            <InputNumber
              name="stok_seviyesi"
              className="w-full mt-2"
              value={stockAmount}
              type="number"
              onChange={(e) => setStockAmount(Number(e))}
            />
          </div>
          <div className="mb-5">
            <label
              className="font-semibold mb-2 pb-2 d-block text-md"
              htmlFor="kritik_stok_seviyesi"
            >
              Kritik Stok Seviyesi
            </label>
            <InputNumber
              name="kritik_stok_seviyesi"
              className="w-full mt-2"
              value={criticalStockLevel}
              type="number"
              onChange={(e) => setCriticalStockLevel(Number(e))}
            />
          </div>
          <div className="mb-5">
            <label
              className="font-semibold mb-2 pb-2 d-block text-md"
              htmlFor="birim_id"
            >
              Birim
            </label>
            <SelectPicker
              placement="auto"
              name="birim_id"
              className="w-full mt-2"
              data={allUnits.data.map((item) => ({
                label: item.birim_turu,
                value: item.id,
              }))}
              searchable={false}
              value={unit}
              onChange={(e) => setUnit(e)}
            />
          </div>
          <Button
            onClick={handleSubmit}
            color="green"
            appearance="primary"
            className="w-full text-center"
            type="button"
            loading={submiting}
          >
            <span className="font-semibold flex items-center justify-center gap-1">
              <RiCheckLine className="text-xl mt-1" />
              Stok İşlemi Ekle
            </span>
          </Button>
        </div>
      ) : (
        <span>Yükleniyor...</span>
      )}
    </div>
  );
};

export default MaterialAddForm;
