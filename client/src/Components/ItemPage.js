import React, { useState, useEffect, useMemo } from "react";
import { LOGGED_IN, setConstraint } from "../constraints";
import DeleteIcon from '@mui/icons-material/Delete';
import ContactsIcon from '@mui/icons-material/Contacts';
import { motion } from 'framer-motion'
import { toast } from 'react-toastify';
import axios from "axios";
import {
  Modal,
  Button,
  Typography,
  Avatar,
  Stack,
  Box,
  CircularProgress
} from '@mui/material'
import { Carousel } from 'react-carousel-minimal'
import { MdDateRange } from 'react-icons/md'
import { GrMap } from 'react-icons/gr'

function ItemPage() {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showContact, setShowContact] = useState(false);

  setConstraint(true);
  const queryParams = new URLSearchParams(window.location.search);
  const item_id = queryParams.get('cid');
  const current_user = queryParams.get('type').split("/")[1];

  const fetchItem = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/items/${item_id}`);
      setItem(response.data.item);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      toast.error('Failed to load item details');
    }
  };

  useEffect(() => {
    fetchItem();
  }, [item_id]);

  const deleteItem = async () => {
    try {
      await axios.delete(`http://localhost:5000/items/delete/${item_id}`);
      handleCloseDelete();
      toast.success('Item deleted successfully!', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      window.location.href = "/mylistings";
    } catch (err) {
      toast.error('Failed to delete item');
      console.error("Error:", err);
    }
  };

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseContact = () => setShowContact(false);
  const handleShowContact = () => setShowContact(true);

  const slides = useMemo(() => {
    return item?.img?.map(image => ({ image })) || [];
  }, [item]);

  const createdAt = useMemo(() => {
    if (!item?.createdAt) return '';
    const created_date = new Date(item.createdAt);
    return `${created_date.getDate()}/${created_date.getMonth()}/${created_date.getFullYear()} ${created_date.getHours()}:${created_date.getMinutes()}`;
  }, [item]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error">Failed to load item details</Typography>
      </Box>
    );
  }

  if (!item) {
    return null;
  }

  return (
    <Stack width='100%' alignItems='center' pt='10px'>
      {/* Header Section */}
      <Stack
        direction="row"
        width="100%"
        sx={{ backgroundColor: 'primary.main' }}
        height="125px"
        gap="4px"
        alignItems="center"
        justifyContent="center"
      >
        <Stack
          spacing={0}
          position="relative"
          justifyContent="center"
          width="100%"
          maxWidth="1440px"
          height="125px"
          overflow="hidden"
          ml={{ xs: 3, sm: 5, md: 10 }}
        >
          <Typography fontSize={{ xs: '18px', sm: '22px', md: '25px' }} color="white">
            {`${item.type} Item`}
          </Typography>
          <Typography
            fontSize={{ xs: '17px', sm: '21px', md: '23px' }}
            color="white"
            fontWeight="bold"
          >
            {''} {item.name}
          </Typography>
        </Stack>
      </Stack>

      {/* Main Content */}
      <Stack
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1440px',
        }}
      >
        <Stack
          width="100%"
          px={{ xs: 2, sm: 5, md: 10 }}
          gap="30px"
          marginTop="20px"
        >
          {/* Image and User Info */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            width="100%"
            justifyContent="space-evenly"
            alignItems="center"
            gap={{ xs: '0px', sm: '15px' }}
          >
            {/* Image Carousel */}
            <Stack
              width={{ xs: '100%', sm: '50%', md: '750px' }}
              height="280px"
              mt="10px"
            >
              <Carousel
                data={slides}
                width={{ xs: '100%', sm: '50%', md: '750px' }}
                height="270px"
                radius="10px"
                dots={false}
                automatic={false}
                slideBackgroundColor="#dbdbdb"
                slideImageFit="contain"
                thumbnails={false}
                thumbnailWidth="100px"
              />
            </Stack>

            {/* User Info and Action Button */}
            <Stack
              justifyContent="center"
              width={{ xs: '100%', sm: '50%', md: '400px' }}
              p="15px"
              sx={{
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                borderRadius: '5px',
              }}
              gap="10px"
            >
              <Stack
                direction="row"
                width="100%"
                border="solid 3px"
                borderRadius="10px"
                sx={{
                  borderColor: 'primary.main',
                }}
                gap="10px"
                alignItems="center"
                justifyContent="center"
                p="10px"
              >
                <Stack width={{ md: '40%', xs: '100%' }} alignItems="center">
                  <Avatar
                    src={item?.userId?.img}
                    sx={{
                      width: { xs: 80, sm: 95, md: 110 },
                      height: { xs: 80, sm: 95, md: 110 },
                    }}
                  />
                </Stack>
                <Stack width={{ md: '60%', xs: '100%' }}>
                  <Typography
                    fontSize={{ xs: '20px', sm: '25px' }}
                    component="div"
                    fontWeight={'bold'}
                    mx={{ xs: '0', md: 'auto' }}
                    color={'primary'}
                  >
                    {item?.userId?.fullname}
                  </Typography>
                </Stack>
              </Stack>

              {current_user === "true" ? (
                <Button
                  startIcon={<DeleteIcon />}
                  variant="contained"
                  color={'primary'}
                  sx={{
                    textTransform: 'none',
                    borderRadius: '8px',
                  }}
                  onClick={handleShowDelete}
                >
                  <motion.div
                    whileHover={{ scale: [null, 1.05, 1.05] }}
                    transition={{ duration: 0.4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Delete Post
                  </motion.div>
                </Button>
              ) : (
                <Button
                  startIcon={<ContactsIcon />}
                  variant="contained"
                  color={'primary'}
                  sx={{
                    textTransform: 'none',
                    borderRadius: '8px',
                  }}
                  onClick={handleShowContact}
                >
                  <motion.div
                    whileHover={{ scale: [null, 1.05, 1.05] }}
                    transition={{ duration: 0.4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Contact
                  </motion.div>
                </Button>
              )}
            </Stack>
          </Stack>

          {/* Description */}
          <Stack direction="row" width="100%">
            <Stack sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%',
            }}>
              <Typography fontSize="18px" component="div" m="0" fontWeight="bold">
                Description:
              </Typography>
              <Typography
                fontSize="16px"
                component="div"
                m="0"
                sx={{ textIndent: '100px', textAlign: 'justify' }}
              >
                {item.description}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        {/* Details Section */}
        <Stack width="100%" px={{ xs: 3, sm: 5, md: 10 }} gap="15px" mt='30px'>
          <Stack width="100%" height="3px" backgroundColor={'primary.main'} />

          {/* Date Found */}
          <Stack
            width="100%"
            direction="row"
            height="60px"
            alignItems="center"
            gap="15px"
          >
            <Stack justifyContent="flex-end" direction="row" width="49%" gap="8px">
              <MdDateRange fontSize="20px" />
              <Typography fontSize="15px" component="div" m="0" fontWeight="bold">
                Date :
              </Typography>
            </Stack>
            <Stack width='3px' height='80%' backgroundColor={'primary.main'} />
            <Stack justifyContent="flex-start" direction="row" width="49%">
              <Typography fontSize="15px" component="div" m="0">
                {item.date}
              </Typography>
            </Stack>
          </Stack>

          <Stack width="100%" height="3px" backgroundColor={'primary.main'} />

          {/* Location Found */}
          <Stack
            width="100%"
            direction="row"
            minHeight="60px"
            alignItems="center"
            gap="15px"
          >
            <Stack justifyContent="flex-end" direction="row" width="49%" gap="8px">
              <GrMap fontSize="20px" />
              <Typography fontSize="15px" component="div" m="0" fontWeight="bold">
                Location :
              </Typography>
            </Stack>
            <Stack width='3px' height='80%' backgroundColor={'primary.main'} />
            <Stack py='15px' justifyContent="flex-start" direction="row" width="49%">
              <Typography fontSize="15px" component="div" m="0">
                {item.location}
              </Typography>
            </Stack>
          </Stack>

          <Stack width="100%" height="3px" backgroundColor={'primary.main'} />
        </Stack>
      </Stack>

      {/* Delete Confirmation Modal */}
      <Modal
        open={showDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          gap="20px"
          sx={{
            borderRadius: '20px',
            backgroundColor: '#eff5ff',
            width: '410px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: 24,
            p: 6,
          }}
        >
          <Typography fontSize="18px" component="div" m="0" fontWeight="bold">
            Are you sure?
          </Typography>
          <Stack direction="row" width="100%" justifyContent="space-evenly" alignItems="center" spacing={2}>
            <Button
              variant="contained"
              color={'primary'}
              sx={{
                textTransform: 'none',
                borderRadius: '8px',
              }}
              onClick={deleteItem}
            >
              <motion.div
                whileHover={{ scale: [null, 1.05, 1.05] }}
                transition={{ duration: 0.4 }}
                whileTap={{ scale: 0.98 }}
              >
                Yes
              </motion.div>
            </Button>
            <Button
              variant="contained"
              color={'primary'}
              sx={{
                textTransform: 'none',
                borderRadius: '8px',
              }}
              onClick={handleCloseDelete}
            >
              <motion.div
                whileHover={{ scale: [null, 1.05, 1.05] }}
                transition={{ duration: 0.4 }}
                whileTap={{ scale: 0.98 }}
              >
                No
              </motion.div>
            </Button>
          </Stack>
        </Stack>
      </Modal>

      {/* Contact Info Modal */}
      <Modal
        open={showContact}
        onClose={handleCloseContact}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          gap="20px"
          sx={{
            borderRadius: '20px',
            backgroundColor: '#eff5ff',
            width: '410px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: 24,
            p: 6,
          }}
        >
          <Typography fontSize="18px" component="div" m="0" fontWeight="bold">
            {item?.userId?.fullname}'s Contact:
          </Typography>
          <Stack direction="row" width="100%" justifyContent="space-evenly" alignItems="center" spacing={2}>
            <Typography fontSize="16px" component="div" m="0">
              {item?.number}
            </Typography>
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  );
}

export default ItemPage;