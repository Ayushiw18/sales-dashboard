import React, { useState } from 'react';
import MyChartComponent from './Components/MyChartComponent';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import Dashboard from './Components/Dashboard';
import './App.css';

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState('light');

  return (
    <div className={`app ${theme}`}>
      <Sidebar
        collapsed={collapsed}
        toggleCollapse={() => setCollapsed(!collapsed)}
        theme={theme}
        toggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />
      <div className="main">
        <Header />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;