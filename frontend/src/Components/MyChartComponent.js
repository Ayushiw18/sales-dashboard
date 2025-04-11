import React from 'react';
import ReactECharts from 'echarts-for-react';

const MyChartComponent = () => {
  const chartOption = {
    xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar'] },
    yAxis: { type: 'value' },
    series: [{ data: [120, 200, 150], type: 'bar' }],
  };

  return (
    <div style={{ width: '600px', height: '400px' }}>
      <ReactECharts option={chartOption} />
    </div>
  );
};

export default MyChartComponent;