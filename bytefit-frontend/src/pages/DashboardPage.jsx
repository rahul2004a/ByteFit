import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import ActivityList from '../components/ActivityList';

const DashboardPage = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                Welcome to your fitness tracking dashboard
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Your Activities
                        </Typography>
                        <ActivityList />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DashboardPage;