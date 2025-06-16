import {
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
    Avatar,
    Chip,
    Stack,
    Button
} from '@mui/material';
import {
    DirectionsRun,
    DirectionsWalk,
    DirectionsBike,
    Pool,
    FitnessCenter,
    SelfImprovement,
    FlashOn,
    MonitorHeart,
    Accessibility,
    MoreHoriz,
    Timer,
    LocalFireDepartment,
    Visibility,
    Add
} from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getActivities } from '../services/api';

const ActivityList = () => {
    const [activities, setActivities] = useState([]);
    const navigate = useNavigate();

    const activityIcons = {
        RUNNING: { icon: <DirectionsRun />, color: '#10b981' },
        WALKING: { icon: <DirectionsWalk />, color: '#f59e0b' },
        CYCLING: { icon: <DirectionsBike />, color: '#8b5cf6' },
        SWIMMING: { icon: <Pool />, color: '#0ea5e9' },
        WEIGHT_TRAINING: { icon: <FitnessCenter />, color: '#dc2626' },
        YOGA: { icon: <SelfImprovement />, color: '#7c3aed' },
        HIIT: { icon: <FlashOn />, color: '#ea580c' },
        CARDIO: { icon: <MonitorHeart />, color: '#e11d48' },
        STRETCHING: { icon: <Accessibility />, color: '#0d9488' },
        OTHER: { icon: <MoreHoriz />, color: '#6b7280' },
    };

    const fetchActivities = async () => {
        try {
            const response = await getActivities();
            setActivities(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    const getActivityDetails = (type) => {
        return activityIcons[type] || activityIcons.OTHER;
    };

    if (activities.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 6 }}>
                <Avatar
                    sx={{
                        background: 'rgba(16, 185, 129, 0.1)',
                        color: '#10b981',
                        width: 80,
                        height: 80,
                        margin: '0 auto 16px',
                    }}
                >
                    <FitnessCenter sx={{ fontSize: '2rem' }} />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#374151', mb: 1 }}>
                    No Activities Yet
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
                    Start your fitness journey by adding your first activity!
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => navigate('/add-activity')}
                    sx={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        borderRadius: '50px',
                        padding: '12px 24px',
                        fontWeight: 600,
                        textTransform: 'none',
                        boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)',
                        },
                    }}
                >
                    Add Your First Activity
                </Button>
            </Box>
        );
    }

    return (
        <Grid container spacing={3}>
            {activities.map((activity) => {
                const activityDetails = getActivityDetails(activity.type);
                return (
                    <Grid item xs={12} sm={6} lg={4} key={activity.id}>
                        <Card
                            elevation={0}
                            sx={{
                                cursor: 'pointer',
                                background: 'rgba(255, 255, 255, 0.7)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: `0 8px 30px ${activityDetails.color}20`,
                                    border: `1px solid ${activityDetails.color}30`,
                                },
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '3px',
                                    background: `linear-gradient(135deg, ${activityDetails.color} 0%, ${activityDetails.color}cc 100%)`,
                                }
                            }}
                            onClick={() => navigate(`/activities/${activity.id}`)}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                    <Avatar
                                        sx={{
                                            background: `${activityDetails.color}15`,
                                            color: activityDetails.color,
                                            width: 48,
                                            height: 48,
                                        }}
                                    >
                                        {activityDetails.icon}
                                    </Avatar>
                                    <Visibility sx={{ color: '#94a3b8', fontSize: '1.2rem' }} />
                                </Box>

                                <Typography
                                    variant='h6'
                                    sx={{
                                        fontWeight: 700,
                                        color: '#1e293b',
                                        mb: 2,
                                        textTransform: 'capitalize'
                                    }}
                                >
                                    {activity.type.toLowerCase().replace('_', ' ')}
                                </Typography>

                                <Stack spacing={1.5}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Timer sx={{ color: '#8b5cf6', fontSize: '1rem' }} />
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: '#64748b',
                                                fontWeight: 500
                                            }}
                                        >
                                            {activity.duration} minutes
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <LocalFireDepartment sx={{ color: '#f59e0b', fontSize: '1rem' }} />
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: '#64748b',
                                                fontWeight: 500
                                            }}
                                        >
                                            {activity.caloriesBurned} kcal
                                        </Typography>
                                    </Box>
                                </Stack>

                                {/* Activity Date */}
                                <Chip
                                    label={new Date(activity.createdAt || Date.now()).toLocaleDateString()}
                                    size="small"
                                    sx={{
                                        mt: 2,
                                        background: `${activityDetails.color}10`,
                                        color: activityDetails.color,
                                        border: `1px solid ${activityDetails.color}30`,
                                        fontWeight: 500,
                                        fontSize: '0.75rem'
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default ActivityList