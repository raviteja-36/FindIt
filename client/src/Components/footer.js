import React, { useState } from 'react';
import { Link, Stack, Typography, Box, IconButton, Modal, Button } from '@mui/material';
import { BsLinkedin } from 'react-icons/bs';
import { motion } from 'framer-motion';

const Footer = () => {
  const [openModal, setOpenModal] = useState(null);

  const handleOpen = (modalType) => {
    setOpenModal(modalType);
  };

  const handleClose = () => {
    setOpenModal(null);
  };

  const modalContent = {
    about: (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>About FindIt</Typography>
        <Typography>
          FindIt is a platform designed to help students at Vellore Institute of Technology 
          recover lost items and return found belongings to their rightful owners.
        </Typography>
      </Box>
    ),
    contact: (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Contact Us</Typography>
        <Typography>
          For any inquiries, please email: <strong>support@findit.com</strong>
        </Typography>
        <Typography mt={2}>
          Campus Help Desk: Block A, Ground Floor
        </Typography>
      </Box>
    ),
    privacy: (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Privacy Policy</Typography>
        <Typography>
          We respect your privacy. Any personal information collected will only be used 
          for the purpose of reuniting lost items with their owners.
        </Typography>
      </Box>
    ),
    developers: (
  <Box sx={{ p: 3 }}>
    <Typography variant="h6" gutterBottom>Development Team</Typography>
    
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography><strong>P Sriram</strong> </Typography>
        <IconButton 
          component="a"
          href="https://www.linkedin.com/in/p-sri-ram-4a609825b/" 
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          color="primary"
        >
          <BsLinkedin />
        </IconButton>
      </Stack>
      
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography><strong>A Raviteja</strong> </Typography>
        <IconButton 
          component="a"
          href="https://www.linkedin.com/in/raviteja-atla-73a796351/" 
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          color="primary"
        >
          <BsLinkedin />
        </IconButton>
      </Stack>
      
      <Typography mt={2}>
        Both currently pursuing Integrated M.Tech in Software Engineering at VIT Vellore
      </Typography>
    </Stack>
  </Box>
)
  };

  return (
    <Box component="footer" sx={{ 
      width: '100%',
      backgroundColor: '#357ABD',
      color: 'white',
      mt: 'auto'
    }}>
      <Stack
        maxWidth="1440px"
        margin="0 auto"
        px={{ xs: 3, md: 8 }}
        py={{ xs: 4, md: 6 }}
        spacing={4}
      >
        {/* Main Footer Content */}
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={{ xs: 4, md: 0 }}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Logo/Branding */}
          <Box>
            <Typography 
              variant="h6" 
              component="div"
              fontWeight={700}
              fontSize="1.5rem"
            >
              FindIt
            </Typography>
            <Typography variant="body2" mt={1}>
              Reuniting people with their belongings in Vellore Institute of Technology College
            </Typography>
          </Box>

          {/* Quick Links */}
          <Stack direction="row" spacing={{ xs: 0, md: 6 }} 
            justifyContent="space-between"
            width={{ xs: '100%', md: 'auto' }}
          >
            <Stack spacing={1}>
              <Typography fontWeight={600}>Explore</Typography>
              <Link href="/" color="inherit" underline="hover">Home</Link>
              <Link href="/LostItems" color="inherit" underline="hover">Lost Items</Link>
              <Link href="/FoundItems" color="inherit" underline="hover">Found Items</Link>
            </Stack>

            <Stack spacing={1}>
              <Typography fontWeight={600}>Information</Typography>
              <Link 
                component="button" 
                onClick={() => handleOpen('about')} 
                color="inherit" 
                underline="hover"
              >
                About Us
              </Link>
              <Link 
                component="button" 
                onClick={() => handleOpen('contact')} 
                color="inherit" 
                underline="hover"
              >
                Contact
              </Link>
              <Link 
                component="button" 
                onClick={() => handleOpen('privacy')} 
                color="inherit" 
                underline="hover"
              >
                Privacy Policy
              </Link>
              <Link 
                component="button" 
                onClick={() => handleOpen('developers')} 
                color="inherit" 
                underline="hover"
              >
                Developers
              </Link>
            </Stack>
          </Stack>

          {/* Developer Contact */}
          <Stack spacing={1} alignItems={{ xs: 'center', md: 'flex-end' }}>
            <Typography fontWeight={600}>Developed By</Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography>Raviteja</Typography>
              <IconButton 
                component="a"
                href="https://www.linkedin.com/in/raviteja-atla-73a796351/" 
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: 'white' }}
              >
                <BsLinkedin />
              </IconButton>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography>Sriram</Typography>
              <IconButton 
                component="a"
                href="https://www.linkedin.com/in/p-sri-ram-4a609825b/" 
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: 'white' }}
              >
                <BsLinkedin />
              </IconButton>
            </Stack>
            <Link 
              component="button"
              onClick={() => handleOpen('contact')}
              color="inherit" 
              underline="hover"
              sx={{ mt: 1 }}
            >
              Contact Developers
            </Link>
          </Stack>
        </Stack>

        {/* Divider */}
        <Box sx={{ 
          width: '100%',
          height: '1px',
          backgroundColor: 'rgba(255,255,255,0.2)'
        }} />

        {/* Copyright */}
        <Typography variant="body2" color="rgba(255,255,255,0.7)" textAlign="center">
          © {new Date().getFullYear()} FindIt. All rights reserved.
        </Typography>
      </Stack>

      {/* Modal for all informational content */}
      <Modal
        open={Boolean(openModal)}
        onClose={handleClose}
        aria-labelledby="info-modal-title"
        aria-describedby="info-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '600px' },
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          outline: 'none'
        }}>
          {openModal && modalContent[openModal]}
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleClose} variant="contained">
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Footer;