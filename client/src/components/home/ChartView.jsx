import { Doughnut } from 'react-chartjs-2';

const ChartView = () => {
  const data = {
    labels: ['Mobile', 'Desktop', 'Tablet'],
    datasets: [
      {
        label: 'Device Usage',
        data: [60, 30, 10], // Yüzdelik dağılım
        backgroundColor: [
          'rgb(75, 192, 192)', // Mobile
          'rgb(54, 162, 235)', // Desktop
          'rgb(255, 205, 86)', // Tablet
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="py-8">
      <Doughnut data={data} />
    </div>
  );
};

export default ChartView;
