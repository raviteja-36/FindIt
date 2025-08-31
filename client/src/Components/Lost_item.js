import PhotoCamera from '@mui/icons-material/PhotoCamera';
import React, { useState } from "react";
import axios from "axios";
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
// The import for the toastify CSS has been removed to resolve a build error.
// The component will still function correctly.
import {
    Container,
    Paper,
    Grid,
    Button,
    Typography,
    Stack,
    TextField,
    Select,
    InputLabel,
    MenuItem,
    FormHelperText,
    FormControl,
    LinearProgress,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const LostItem = () => {
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const usertoken = window.localStorage.getItem("token");

    const getUserId = () => {
        const user = JSON.parse(window.localStorage.getItem('user'));
        return user ? user._id : null;
    };

    const config = { headers: { token: usertoken } };

    const schema = Yup.object().shape({
        name: Yup.string().required('Item name is required'),
        description: Yup.string().required('Description is required'),
        type: Yup.string().required('Item type is required'),
        location: Yup.string().required('Location is required'),
        date: Yup.string().required('Date is required'),
        number: Yup.string().required('Phone number is required'),
    });

    const [images, setImages] = useState(null);
    const [uploadError, setUploadError] = useState(null);

    const handleImageUpload = (e) => {
        const files = e.target.files;
        if (files.length > 5) {
            toast.error('You can upload maximum 5 images', {
                position: "bottom-right",
                autoClose: 3000,
            });
            return;
        }
        setImages(files);
        setUploadError(null);
    };

    const uploadToCloudinary = async (files) => {
        // Use environment variables for security and maintainability
        const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
            throw new Error('Cloudinary environment variables are not set.');
        }

        const urls = [];

        try {
            for (let i = 0; i < files.length; i++) {
                const formData = new FormData();
                formData.append('file', files[i]);
                formData.append('upload_preset', uploadPreset);

                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                    formData,
                    {
                        onUploadProgress: (progressEvent) => {
                            const percentCompleted = Math.round(
                                (progressEvent.loaded * 100) / progressEvent.total
                            );
                            setProgress(percentCompleted);
                        },
                    }
                );
                urls.push(response.data.secure_url);
            }
            return urls;
        } catch (error) {
            console.error('Cloudinary upload error:', error);
            throw new Error('Failed to upload images to Cloudinary');
        }
    };

    const handleSubmit = async (values) => {
        try {
            await schema.validate(values, { abortEarly: false });
        } catch (error) {
            const errorMessages = error.inner.map((err) => err.message);
            toast.error(errorMessages.join('\n'), {
                position: "bottom-right",
                autoClose: 3000,
            });
            return;
        }

        if (!images || images.length === 0) {
            toast.error('Please upload at least one image', {
                position: "bottom-right",
                autoClose: 3000,
            });
            return;
        }

        setLoading(true);
        setProgress(0);

        try {
            const imageUrls = await uploadToCloudinary(images);
            const newItem = {
                ...values,
                userId: getUserId(),
                img: imageUrls
            };

            await axios.post('http://localhost:5000/Items/newItem', newItem, config);

            toast.success('Item listed successfully!', {
                position: "bottom-right",
                autoClose: 2000,
            });

            setTimeout(() => {
                window.location.href = "/mylistings";
            }, 2000);
        } catch (error) {
            console.error("Submission error:", error);
            setUploadError(error.message);
            toast.error(error.message || 'Failed to create listing', {
                position: "bottom-right",
                autoClose: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Stack width="100%" pt="60px" alignItems="center">
            <Typography fontSize="30px" color="primary" fontWeight="">
                If your item is lost or you found someone's item, Post it Here!
            </Typography>
            <Stack
                width="100%"
                maxWidth="1440px"
                direction="row"
                justifyContent={{ xs: 'center', md: 'space-evenly' }}
                alignItems="center"

            >
                <Formik
                    initialValues={{
                        name: '',
                        userId: getUserId(),
                        description: '',
                        type: '',
                        location: '',
                        date: '',
                        number: '',
                    }
                    }
                    validationSchema={schema}
                    onSubmit={(values) => {
                        handleSubmit(values)
                    }}
                >
                    {({
                        values,
                        handleChange
                    }) => (
                        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                            <Paper variant="outlined" sx={{ my: { xs: 12, md: 6 }, p: { xs: 12, md: 5 } }}>
                                <Form>

                                    <Grid item xs={6} pt="10px">
                                        <Typography variant="h6">
                                            Picture
                                        </Typography>
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <Button variant="contained" component="label" endIcon={<PhotoCamera />}>
                                                Upload
                                                <input hidden accept="image/*" multiple type="file"
                                                    id="image"
                                                    label="Upload Image"
                                                    name="image"
                                                    onChange={handleImageUpload} />
                                            </Button>

                                        </Stack>
                                        <Grid item xs={6}>
                                            <Typography variant="h6">
                                                Item Details
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="name"
                                                name="name"
                                                label="Item name "
                                                size="small"
                                                fullWidth
                                                variant="standard"
                                                value={values.name}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Description "
                                                id="date"
                                                name="description"
                                                multiline={true}
                                                size="small"
                                                required
                                                fullWidth
                                                variant="standard"
                                                value={values.description}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                variant="standard"
                                                id="location"
                                                name="location"
                                                label="Where did you find/lost it "
                                                size="small"
                                                value={values.location}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                variant="standard"
                                                id="date"
                                                name="date"
                                                label="When did you find/lost it "
                                                size="small"
                                                value={values.date}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                variant="standard"
                                                id="number"
                                                name="number"
                                                label="How can we contact you? "
                                                size="small"
                                                value={values.number}
                                                onChange={handleChange}

                                            />
                                        </Grid>
                                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                            <InputLabel id="demo-simple-select-standard-label">Item Type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-standard-label"
                                                id="demo-simple-select-standard"
                                                name="type"
                                                value={values.type}
                                                onChange={handleChange}
                                            >

                                                <MenuItem value="Lost">Lost It</MenuItem>
                                                <MenuItem value="Found">Found It</MenuItem>
                                            </Select>
                                            <FormHelperText>Please select the type of item</FormHelperText>
                                        </FormControl>

                                        <Grid item xs={6}>
                                            <motion.div whileTap={{ scale: 0.98 }}>
                                                <Stack spacing={2} direction="row">
                                                    <Button type="submit" variant="contained">Create post</Button>
                                                </Stack>
                                            </motion.div>
                                        </Grid>


                                    </Grid>


                                </Form>
                            </Paper>
                        </Container>
                    )}
                </Formik>

                <motion.div
                    whileHover={{ scale: [null, 1.05, 1.05] }}
                    transition={{ duration: 0.4 }}
                >
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        maxWidth="450px"
                        sx={{ display: { xs: 'none', md: 'flex' } }}
                    >
                        <img
                            width="100%"
                            src="https://image2url.com/images/1755334515371-e65f6a66-ec8f-4035-b5af-5ee3fe848db8.jpg"
                            alt="Post Image"
                        />
                    </Stack>
                </motion.div>
            </Stack>
        </Stack>
    );
};

export default LostItem;