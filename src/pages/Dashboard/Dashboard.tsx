import React from 'react';
import { Typography } from '@mui/material';
import Header from '../../components/Header/Header';


const Dashboard: React.FC = () => {
  return (
    <>
    <Header />
    <div className="dashboard">
          <Typography variant="h4" className="dashboard-title">
              Dashboard
          </Typography>
    </div>
    </>
  );
};

export default Dashboard;