/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../api/parameters';
import { useToaster, Message } from 'rsuite';
// eslint-disable-next-line react-refresh/only-export-components
export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  //global error handler
  const [globalError, setGlobalError] = useState(null);
  //units (birimler)
  const [allUnits, setAllUnits] = useState(null);
  const getAllUnits = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/birim/all`);
      console.log(data);
      if (data.status === 200) {
        setAllUnits(data);
      } else {
        setGlobalError('Sunucu Kaynaklı Bir Hata Meydana Geldli !');
      }
    } catch (error) {
      console.log(error);
      setGlobalError(error.message);
    }
  };

  //supliers (tedarikçiler)
  const [allSupliers, setAllSupliers] = useState(null);
  const getAllSupliers = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/tedarikci/all`);
      if (data.status === 200) {
        setAllSupliers(data);
      } else {
        setGlobalError('Sunucu Kaynaklı Bir Hata Meydana Geldli !');
      }
    } catch (error) {
      setGlobalError(error.message);
    }
  };

  //materials (malzemeler)
  const [allMaterials, setAllMaterials] = useState(null);
  const getAllMaterials = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/malzeme/all`);
      if (data.status === 200) {
        setAllMaterials(data);
      } else {
        setGlobalError('Sunucu Kaynaklı Bir Hata Meydana Geldli !');
      }
    } catch (error) {
      setGlobalError(error.message);
    }
  };

  const createMaterial = async (data) => {
    try {
      await axios.post(`${API_URL}/malzeme/create`, data);
    } catch (error) {
      console.log(error);
      setGlobalError('Sunucu Kaynaklı Bir Hata Meydana Geldli !');
    }
  };

  const deleteMaterial = async (id) => {
    try {
      const { data } = await axios.delete(`${API_URL}/malzeme/delete/${id}`);
      if (data.status === 200) {
        getAllMaterials();
      } else {
        setGlobalError('Sunucu Kaynaklı Bir Hata Meydana Geldli !');
      }
    } catch (error) {
      setGlobalError(error.message);
    }
  };

  // stock process (stok işlemi giriş/çıkış)
  const [allStockProcess, setAllStockProcess] = useState(null);
  const getAllStockProcess = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/stok-islemi/all`);
      if (data.status === 200) {
        setAllStockProcess(data);
      } else {
        setGlobalError('Sunucu Kaynaklı Bir Hata Meydana Geldli !');
      }
    } catch (error) {
      setGlobalError(error.message);
    }
  };

  const crateStockProcess = async (data) => {
    try {
      const { data2 } = await axios.post(`${API_URL}/stok-islemi/create`, data);
      console.log(data2);
    } catch (error) {
      setGlobalError('Sunucu Kaynaklı Bir Hata Meydana Geldli !');
    }
  };

  const message = (
    <Message showIcon type={'error'} closable>
      {globalError}
    </Message>
  );
  const toaster = useToaster();
  useEffect(() => {
    if (globalError) {
      toaster.push(message, { placement: 'topEnd', duration: 5000 });
      setInterval(() => {
        toaster.clear();
        setGlobalError(null);
      }, 4000);
    }
  }, [globalError]);

  return (
    <DataContext.Provider
      value={{
        getAllUnits,
        getAllSupliers,
        getAllMaterials,
        createMaterial,
        deleteMaterial,
        getAllStockProcess,
        crateStockProcess,
        setGlobalError,
        allUnits,
        allSupliers,
        allMaterials,
        allStockProcess,
        globalError,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
