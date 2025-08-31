import React, { useState } from 'react'
import { setConstraint } from "../constraints";
import { BsFillCaretDownFill } from 'react-icons/bs'
import { Button, Menu, MenuItem, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Navbar() {
  const token = window.localStorage.getItem("token");

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const buttonStyle = {
    fontSize: '18px',
    fontWeight: 600,
    textTransform: 'none',
    color: '#2d3748',
    padding: '8px 12px',
    borderRadius: '8px',
    '&:hover': {
      color: '#4f46e5',
      backgroundColor: '#f1f5f9',
    },
    '&:focus': {
      color: '#4f46e5',
      backgroundColor: 'transparent',
    },
    transition: 'all 0.2s ease-in-out',
  }

  const signout = () => {
    setConstraint(false);
    console.log("Signed out !");
    localStorage.clear();
    window.location.href="/log-in";
  };

  return (
    <Stack
      width="100%"
      maxWidth="1440px"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="0 0 20px 20px"
      px={{ xs: 3, sm: 5, md: 5 }}
      py={1}
      zIndex={20}
      gap={1}
      sx={{ 
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        borderBottom: '1px solid #e2e8f0'
      }}
    >
      <Link to="/">
        <Stack maxWidth="180px">
          <img
            src='https://image2url.com/images/1755325658417-ee3f3223-1cb0-4517-a75e-a982a28e1151.png'
            alt="logo"
            width="100%"
            style={{ padding: '8px 0' }}
          />
        </Stack>
      </Link>

      <Stack
        direction="row"
        gap={'32px'}
        display={{ xs: 'none', md: 'flex' }}
        alignItems="center"
      >
        {token ? (
          <Stack direction="row" gap={'32px'}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                component={Link}
                to="/"
                sx={buttonStyle}
                disableRipple
              >
                Home
              </Button>
            </motion.div>
            
            <Stack>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={buttonStyle}
                  endIcon={<BsFillCaretDownFill size="12px" />}
                  disableRipple
                >
                  Items Browser
                </Button>
              </motion.div>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                PaperProps={{
                  style: {
                    marginTop: '8px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <MenuItem
                  component={Link}
                  to="/LostItems"
                  onClick={handleClose}
                  sx={{ 
                    fontSize: '14px',
                    padding: '8px 16px',
                    '&:hover': {
                      backgroundColor: '#f8fafc'
                    }
                  }}
                >
                  Lost Items
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/FoundItems"
                  onClick={handleClose}
                  sx={{ 
                    fontSize: '14px',
                    padding: '8px 16px',
                    '&:hover': {
                      backgroundColor: '#f8fafc'
                    }
                  }}
                >
                  Found Items
                </MenuItem>
              </Menu>
            </Stack>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                component={Link}
                to="/postitem"
                sx={buttonStyle}
                disableRipple
              >
                Post Item
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                component={Link}
                to="/mylistings"
                sx={buttonStyle}
                disableRipple
              >
                My Listings
              </Button>
            </motion.div>
          </Stack>
        ) : (
          <Stack direction="row" gap={'32px'}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                component={Link}
                to="/"
                sx={buttonStyle}
                disableRipple
              >
                Home
              </Button>
            </motion.div>

            <Stack>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={buttonStyle}
                  endIcon={<BsFillCaretDownFill size="12px" />}
                  disableRipple
                >
                  Items Browser
                </Button>
              </motion.div>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                PaperProps={{
                  style: {
                    marginTop: '8px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <MenuItem
                  component={Link}
                  to="/log-in"
                  onClick={handleClose}
                  sx={{ 
                    fontSize: '14px',
                    padding: '8px 16px',
                    '&:hover': {
                      backgroundColor: '#f8fafc'
                    }
                  }}
                >
                  Lost Items
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/log-in"
                  onClick={handleClose}
                  sx={{ 
                    fontSize: '14px',
                    padding: '8px 16px',
                    '&:hover': {
                      backgroundColor: '#f8fafc'
                    }
                  }}
                >
                  Found Items
                </MenuItem>
              </Menu>
            </Stack>
          </Stack>
        )}
      </Stack>
      
      <Stack direction="row" gap={2} alignItems="center">
        {token ? (  
          <Button
            variant="contained"
            onClick={signout}
            sx={{
              textTransform: 'none',
              px: '24px',
              py: '6px',
              fontSize: '14px',
              fontWeight: 600,
              backgroundColor: '#4f46e5',
              '&:hover': {
                backgroundColor: '#4338ca',
              },
              borderRadius: '8px',
              boxShadow: 'none',
              display: { xs: 'none', md: 'flex' },
            }}
            size="small"
            disableRipple
          >
            Logout
          </Button>
        ) : (
          <Stack direction="row" gap={2}>
            <Button
              variant="outlined"
              component={Link}
              to="/log-in"
              sx={{
                textTransform: 'none',
                px: '24px',
                py: '6px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#4f46e5',
                borderColor: '#4f46e5',
                '&:hover': {
                  backgroundColor: '#f1f5f9',
                  borderColor: '#4f46e5',
                },
                borderRadius: '8px',
                display: { xs: 'none', md: 'flex' },
              }}
              size="small"
              disableRipple
            >
              Login
            </Button>
            <Button
              variant="contained"
              component={Link}
              to="/sign-up"
              sx={{
                textTransform: 'none',
                px: '24px',
                py: '6px',
                fontSize: '14px',
                fontWeight: 600,
                backgroundColor: '#4f46e5',
                '&:hover': {
                  backgroundColor: '#4338ca',
                },
                borderRadius: '8px',
                boxShadow: 'none',
                display: { xs: 'none', md: 'flex' },
              }}
              size="small"
              disableRipple
            >
              Sign Up
            </Button>
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}

export default Navbar;