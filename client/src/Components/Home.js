import React from "react";
import { Stack, Typography, Button, Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Search, AddCircle, PersonSearch, CheckCircle } from '@mui/icons-material';

const Home = () => {
  const isLoggedIn = JSON.parse(window.localStorage.getItem('user'));

  // Enhanced color palette
  const colors = {
    primary: '#4361ee',       // Vibrant blue
    secondary: '#3a0ca3',     // Deep purple-blue
    accent: '#f72585',        // Energetic pink
    light: '#f8f9fa',         // Light background
    dark: '#212529',          // Dark text
    white: '#ffffff',
    success: '#4cc9f0',       // Bright teal
    cardBg: 'rgba(255,255,255,0.95)' // For better readability
  };

  const handleButtonClick = () => {
    window.location.href = isLoggedIn ? "/postitem" : "/log-in";
  };

  const handleButtonClickLost = () => {
    window.location.href = isLoggedIn ? "/lostItems" : "/log-in";
  };

  const handleButtonClickFound = () => {
    window.location.href = isLoggedIn ? "/founditems" : "/log-in";
  };

  return (
    <Stack width="100%" sx={{ backgroundColor: colors.light }}>

      {/* Hero Section */}
      <Box sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 8, md: 12 },
        background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`,
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          backgroundColor: 'rgba(67, 97, 238, 0.08)',
          right: '-300px',
          top: '-300px'
        }
      }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems="center"
          gap={{ xs: 4, md: 8 }}
          maxWidth="1440px"
          width="100%"
          px={{ xs: 3, md: 6 }}
          margin="0 auto"
          position="relative"
          zIndex={1}
        >
          <Stack
            width="100%"
            gap={4}
            maxWidth="600px"
            alignItems={{ xs: 'center', md: 'flex-start' }}
            textAlign={{ xs: 'center', md: 'left' }}
          >
            <Typography
              variant="h1"
              fontWeight={800}
              fontSize={{ xs: '2.5rem', md: '3.5rem' }}
              lineHeight={1.2}
              sx={{
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Reuniting You With What Matters
            </Typography>
            
            <Typography 
              variant="subtitle1" 
              color={colors.dark} 
              fontSize={{ xs: '1rem', md: '1.2rem' }} 
              sx={{ opacity: 0.8, maxWidth: '500px' }}
            >
              Our community-powered platform helps you recover lost items and return found belongings to their owners in VIT College.
            </Typography>
            
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={handleButtonClick}
                variant="contained"
                size="large"
                sx={{
                  px: 5,
                  py: 1.5,
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  backgroundColor: colors.accent,
                  color: colors.white,
                  boxShadow: `0 4px 14px ${colors.accent}40`,
                  '&:hover': {
                    backgroundColor: '#e5177e',
                    transform: 'translateY(-2px)',
                    boxShadow: `0 6px 20px ${colors.accent}60`
                  },
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '5px',
                    height: '5px',
                    background: 'rgba(255,255,255,0.5)',
                    opacity: 0,
                    borderRadius: '100%',
                    transform: 'scale(1, 1) translate(-50%)',
                    transformOrigin: '50% 50%'
                  },
                  '&:hover::after': {
                    animation: 'ripple 1s ease-out',
                    opacity: 1
                  }
                }}
              >
                Get Started
              </Button>
            </motion.div>
          </Stack>
          
          <Stack width="100%" maxWidth="600px" display={{ xs: 'none', md: 'flex' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box
                component="img"
                src="https://image2url.com/images/1755333757159-2d50afd2-7f56-40ba-87fb-348c84da9392.png"
                alt="Hero illustration"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '500px',
                  objectFit: 'contain',
                  borderRadius: '16px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  transform: 'perspective(1000px) rotateY(-5deg)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'perspective(1000px) rotateY(0deg)'
                  }
                }}
              />
            </motion.div>
          </Stack>
        </Stack>
      </Box>

      {/* Features Section */}
      <Box sx={{
        position: 'relative',
        py: { xs: 8, md: 12 },
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.08)',
          left: '-200px',
          bottom: '-200px'
        }
      }}>
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          maxWidth="1440px"
          width="100%"
          px={{ xs: 3, md: 6 }}
          margin="0 auto"
          alignItems="center"
          spacing={{ xs: 4, md: 0 }}
        >
          <Stack
            width={{ xs: '100%', md: '50%' }}
            gap={4}
            pr={{ md: 4 }}
            color={colors.white}
          >
            <Typography variant="h2" fontWeight={700} fontSize={{ xs: '2rem', md: '2.5rem' }}>
              How It Works
            </Typography>
            
            <Stack spacing={4}>
              {[
                { 
                  icon: <Search sx={{ fontSize: 32 }} />,
                  title: "Report Lost Items", 
                  text: "Create detailed listings with photos and descriptions"
                },
                { 
                  icon: <PersonSearch sx={{ fontSize: 32 }} />,
                  title: "Browse Found Items", 
                  text: "Search our database for items matching your lost belongings"
                },
                { 
                  icon: <AddCircle sx={{ fontSize: 32 }} />,
                  title: "Post Found Items", 
                  text: "Help reunite found items with their owners"
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Stack direction="row" spacing={3} alignItems="flex-start">
                    <Box sx={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      borderRadius: '50%',
                      width: '56px',
                      height: '56px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {feature.icon}
                    </Box>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        {feature.text}
                      </Typography>
                    </Box>
                  </Stack>
                </motion.div>
              ))}
            </Stack>
            
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Quick Actions
              </Typography>
              
              <Grid container spacing={2}>
                {[
                  { 
                    title: "Lost Items", 
                    action: handleButtonClickLost,
                    icon: <CheckCircle sx={{ color: colors.success }} />,
                    bgColor: colors.success
                  },
                  { 
                    title: "Found Items", 
                    action: handleButtonClickFound,
                    icon: <Search sx={{ color: colors.accent }} />,
                    bgColor: colors.accent
                  },
                  { 
                    title: "Post Item", 
                    action: handleButtonClick,
                    icon: <AddCircle sx={{ color: colors.white }} />,
                    bgColor: colors.white
                  }
                ].map((item, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <motion.div 
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        fullWidth
                        onClick={item.action}
                        startIcon={item.icon}
                        sx={{
                          justifyContent: 'center',
                          textAlign: 'center',
                          backgroundColor: `${item.bgColor}${item.title === "Post Item" ? '30' : 'dd'}`,
                          borderRadius: '10px',
                          py: 2,
                          px: 3,
                          color: item.title === "Post Item" ? colors.white : colors.dark,
                          fontWeight: 600,
                          textTransform: 'none',
                          '&:hover': {
                            backgroundColor: `${item.bgColor}${item.title === "Post Item" ? '50' : ''}`,
                            boxShadow: `0 6px 12px ${item.bgColor}40`
                          },
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          border: item.title === "Post Item" ? `1px solid ${colors.white}50` : 'none',
                          backdropFilter: 'blur(4px)',
                          position: 'relative',
                          overflow: 'hidden',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
                            transform: 'translateX(-100%)',
                            transition: 'transform 0.6s ease'
                          },
                          '&:hover::before': {
                            transform: 'translateX(100%)'
                          }
                        }}
                      >
                        {item.title}
                      </Button>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Stack>
          
          <Box
            width={{ xs: '100%', md: '50%' }}
            height={{ xs: '300px', md: '500px' }}
            sx={{
              backgroundImage: 'url(https://image2url.com/images/1755366418384-0fd1cbbc-1c28-419b-9580-e2f9aa8dc336.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: { xs: 0, md: '16px 0 0 16px' },
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(45deg, ${colors.primary}20, ${colors.secondary}40)`
              }
            }}
          />
        </Stack>
      </Box>

      {/* Global styles for ripple effect */}
      <style jsx global>{`
        @keyframes ripple {
          0% {
            transform: scale(0, 0);
            opacity: 1;
          }
          20% {
            transform: scale(25, 25);
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: scale(40, 40);
          }
        }
      `}</style>
    </Stack>
  );
};

export default Home;