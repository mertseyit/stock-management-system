import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useContext, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { DataContext } from '../contexts/DataContext';

// Chart.js modüllerini kaydet
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartView = () => {
  const { allMaterials, getAllMaterials } = useContext(DataContext);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    getAllMaterials();
  }, []);

  useEffect(() => {
    if (allMaterials) {
      // allMaterials'tan grafik verisini hazırla
      const labels = allMaterials.data.map((item) => item.malzeme_adi); // Malzeme adları
      const data = allMaterials.data.map((item) => item.stok_seviyesi); // Stok seviyeleri
      const backgroundColor = [
        'rgb(255, 99, 132)', // İlk malzeme
        'rgb(54, 162, 235)', // İkinci malzeme
        'rgb(75, 192, 192)', // Üçüncü malzeme
        'rgb(255, 205, 86)', // Dördüncü malzeme
        'rgb(153, 102, 255)', // Beşinci malzeme (gerekirse daha fazla eklenebilir)
      ];
      setChartData({
        labels,
        datasets: [
          {
            label: 'Stok Seviyeleri',
            data,
            backgroundColor: backgroundColor.slice(0, labels.length),
            hoverOffset: 4,
          },
        ],
      });
    }
  }, [allMaterials]);

  return (
    <div className="py-8 flex w-100 justify-center items-center mt-10">
      <div className="w-[400px] h-[400px]">
        {chartData ? (
          <>
            {allMaterials.data.length ? (
              <Doughnut data={chartData} />
            ) : (
              <span className="text-center w-full block">
                Kayıtlı Veri Bulunamadı
              </span>
            )}
          </>
        ) : (
          <span>Yükleniyor...</span>
        )}
      </div>
    </div>
  );
};

export default ChartView;
