import React, { useEffect, useState } from 'react';
import { getStates, getDates, getDashboardData } from '../services/api';
import ReactECharts from 'echarts-for-react';
import './Dashboard.css';

const Dashboard = () => {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [data, setData] = useState({ totalSales: 0, totalProfit: 0, totalOrders: 0, chartData: [] });

  useEffect(() => {
    getStates().then(res => {
      setStates(res.data);
      setSelectedState(res.data[0]);
    });
  }, []);

  useEffect(() => {
    if (selectedState) {
      getDates(selectedState).then(res => {
        setDateRange({ from: res.data.minDate, to: res.data.maxDate });
      });
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedState && dateRange.from && dateRange.to) {
      getDashboardData({
        state: selectedState,
        fromDate: dateRange.from,
        toDate: dateRange.to,
      }).then(res => {
        setData(res.data);
      });
    }
  }, [selectedState, dateRange]);

  return (
    <div className="dashboard">
      <div className="filters">
        <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
          {states.map((state) => (
            <option key={state}>{state}</option>
          ))}
        </select>
        <input type="date" value={dateRange.from} onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })} />
        <input type="date" value={dateRange.to} onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })} />
      </div>

      <div className="cards">
        <div className="card">Total Sales: ${data.totalSales.toFixed(2)}</div>
        <div className="card">Total Profit: ${data.totalProfit.toFixed(2)}</div>
        <div className="card">Total Orders: {data.totalOrders}</div>
      </div>

      <div className="chart">
        <ReactECharts
          option={{
            xAxis: {
              type: 'category',
              data: data.chartData.map(item => item['Order Date']),
            },
            yAxis: {
              type: 'value',
            },
            series: [
              {
                data: data.chartData.map(item => item.Sales),
                type: 'bar',
              },
            ],
          }}
          style={{ height: 400 }}
        />
      </div>
    </div>
  );
};

export default Dashboard;