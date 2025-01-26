import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Dashboard as DashboardIcon, SmartToy as AIIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        width:'100vw',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2vw',
        background: 'linear-gradient(135deg, #1a237e 0%, #4a148c 100%)',
      }}
    >
      {/* Animated plant icons */}
      {[...Array(10)].map((_, index) => (
        <motion.div
          key={index}
          style={{
            position: 'absolute',
            fontSize: '2rem',
            color: 'rgba(255, 255, 255, 0.2)',
          }}
          animate={{
            y: ['0%', '100%'],
            x: `${Math.random() * 100}%`,
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        >
          🌱
        </motion.div>
      ))}

      {/* Foreground content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ width: '100%', maxWidth: '800px' }}
      >
        <Box
          sx={{
            zIndex: 1,
            textAlign: 'center',
            maxWidth: { xs: '90%', md: '70%', lg: '50%' },
            margin: '0 auto',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '15px',
            padding: '2rem',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography
            variant={isMobile ? 'h4' : 'h2'}
            gutterBottom
            sx={{
              color: '#ffffff',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            AGRIBOT
          </Typography>
          <Typography
            variant={isMobile ? 'body1' : 'h6'}
            sx={{
              color: '#ffffff',
              maxWidth: '600px',
              margin: '0 auto',
              marginBottom: '2rem',
            }}
          >
            Revolutionize your plant care with our advanced monitoring system. Track humidity, soil moisture, and temperature in real-time for optimal growth.
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                component={Link}
                to="/dashboard"
                variant="contained"
                size="large"
                startIcon={<DashboardIcon />}
                sx={{
                  backgroundColor: '#4caf50',
                  '&:hover': {
                    backgroundColor: '#45a049',
                  },
                }}
              >
                View Dashboard
              </Button>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                to="/ai"
                variant="outlined"
                size="large"
                startIcon={<AIIcon />}
                sx={{
                  color: '#ffffff',
                  borderColor: '#ffffff',
                  '&:hover': {
                    borderColor: '#4caf50',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Try AI Features
              </Button>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Box>
  );
};

export default HomePage;