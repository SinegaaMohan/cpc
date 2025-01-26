import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Opacity as HumidityIcon,
  Terrain as SoilIcon,
  Thermostat as TemperatureIcon,
  Update as LastUpdateIcon
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getFirestore, collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

const Dashboard = () => {
  const [sensorData, setSensorData] = useState([]);
  const [latestData, setLatestData] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const db = getFirestore();
    const q = query(collection(db, 'a0'), orderBy('Date', 'desc'), limit(100));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newData = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        newData.push({
          dateTime: `${data.Date} ${data.Time}`,
          humidity: data.Humidity,
          soilMoisture: data.SoilMoisture,
          temperature: parseFloat(data.Temperature.toFixed(2)),
        });
      });
      setSensorData(newData.reverse());
      setLatestData(newData[newData.length - 1] || {});
    });

    return () => unsubscribe();
  }, []);

  const renderSensorValue = (label, value, unit, icon) => (
    <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {icon}
      <Typography variant="h6" sx={{ mt: 1 }}>{label}</Typography>
      <Typography variant="h4">{value} {unit}</Typography>
    </Paper>
  );

  const renderChart = (title, dataKey, color) => (
    <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={sensorData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dateTime" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke={color} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );

  return (
    <Box sx={{ p: 3, minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom>Plant Monitoring Dashboard</Typography>

      <Grid container spacing={3} sx={{ mb: 3, flexGrow: 1 }}>
        <Grid item xs={12} md={3}>
          <Grid container spacing={3}>
            <Grid item xs={6} md={12}>
              {renderSensorValue("Humidity", latestData.humidity || "N/A", "%", <HumidityIcon fontSize="large" color="primary" />)}
            </Grid>
            <Grid item xs={6} md={12}>
              {renderSensorValue("Soil Moisture", latestData.soilMoisture || "N/A", "", <SoilIcon fontSize="large" color="primary" />)}
            </Grid>
            <Grid item xs={6} md={12}>
              {renderSensorValue("Temperature", latestData.temperature || "N/A", "°C", <TemperatureIcon fontSize="large" color="primary" />)}
            </Grid>
            <Grid item xs={6} md={12}>
              {renderSensorValue("Last Updated", latestData.dateTime || "N/A", "", <LastUpdateIcon fontSize="large" color="primary" />)}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {renderChart("Humidity History", "humidity", "#8884d8")}
            </Grid>
            <Grid item xs={12}>
              {renderChart("Soil Moisture History", "soilMoisture", "#82ca9d")}
            </Grid>
            <Grid item xs={12}>
              {renderChart("Temperature History", "temperature", "#ffc658")}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;