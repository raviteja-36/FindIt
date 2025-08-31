import React, { useState } from "react";
import { Formik, Form } from 'formik';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from "axios";
import { toast } from 'react-toastify';
import {
    Typography,
    Button,
    Stack,
    Divider,
    TextField,
    Avatar,
    LinearProgress,
} from '@mui/material';

// The import for the toastify CSS has been removed to resolve a build error in the canvas environment.
// The component will still function correctly.

function Signup() {
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const uploadToCloudinary = async (file) => {
        // Updated to use environment variables for security and best practices
        const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

        const formData = new FormData();
        formData.append('file', file);
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
        return response.data.secure_url;
    };

    const handleSubmit = async (values) => {
        const { nickname, fullname, email, password } = values;
        let imgUrl = null;

        try {
            if (image) {
                imgUrl = await uploadToCloudinary(image);
            }

            const payload = {
                nickname,
                fullname,
                email,
                password,
                ...(imgUrl && { img: imgUrl })
            };

            // NOTE: The URL 'http://localhost:5000' will not work in this environment.
            // You will need to replace this with your actual backend URL.
            const response = await axios.post("http://localhost:5000/users/create", payload);

            if (response.data === "Done") {
                toast.success('You are now successfully signed up!', {
                    position: "bottom-right",
                    autoClose: 800,
                });
                setTimeout(() => {
                    window.location.href = "/log-in";
                }, 800);
            } else {
                toast.error('Something is missing!', {
                    position: "bottom-right",
                    autoClose: 1000,
                });
            }
        } catch (error) {
            console.error("Error occurred:", error);
            toast.error('Registration failed. Please try again.', {
                position: "bottom-right",
                autoClose: 1000,
            });
        }
    };

    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            width="100%"
            gap="20px"
            pt="10px"
        >
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
                    ml={10}
                >
                    <Typography fontSize="20px" color="white" fontWeight="">
                        Sign Up
                    </Typography>

                    <Typography variant="h5" color="white" fontWeight="bold">
                        Welcome On Board!
                    </Typography>
                </Stack>
            </Stack>

            <Stack
                alignItems="center"
                justifyContent="space-between"
                mt={3}
                direction="row"
            >
                <Stack width="50%" display={{ xs: 'none', md: 'flex' }}>
                    <img
                        width="100%"
                        src="https://image2url.com/images/1755334880462-92c1670e-0fb6-4e15-aa63-2743c60cc97a.png"
                        alt="img"
                    />
                </Stack>
                <Stack width={{ xs: '100%', md: '400px' }} margin="0 auto">
                    <Formik
                        initialValues={{
                            nickname: '',
                            fullname: '',
                            email: '',
                            password: '',
                        }}
                        onSubmit={(values) => {
                            handleSubmit(values)
                        }}
                    >
                        {({
                            values,
                            handleChange,
                        }) => (
                            <Form>
                                <Stack
                                    alignItems="start"
                                    gap="10px"
                                    margin={{ xs: '0 1rem', md: 'auto' }}
                                >
                                    <Typography fontSize="20px" variant="h5">
                                        <b>Sign Up</b>
                                    </Typography>
                                    <Typography
                                        fontSize="14px"
                                        color="primary.main"
                                    >
                                        Please, fill your information below
                                    </Typography>

                                    <Stack
                                        justifyContent="flex-start"
                                        width="100%"
                                    >
                                        <Stack
                                            alignItems="center"
                                            width="100%"
                                            gap={2}
                                        >
                                            <Avatar
                                                src={image && URL.createObjectURL(image)}
                                                sx={{
                                                    width: '6rem',
                                                    height: '6rem',
                                                }}
                                            />
                                        </Stack>
                                        <Stack
                                            px="5px"
                                            sx={{
                                                width: {
                                                    xs: 'auto',
                                                    md: '50%',
                                                },
                                            }}
                                        >
                                            <Typography
                                                fontSize="12px"
                                                mt="5px"
                                            >
                                                Choose your profile picture
                                            </Typography>
                                        </Stack>
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

                                        <TextField
                                            sx={{ width: '100%' }}
                                            type="text"
                                            name="nickname"
                                            margin="dense"
                                            label="Nickname"
                                            size="small"
                                            id="nickname"
                                            required
                                            onChange={handleChange}
                                            value={values.nickname}
                                        />
                                    </Stack>
                                    <Stack
                                        justifyContent="flex-start"
                                        width="100%"
                                    >
                                        <TextField
                                            sx={{ width: '100%' }}
                                            type="text"
                                            name="fullname"
                                            margin="dense"
                                            label="Full Name"
                                            size="small"
                                            required
                                            onChange={handleChange}
                                            value={values.fullname}
                                        />
                                    </Stack>
                                    <Stack
                                        justifyContent="flex-start"
                                        width="100%"
                                    >
                                        <TextField
                                            sx={{ width: '100%' }}
                                            required
                                            type="email"
                                            name="email"
                                            id="email"
                                            margin="dense"
                                            label="email"
                                            placeholder="email@example.com"
                                            size="small"
                                            onChange={handleChange}
                                            value={values.email}
                                        />
                                    </Stack>
                                    <Stack
                                        justifyContent="flex-start"
                                        width="100%"
                                    >
                                        <TextField
                                            sx={{ width: '100%' }}
                                            required
                                            type="password"
                                            name="password"
                                            margin="dense"
                                            label="password"
                                            id="password"
                                            size="small"
                                            onChange={handleChange}
                                            value={values.password}
                                        />
                                    </Stack>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        sx={{
                                            color: 'white',
                                            textTransform: 'none',
                                            width: '100px',
                                            fontSize: '16px',
                                            alignSelf: 'end',
                                            margin: '1rem',
                                            mr: '0',
                                        }}
                                        size="small"
                                    >
                                        Sign Up
                                    </Button>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                    <Divider sx={{ width: '100%', margin: '1rem 0' }} />
                    <Stack
                        justifyContent="center"
                        direction="row"
                        gap="10px"
                        margin="1rem 0"
                    >
                        {' '}
                        <Typography fontSize="16px">
                            Already have an account?
                        </Typography>
                        <Typography
                            // The Link component from react-router-dom has been replaced with an anchor tag since react-router-dom does not work in this environment.
                            component="a"
                            href="/log-in"
                            fontSize="16px"
                        >
                            Login
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}
export default Signup;