const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const salesData = require('./Sales.json'); // Make sure this path is correct

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

// ✅ Route: Get list of unique states
app.get('/api/states', (req, res) => {
  const states = [...new Set(salesData.map(sale => sale.State))];
  res.json(states);
});

// ✅ Route: Get min/max dates for a selected state
app.get('/api/dates', (req, res) => {
  const { state } = req.query;
  const filtered = salesData.filter(s => s.State === state);
  const dates = filtered.map(f => new Date(f['Order Date']));
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));
  res.json({
    minDate: minDate.toISOString().split('T')[0],
    maxDate: maxDate.toISOString().split('T')[0],
  });
});

// ✅ Route: Dashboard data (total sales, profit, orders, and chart data)
app.post('/api/dashboard-data', (req, res) => {
  const { state, fromDate, toDate } = req.body;

  const data = salesData.filter(s =>
    s.State === state &&
    new Date(s['Order Date']) >= new Date(fromDate) &&
    new Date(s['Order Date']) <= new Date(toDate)
  );

  const totalSales = data.reduce((acc, curr) => acc + parseFloat(curr.Sales), 0);
  const totalProfit = data.reduce((acc, curr) => acc + parseFloat(curr.Profit), 0);
  const totalOrders = data.length;

  res.json({ totalSales, totalProfit, totalOrders, chartData: data });
});

// Optional: base route


// ✅ Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));