import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import { Box, Typography } from '@mui/material';
import { getTotalBudget } from '../store/categories';
import { getViewWidth } from '../store/interface';
import { useSelector } from 'react-redux';
Chart.register(ArcElement, Tooltip, Legend);

const BarChart = ({ data, totalSpent }) => {

  const viewWidth = useSelector(getViewWidth);
  const totalBudget = useSelector(getTotalBudget);

  const chartData = {
    labels: Object.keys(data).map(item => item),
    datasets: [
      {
        label: '# of Votes',
        data: Object.keys(data).map(item => data[item]),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ 
      width: viewWidth < 600 ? '100%' : 500, 
      position: 'relative',
    }}>
      <Doughnut data={chartData} />
      <Box sx={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        <Typography>Spent: <strong>{`$${totalSpent}`}</strong></Typography>
        <Typography>Budget: <strong>{`$${totalBudget}`}</strong></Typography>
      </Box>
    </Box>
  )
}

export default BarChart;