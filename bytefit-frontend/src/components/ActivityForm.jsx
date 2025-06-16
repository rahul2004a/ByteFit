import { 
    Box, 
    Button, 
    FormControl, 
    InputLabel, 
    MenuItem, 
    Select, 
    TextField,
    Typography,
    Grid,
    Card,
    CardContent,
    InputAdornment,
    Alert,
    Fade,
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
    CheckCircle,
    Send,
} from '@mui/icons-material';
import React, { useState } from 'react';
import { addActivity } from '../services/api';
import toast from 'react-hot-toast';

const ActivityForm = ({ onActivityAdded }) => {
    const [activity, setActivity] = useState({
        type: "RUNNING", 
        duration: '', 
        caloriesBurned: '',
        additionalMetrics: {}
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const activityTypes = [
        { 
            value: "RUNNING", 
            label: "Running", 
            icon: <DirectionsRun />,
            color: '#10b981',
            description: "Track your running sessions"
        },
        { 
            value: "WALKING", 
            label: "Walking", 
            icon: <DirectionsWalk />,
            color: '#f59e0b',
            description: "Log your walking activities"
        },
        { 
            value: "CYCLING", 
            label: "Cycling", 
            icon: <DirectionsBike />,
            color: '#8b5cf6',
            description: "Record your cycling workouts"
        },
        { 
            value: "SWIMMING", 
            label: "Swimming", 
            icon: <Pool />,
            color: '#0ea5e9',
            description: "Track your swimming sessions"
        },
        { 
            value: "WEIGHT_TRAINING", 
            label: "Weight Training", 
            icon: <FitnessCenter />,
            color: '#dc2626',
            description: "Log your strength training"
        },
        { 
            value: "YOGA", 
            label: "Yoga", 
            icon: <SelfImprovement />,
            color: '#7c3aed',
            description: "Record your yoga practice"
        },
        { 
            value: "HIIT", 
            label: "HIIT", 
            icon: <FlashOn />,
            color: '#ea580c',
            description: "High-intensity interval training"
        },
        { 
            value: "CARDIO", 
            label: "Cardio", 
            icon: <MonitorHeart />,
            color: '#e11d48',
            description: "General cardio workouts"
        },
        { 
            value: "STRETCHING", 
            label: "Stretching", 
            icon: <Accessibility />,
            color: '#0d9488',
            description: "Flexibility and stretching"
        },
        { 
            value: "OTHER", 
            label: "Other", 
            icon: <MoreHoriz />,
            color: '#6b7280',
            description: "Any other activity"
        },
    ];

    const getActivityTypeDetails = (type) => {
        return activityTypes.find(activity => activity.value === type) || activityTypes[0];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            await addActivity(activity);
            
            setShowSuccess(true);
            toast.success('🎉 Activity added successfully!', {
                duration: 3000,
                position: 'top-center',
                style: {
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600',
                    borderRadius: '12px',
                    padding: '12px 20px',
                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                }
            });
            
            setTimeout(() => {
                if (onActivityAdded && typeof onActivityAdded === 'function') {
                    onActivityAdded();
                }
            }, 1500);
            
            setActivity({ type: "RUNNING", duration: '', caloriesBurned: '', additionalMetrics: {} });
        } catch (error) {
            console.error(error);
            toast.error('Failed to add activity. Please try again.', {
                duration: 4000,
                position: 'top-center',
                style: {
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600',
                    borderRadius: '12px',
                    padding: '12px 20px',
                    boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
                }
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedActivityType = getActivityTypeDetails(activity.type);

    if (showSuccess) {
        return (
            <Fade in={showSuccess}>
                <Box sx={{ textAlign: 'center', py: 6 }}>
                    <CheckCircle sx={{ fontSize: '5rem', color: '#10b981', mb: 2 }} />
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 2 }}>
                        Activity Added!
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#64748b' }}>
                        Redirecting to your dashboard...
                    </Typography>
                </Box>
            </Fade>
        );
    }

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Typography 
                variant="h5" 
                sx={{ 
                    fontWeight: 700, 
                    color: '#1e293b', 
                    mb: 4,
                    textAlign: 'center'
                }}
            >
                What did you do today?
            </Typography>

            {/* Activity Type Selection */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#374151', mb: 2 }}>
                    Choose Activity Type
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        gap: 2,
                        pb: 2,
                        '&::-webkit-scrollbar': {
                            height: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: 'rgba(0,0,0,0.05)',
                            borderRadius: '10px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: 'linear-gradient(90deg, #10b981, #059669)',
                            borderRadius: '10px',
                            '&:hover': {
                                background: 'linear-gradient(90deg, #059669, #047857)',
                            },
                        },
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#10b981 rgba(0,0,0,0.05)',
                    }}
                >
                    {activityTypes.map((activityType) => (
                        <Card
                            key={activityType.value}
                            onClick={() => setActivity({ ...activity, type: activityType.value })}
                            sx={{
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                border: activity.type === activityType.value 
                                    ? `3px solid ${activityType.color}` 
                                    : '2px solid rgba(0,0,0,0.1)',
                                background: activity.type === activityType.value 
                                    ? `${activityType.color}10` 
                                    : 'white',
                                minWidth: '160px',
                                height: '140px',
                                flexShrink: 0,
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: `0 8px 25px ${activityType.color}30`,
                                }
                            }}
                        >
                            <CardContent sx={{ 
                                textAlign: 'center', 
                                py: 2, 
                                px: 2,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <Box sx={{ color: activityType.color, mb: 1 }}>
                                    {React.cloneElement(activityType.icon, { fontSize: 'large' })}
                                </Box>
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        fontWeight: 600, 
                                        color: activity.type === activityType.value ? activityType.color : '#374151',
                                        mb: 0.5,
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    {activityType.label}
                                </Typography>
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        color: '#64748b',
                                        fontSize: '0.7rem',
                                        lineHeight: 1.2
                                    }}
                                >
                                    {activityType.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>

            {/* Activity Details */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#374151', mb: 3 }}>
                    Activity Details
                </Typography>
                
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            fullWidth
                            label="Duration"
                            type='number'
                            value={activity.duration}
                            onChange={(e) => setActivity({ ...activity, duration: e.target.value })}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Timer sx={{ color: selectedActivityType.color }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Typography variant="body2" sx={{ color: '#64748b' }}>
                                            minutes
                                        </Typography>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                    '&:hover fieldset': {
                                        borderColor: selectedActivityType.color,
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: selectedActivityType.color,
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: selectedActivityType.color,
                                },
                            }}
                            required
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            fullWidth
                            label="Calories Burned"
                            type='number'
                            value={activity.caloriesBurned}
                            onChange={(e) => setActivity({ ...activity, caloriesBurned: e.target.value })}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocalFireDepartment sx={{ color: '#f59e0b' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Typography variant="body2" sx={{ color: '#64748b' }}>
                                            kcal
                                        </Typography>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                    '&:hover fieldset': {
                                        borderColor: '#f59e0b',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#f59e0b',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#f59e0b',
                                },
                            }}
                            required
                        />
                    </Grid>
                </Grid>
            </Box>

            {/* Submit Button */}
            <Box sx={{ textAlign: 'center', mt: 5 }}>
                <Button 
                    type='submit' 
                    variant='contained'
                    size="large"
                    disabled={isSubmitting || !activity.duration || !activity.caloriesBurned}
                    endIcon={<Send />}
                    sx={{
                        background: `linear-gradient(135deg, ${selectedActivityType.color} 0%, ${selectedActivityType.color}dd 100%)`,
                        borderRadius: '50px',
                        padding: '16px 48px',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        textTransform: 'none',
                        boxShadow: `0 8px 25px ${selectedActivityType.color}40`,
                        border: 'none',
                        minWidth: '200px',
                        '&:hover': {
                            background: `linear-gradient(135deg, ${selectedActivityType.color}dd 0%, ${selectedActivityType.color}aa 100%)`,
                            transform: 'translateY(-2px)',
                            boxShadow: `0 12px 35px ${selectedActivityType.color}50`,
                        },
                        '&:disabled': {
                            background: '#e2e8f0',
                            color: '#94a3b8',
                            transform: 'none',
                            boxShadow: 'none',
                        },
                    }}
                >
                    {isSubmitting ? 'Adding Activity...' : 'Add Activity'}
                </Button>
            </Box>
        </Box>
    );
};

export default ActivityForm;