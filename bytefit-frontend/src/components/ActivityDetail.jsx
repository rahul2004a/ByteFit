import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Container,
    Button,
    Avatar,
    Chip,
    Stack,
    CircularProgress,
    Breadcrumbs,
    Link,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Alert,
    Divider,
    IconButton,
    Grid,
    LinearProgress
} from '@mui/material';
import {
    ArrowBack,
    Dashboard,
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
    CalendarToday,
    Psychology,
    TrendingUp,
    Security,
    Lightbulb,
    ExpandMore,
    CheckCircle,
    Edit,
    Delete,
    Share,
    Bookmark
} from '@mui/icons-material';
import { getActivityDetail, getActivityRecommendation } from '../services/api';
import toast from 'react-hot-toast';

// Activity type configurations
const activityTypeConfig = {
    RUNNING: {
        icon: DirectionsRun,
        color: '#ef4444',
        bgColor: 'rgba(239, 68, 68, 0.1)',
        gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
    },
    WALKING: {
        icon: DirectionsWalk,
        color: '#22c55e',
        bgColor: 'rgba(34, 197, 94, 0.1)',
        gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
    },
    CYCLING: {
        icon: DirectionsBike,
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.1)',
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
    },
    SWIMMING: {
        icon: Pool,
        color: '#06b6d4',
        bgColor: 'rgba(6, 182, 212, 0.1)',
        gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)'
    },
    WEIGHT_TRAINING: {
        icon: FitnessCenter,
        color: '#dc2626',
        bgColor: 'rgba(220, 38, 38, 0.1)',
        gradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
    },
    YOGA: {
        icon: SelfImprovement,
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.1)',
        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
    },
    HIIT: {
        icon: FlashOn,
        color: '#f97316',
        bgColor: 'rgba(249, 115, 22, 0.1)',
        gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
    },
    CARDIO: {
        icon: MonitorHeart,
        color: '#ec4899',
        bgColor: 'rgba(236, 72, 153, 0.1)',
        gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
    },
    STRETCHING: {
        icon: Accessibility,
        color: '#14b8a6',
        bgColor: 'rgba(20, 184, 166, 0.1)',
        gradient: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)'
    },
    OTHER: {
        icon: MoreHoriz,
        color: '#6b7280',
        bgColor: 'rgba(107, 114, 128, 0.1)',
        gradient: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)'
    }
};

const ActivityDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activity, setActivity] = useState(null);
    const [recommendation, setRecommendation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActivityData = async () => {
            try {
                setLoading(true);

                // Fetch activity details
                const activityResponse = await getActivityDetail(id);
                console.log('Activity detail response:', activityResponse);
                console.log('Activity data:', activityResponse.data);
                setActivity(activityResponse.data);

                // Try to fetch recommendation data
                try {
                    const recommendationResponse = await getActivityRecommendation(id);
                    console.log('Recommendation response:', recommendationResponse);
                    setRecommendation(recommendationResponse.data);
                } catch (recError) {
                    console.log('No recommendations available:', recError);
                    // Recommendations are optional, so don't set error
                }

                setError(null);
            } catch (error) {
                console.error('Error fetching activity detail:', error);
                setError('Failed to load activity details');
                toast.error('Failed to load activity details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchActivityData();
        }
    }, [id]);

    const handleBack = () => {
        navigate('/dashboard');
    };

    const handleEdit = () => {
        toast.success('Edit functionality coming soon!');
    };

    const handleDelete = () => {
        toast.success('Delete functionality coming soon!');
    };

    const handleShare = () => {
        toast.success('Share functionality coming soon!');
    };

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Card sx={{
                    p: 4,
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}>
                    <Stack alignItems="center" spacing={2}>
                        <CircularProgress
                            size={60}
                            sx={{ color: '#10b981' }}
                        />
                        <Typography variant="h6" color="text.secondary">
                            Loading activity details...
                        </Typography>
                    </Stack>
                </Card>
            </Box>
        );
    }

    if (error || !activity) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
                    p: 3
                }}
            >
                <Container maxWidth="md">
                    <Card sx={{
                        p: 4,
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        textAlign: 'center'
                    }}>
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error || 'Activity not found'}
                        </Alert>
                        <Button
                            variant="contained"
                            onClick={handleBack}
                            startIcon={<ArrowBack />}
                            sx={{
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                                }
                            }}
                        >
                            Back to Dashboard
                        </Button>
                    </Card>
                </Container>
            </Box>
        );
    }

    const config = activityTypeConfig[activity?.type] || activityTypeConfig.OTHER;
    const IconComponent = config.icon;

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
                py: 4
            }}
        >
            <Container maxWidth="lg">
                {/* Header Section */}
                <Card sx={{
                    mb: 3,
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    overflow: 'hidden'
                }}>
                    <Box
                        sx={{
                            background: config.gradient,
                            color: 'white',
                            p: 3,
                            position: 'relative',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'rgba(0, 0, 0, 0.1)',
                                backdropFilter: 'blur(1px)'
                            }
                        }}
                    >
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <IconButton
                                    onClick={handleBack}
                                    sx={{
                                        color: 'white',
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        '&:hover': { background: 'rgba(255, 255, 255, 0.3)' }
                                    }}
                                >
                                    <ArrowBack />
                                </IconButton>
                                <Avatar
                                    sx={{
                                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                                        width: 56,
                                        height: 56,
                                        backdropFilter: 'blur(10px)'
                                    }}
                                >
                                    <IconComponent fontSize="large" />
                                </Avatar>
                                <Box>
                                    <Typography variant="h4" fontWeight="bold">
                                        {activity?.type ? activity.type.replace('_', ' ') : 'Activity'}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                                        {activity?.createdAt ? new Date(activity.createdAt).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }) : 'No date available'}
                                    </Typography>
                                </Box>
                            </Stack>

                            <Stack direction="row" spacing={1}>
                                <IconButton
                                    onClick={handleEdit}
                                    sx={{
                                        color: 'white',
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        '&:hover': { background: 'rgba(255, 255, 255, 0.3)' }
                                    }}
                                >
                                    <Edit />
                                </IconButton>
                                <IconButton
                                    onClick={handleShare}
                                    sx={{
                                        color: 'white',
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        '&:hover': { background: 'rgba(255, 255, 255, 0.3)' }
                                    }}
                                >
                                    <Share />
                                </IconButton>
                                <IconButton
                                    onClick={handleDelete}
                                    sx={{
                                        color: 'white',
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        '&:hover': { background: 'rgba(255, 255, 255, 0.3)' }
                                    }}
                                >
                                    <Delete />
                                </IconButton>
                            </Stack>
                        </Stack>
                    </Box>
                </Card>

                <Grid container spacing={3}>
                    {/* Stats Cards and Action Cards in one row */}
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            {/* Stats Cards */}
                            <Grid item xs={12} sm={6} md={4} lg={2.4}>
                                <Card sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
                                    textAlign: 'center',
                                    transition: 'all 0.3s ease',
                                    height: '100%',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.2)'
                                    }
                                }}>
                                    <Box sx={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 12px auto'
                                    }}>
                                        <Timer sx={{ color: 'white', fontSize: 24 }} />
                                    </Box>
                                    <Typography variant="h5" fontWeight="bold" color="text.primary">
                                        {activity?.duration || 0}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Minutes
                                    </Typography>
                                </Card>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} lg={2.4}>
                                <Card sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
                                    textAlign: 'center',
                                    transition: 'all 0.3s ease',
                                    height: '100%',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.2)'
                                    }
                                }}>
                                    <Box sx={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 12px auto'
                                    }}>
                                        <LocalFireDepartment sx={{ color: 'white', fontSize: 24 }} />
                                    </Box>
                                    <Typography variant="h5" fontWeight="bold" color="text.primary">
                                        {activity?.caloriesBurned || 0}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Calories
                                    </Typography>
                                </Card>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} lg={2.4}>
                                <Card sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
                                    textAlign: 'center',
                                    transition: 'all 0.3s ease',
                                    height: '100%',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.2)'
                                    }
                                }}>
                                    <Box sx={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 12px auto'
                                    }}>
                                        <TrendingUp sx={{ color: 'white', fontSize: 24 }} />
                                    </Box>
                                    <Typography variant="h5" fontWeight="bold" color="text.primary">
                                        {Math.round((activity?.caloriesBurned || 0) / (activity?.duration || 1))}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Cal/Min
                                    </Typography>
                                </Card>
                            </Grid>

                            {/* Activity Summary */}
                            <Grid item xs={12} sm={6} md={6} lg={3.6}>
                                <Card sx={{
                                    borderRadius: 3,
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
                                    height: '100%',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.2)'
                                    }
                                }}>
                                    <CardContent sx={{ p: 2.5 }}>
                                        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '1rem' }}>
                                            Activity Summary
                                        </Typography>

                                        <Stack spacing={1.5}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                                                    Activity Type
                                                </Typography>
                                                <Chip
                                                    label={activity?.type ? activity.type.replace('_', ' ') : 'Unknown'}
                                                    size="small"
                                                    sx={{
                                                        background: config.bgColor,
                                                        color: config.color,
                                                        fontWeight: 'bold',
                                                        fontSize: '0.7rem',
                                                        height: 20
                                                    }}
                                                />
                                            </Box>

                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                                                    Intensity
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.75rem' }}>
                                                        {Math.round((activity?.caloriesBurned || 0) / (activity?.duration || 1)) > 10 ? 'High' :
                                                            Math.round((activity?.caloriesBurned || 0) / (activity?.duration || 1)) > 5 ? 'Medium' : 'Low'}
                                                    </Typography>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={Math.min(((activity?.caloriesBurned || 0) / (activity?.duration || 1)) * 5, 100)}
                                                        sx={{
                                                            width: 40,
                                                            height: 4,
                                                            borderRadius: 2,
                                                            '& .MuiLinearProgress-bar': {
                                                                backgroundColor: config.color
                                                            }
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Quick Actions */}
                            <Grid item xs={12} sm={6} md={6} lg={3.6}>
                                <Card sx={{
                                    borderRadius: 3,
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
                                    height: '100%',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.2)'
                                    }
                                }}>
                                    <CardContent sx={{ p: 2.5 }}>
                                        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '1rem' }}>
                                            Quick Actions
                                        </Typography>

                                        <Stack spacing={1}>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                startIcon={<Edit fontSize="small" />}
                                                onClick={handleEdit}
                                                size="small"
                                                sx={{
                                                    borderColor: '#10b981',
                                                    color: '#10b981',
                                                    fontSize: '0.75rem',
                                                    '&:hover': {
                                                        borderColor: '#059669',
                                                        background: 'rgba(16, 185, 129, 0.04)'
                                                    }
                                                }}
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                startIcon={<Share fontSize="small" />}
                                                onClick={handleShare}
                                                size="small"
                                                sx={{
                                                    borderColor: '#3b82f6',
                                                    color: '#3b82f6',
                                                    fontSize: '0.75rem',
                                                    '&:hover': {
                                                        borderColor: '#2563eb',
                                                        background: 'rgba(59, 130, 246, 0.04)'
                                                    }
                                                }}
                                            >
                                                Share
                                            </Button>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        {/* AI Recommendations Section */}
                        {(activity?.recommendation || recommendation) && (
                            <Card sx={{
                                borderRadius: 4,
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                                overflow: 'hidden'
                            }}>
                                <Box sx={{
                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                    color: 'white',
                                    p: 3
                                }}>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Psychology fontSize="large" />
                                        <Typography variant="h5" fontWeight="bold">
                                            AI-Powered Analysis
                                        </Typography>
                                    </Stack>
                                </Box>

                                <CardContent sx={{ p: 3 }}>
                                    <Accordion defaultExpanded sx={{ mb: 2, boxShadow: 'none', '&:before': { display: 'none' } }}>
                                        <AccordionSummary expandIcon={<ExpandMore />}>
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <Lightbulb sx={{ color: '#10b981' }} />
                                                <Typography variant="h6" fontWeight="600">
                                                    Performance Analysis
                                                </Typography>
                                            </Stack>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {(() => {
                                                const text = activity?.recommendation || recommendation?.recommendation || 'No recommendations available at this time.';

                                                // Check if the text contains the structured format with sections
                                                if (text.includes('Overall:') || text.includes('Pace:') || text.includes('Heart Rate:') || text.includes('Calories:')) {
                                                    // Split the text into sections
                                                    const sections = text.split(/(?=Overall:|Pace:|Heart Rate:|Calories:)/);

                                                    return (
                                                        <Stack spacing={2}>
                                                            {sections.filter(section => section.trim()).map((section, index) => {
                                                                const trimmedSection = section.trim();
                                                                if (!trimmedSection) return null;

                                                                // Extract section title and content
                                                                const colonIndex = trimmedSection.indexOf(':');
                                                                if (colonIndex === -1) {
                                                                    return (
                                                                        <Typography key={index} variant="body1" lineHeight={1.7}>
                                                                            {trimmedSection}
                                                                        </Typography>
                                                                    );
                                                                }

                                                                const title = trimmedSection.substring(0, colonIndex + 1);
                                                                const content = trimmedSection.substring(colonIndex + 1).trim();

                                                                return (
                                                                    <Box key={index} sx={{ mb: 1.5 }}>
                                                                        <Typography
                                                                            variant="subtitle2"
                                                                            fontWeight="bold"
                                                                            color="#059669"
                                                                            sx={{ mb: 0.5 }}
                                                                        >
                                                                            {title}
                                                                        </Typography>
                                                                        <Typography
                                                                            variant="body2"
                                                                            color="text.secondary"
                                                                            lineHeight={1.6}
                                                                            sx={{ pl: 1 }}
                                                                        >
                                                                            {content}
                                                                        </Typography>
                                                                    </Box>
                                                                );
                                                            })}
                                                        </Stack>
                                                    );
                                                } else {
                                                    // Display as regular text if no sections are found
                                                    return (
                                                        <Typography variant="body1" lineHeight={1.7}>
                                                            {text}
                                                        </Typography>
                                                    );
                                                }
                                            })()}
                                        </AccordionDetails>
                                    </Accordion>

                                    {((activity?.improvements && Array.isArray(activity.improvements) && activity.improvements.length > 0) ||
                                        (recommendation?.improvements && Array.isArray(recommendation.improvements) && recommendation.improvements.length > 0)) && (
                                            <Accordion sx={{ mb: 2, boxShadow: 'none', '&:before': { display: 'none' } }}>
                                                <AccordionSummary expandIcon={<ExpandMore />}>
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <TrendingUp sx={{ color: '#3b82f6' }} />
                                                        <Typography variant="h6" fontWeight="600">
                                                            Improvement Suggestions
                                                        </Typography>
                                                    </Stack>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <List>
                                                        {(activity?.improvements || recommendation?.improvements || []).map((improvement, index) => (
                                                            <ListItem key={index} sx={{ px: 0 }}>
                                                                <ListItemIcon>
                                                                    <CheckCircle sx={{ color: '#10b981' }} />
                                                                </ListItemIcon>
                                                                <ListItemText primary={improvement} />
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </AccordionDetails>
                                            </Accordion>
                                        )}

                                    {((activity?.suggestions && Array.isArray(activity.suggestions) && activity.suggestions.length > 0) ||
                                        (recommendation?.suggestions && Array.isArray(recommendation.suggestions) && recommendation.suggestions.length > 0)) && (
                                            <Accordion sx={{ mb: 2, boxShadow: 'none', '&:before': { display: 'none' } }}>
                                                <AccordionSummary expandIcon={<ExpandMore />}>
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Lightbulb sx={{ color: '#f59e0b' }} />
                                                        <Typography variant="h6" fontWeight="600">
                                                            Next Steps
                                                        </Typography>
                                                    </Stack>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <List>
                                                        {(activity?.suggestions || recommendation?.suggestions || []).map((suggestion, index) => (
                                                            <ListItem key={index} sx={{ px: 0 }}>
                                                                <ListItemIcon>
                                                                    <CheckCircle sx={{ color: '#10b981' }} />
                                                                </ListItemIcon>
                                                                <ListItemText primary={suggestion} />
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </AccordionDetails>
                                            </Accordion>
                                        )}

                                    {((activity?.safety && Array.isArray(activity.safety) && activity.safety.length > 0) ||
                                        (recommendation?.safety && Array.isArray(recommendation.safety) && recommendation.safety.length > 0)) && (
                                            <Accordion sx={{ boxShadow: 'none', '&:before': { display: 'none' } }}>
                                                <AccordionSummary expandIcon={<ExpandMore />}>
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Security sx={{ color: '#ef4444' }} />
                                                        <Typography variant="h6" fontWeight="600">
                                                            Safety Guidelines
                                                        </Typography>
                                                    </Stack>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <List>
                                                        {(activity?.safety || recommendation?.safety || []).map((safety, index) => (
                                                            <ListItem key={index} sx={{ px: 0 }}>
                                                                <ListItemIcon>
                                                                    <CheckCircle sx={{ color: '#10b981' }} />
                                                                </ListItemIcon>
                                                                <ListItemText primary={safety} />
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </AccordionDetails>
                                            </Accordion>
                                        )}
                                </CardContent>
                            </Card>
                        )}
                    </Grid>

                    {/* Sidebar - Now empty or can be used for additional content */}
                    <Grid item xs={12} md={4}>
                        {/* This space can be used for additional widgets or charts in the future */}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default ActivityDetail