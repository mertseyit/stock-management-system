import { useContext, useEffect, useState } from 'react';
import { Button, InputNumber, Message, SelectPicker, useToaster } from 'rsuite';
import { DataContext } from '../../contexts/DataContext';
import { PROCESS_TYPE } from '../../api/parameters';
import { RiCheckLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const StockProcessAddFrom = () => {
  const {
    allMaterials,
    allUnits,
    allSupliers,
    getAllMaterials,
    getAllUnits,
    getAllSupliers,
    crateStockProcess,
  } = useContext(DataContext);
  const toaster = useToaster();

  const [materialId, setMaterialId] = useState();
  const [stockAmount, setStockAmount] = useState(1);
  const [processType, setProcessType] = useState();
  const [unit, setUnit] = useState();
  const [suplierId, setSuplierId] = useState();

  const [submiting, setSubmiting] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getAllMaterials();
    getAllUnits();
    getAllSupliers();
  }, []);

  useEffect(() => {
    if (processType === 1) {
      setSuplierId(6);
    }
  }, [processType]);

  const handleSubmit = async () => {
    if (
      materialId === undefined ||
      stockAmount === undefined ||
      processType === undefined ||
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
      crateStockProcess({
        malzeme_id: materialId,
        stok_miktari: stockAmount,
        islem_turu: processType,
        birim_id: unit,
        tedarikci_id: suplierId,
      });
      setSubmiting(false);
      getAllMaterials();
      navigate('/stock-processes');
    }
  };

  return (
    <div className="flex w-full justify-start ">
      {allMaterials && allUnits && allSupliers ? (
        <div className="max-w-[600px] w-full border rounded-ms shadow-md p-4">
          <div className="mb-5">
            <label
              className="font-semibold mb-2 pb-2 d-block text-md"
              htmlFor="malzeme_id"
            >
              Malzeme Adı
            </label>
            <SelectPicker
              name="malzeme_id"
              className="w-full mt-2"
              data={allMaterials.data.map((item) => ({
                label: item.malzeme_adi,
                value: item.id,
              }))}
              value={materialId}
              onChange={(e) => setMaterialId(e)}
              searchable={false}
            />
          </div>
          <div className="mb-5">
            <label
              className="font-semibold mb-2 pb-2 d-block text-md"
              htmlFor="stok_miktari"
            >
              İşlem Yapılacak Stok Miktarı
            </label>
            <InputNumber
              name="stok_miktari"
              className="w-full mt-2"
              value={stockAmount}
              type="number"
              onChange={(e) => setStockAmount(Number(e))}
            />
          </div>
          <div className="mb-5">
            <label
              className="font-semibold mb-2 pb-2 d-block text-md"
              htmlFor="islem_turu"
            >
              İşlem Türü
            </label>
            <SelectPicker
              name="islem_turu"
              className="w-full mt-2"
              data={PROCESS_TYPE}
              searchable={false}
              value={processType}
              onChange={(e) => setProcessType(e)}
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
              onChange={(e) => setUnit(e)}
              disabledItemValues={allUnits.data
                .filter((unit) => {
                  // Seçili malzemeyi bul
                  const selectedMaterial = allMaterials.data.find(
                    (material) => material.id === materialId
                  );
                  // Eğer birimin id'si seçili malzemenin birim_id'si ile eşleşmiyorsa disable et
                  return selectedMaterial?.birim_id !== unit.id;
                })
                .map((unit) => unit.id)}
            />
          </div>
          {processType === 0 && (
            <div className="mb-5">
              <label
                className="font-semibold mb-2 pb-2 d-block text-md"
                htmlFor="birim_id"
              >
                Tedarikçi
              </label>
              <SelectPicker
                placement="auto"
                name="tedarikci_id"
                className="w-full mt-2"
                data={allSupliers.data.map((item) => ({
                  label: `${item.tedarikci_adi} - ${item.minimum_parti_buyuklugu}`,
                  value: item.id,
                }))}
                searchable={false}
                value={suplierId}
                onChange={(e) => setSuplierId(e)}
                disabledItemValues={allSupliers.data
                  .filter((item) => item.minimum_parti_buyuklugu > stockAmount)
                  .map((item) => item.id)}
              />
            </div>
          )}
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

export default StockProcessAddFrom;
