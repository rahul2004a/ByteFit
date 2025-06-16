import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import ActivityForm from '../components/ActivityForm';
import { useNavigate } from 'react-router-dom';

const AddActivityPage = () => {
    const navigate = useNavigate();

    const handleActivityAdded = () => {
        // Navigate back to dashboard after successfully adding an activity
        navigate('/dashboard');
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Add New Activity
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                Track your fitness activities and progress
            </Typography>

            <Paper sx={{ p: 3, maxWidth: 600 }}>
                <ActivityForm onActivityAdded={handleActivityAdded} />
            </Paper>
        </Box>
    );
};

export default AddActivityPage;