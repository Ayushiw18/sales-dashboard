import React from 'react';
import './Sidebar.css';
import { Button } from '@mui/material';

const Sidebar = ({ collapsed, toggleCollapse, theme, toggleTheme }) => {
  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <Button onClick={toggleCollapse}>☰</Button>
      <Button onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </Button>
    </div>
  );
};

export default Sidebar;