import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Container,
    Button,
    Avatar,
    LinearProgress,
    Chip,
    Stack
} from '@mui/material';
import {
    Add,
    TrendingUp,
    LocalFireDepartment,
    Timer,
    FitnessCenter,
    CalendarToday,
    EmojiEvents,
    Timeline
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getActivities } from '../services/api';
import ActivityList from '../components/ActivityList';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalActivities: 0,
        totalCalories: 0,
        totalDuration: 0,
        weeklyGoal: 300, // minutes
        weeklyProgress: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getActivities();
                const activities = response.data;

                const totalActivities = activities.length;
                const totalCalories = activities.reduce((sum, activity) => sum + (activity.caloriesBurned || 0), 0);
                const totalDuration = activities.reduce((sum, activity) => sum + (activity.duration || 0), 0);

                // Calculate weekly progress (assuming current week)
                const weeklyProgress = Math.min((totalDuration / stats.weeklyGoal) * 100, 100);

                setStats({
                    ...stats,
                    totalActivities,
                    totalCalories,
                    totalDuration,
                    weeklyProgress
                });
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

        fetchStats();
    }, []);

    const quickStats = [
        {
            title: "Total Activities",
            value: stats.totalActivities,
            icon: <FitnessCenter />,
            color: "#10b981",
            suffix: " sessions"
        },
        {
            title: "Calories Burned",
            value: stats.totalCalories,
            icon: <LocalFireDepartment />,
            color: "#f59e0b",
            suffix: " kcal"
        },
        {
            title: "Total Duration",
            value: stats.totalDuration,
            icon: <Timer />,
            color: "#8b5cf6",
            suffix: " min"
        },
        {
            title: "Weekly Goal",
            value: Math.round(stats.weeklyProgress),
            icon: <EmojiEvents />,
            color: "#e11d48",
            suffix: "%"
        }
    ];

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
                paddingTop: '80px',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `
                        radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(245, 158, 11, 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 40% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)
                    `,
                    zIndex: 0,
                }
            }}
        >
            <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
                {/* Header Section */}
                <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Box>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 800,
                                    background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontSize: { xs: '2rem', md: '2.5rem' }
                                }}
                            >
                                Welcome Back! 💪
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#64748b',
                                    fontWeight: 400,
                                    mt: 1
                                }}
                            >
                                Ready to crush your fitness goals today?
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => navigate('/add-activity')}
                            sx={{
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                borderRadius: '50px',
                                padding: '12px 32px',
                                fontSize: '1rem',
                                fontWeight: 700,
                                textTransform: 'none',
                                boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
                                border: 'none',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 12px 35px rgba(16, 185, 129, 0.4)',
                                },
                            }}
                        >
                            Add Activity
                        </Button>
                    </Box>

                    {/* Date and Streak Info */}
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Chip
                            icon={<CalendarToday />}
                            label={new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric'
                            })}
                            sx={{
                                background: 'rgba(16, 185, 129, 0.1)',
                                color: '#10b981',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                fontWeight: 600,
                            }}
                        />
                        <Chip
                            icon={<Timeline />}
                            label="Keep it up!"
                            sx={{
                                background: 'rgba(245, 158, 11, 0.1)',
                                color: '#f59e0b',
                                border: '1px solid rgba(245, 158, 11, 0.3)',
                                fontWeight: 600,
                            }}
                        />
                    </Stack>
                </Box>

                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {quickStats.map((stat, index) => (
                        <Grid item xs={12} sm={6} lg={3} key={index}>
                            <Card
                                elevation={0}
                                sx={{
                                    background: 'rgba(255, 255, 255, 0.9)',
                                    backdropFilter: 'blur(20px)',
                                    border: '2px solid rgba(255, 255, 255, 0.4)',
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: `0 12px 40px ${stat.color}20`,
                                    },
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '4px',
                                        background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}cc 100%)`,
                                    }
                                }}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                        <Avatar
                                            sx={{
                                                background: `${stat.color}15`,
                                                color: stat.color,
                                                width: 56,
                                                height: 56,
                                            }}
                                        >
                                            {stat.icon}
                                        </Avatar>
                                        <TrendingUp sx={{ color: '#10b981', fontSize: '1.5rem' }} />
                                    </Box>

                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 800,
                                            color: '#1e293b',
                                            mb: 0.5
                                        }}
                                    >
                                        {stat.value}{stat.suffix}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#64748b',
                                            fontWeight: 500
                                        }}
                                    >
                                        {stat.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Weekly Goal Progress */}
                <Card
                    elevation={0}
                    sx={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(20px)',
                        border: '2px solid rgba(255, 255, 255, 0.4)',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
                        mb: 4,
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '4px',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        }
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Avatar
                                sx={{
                                    background: 'rgba(16, 185, 129, 0.15)',
                                    color: '#10b981',
                                    width: 48,
                                    height: 48,
                                    mr: 2
                                }}
                            >
                                <EmojiEvents />
                            </Avatar>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                                    Weekly Fitness Goal
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#64748b' }}>
                                    {stats.totalDuration} / {stats.weeklyGoal} minutes completed
                                </Typography>
                            </Box>
                        </Box>

                        <LinearProgress
                            variant="determinate"
                            value={stats.weeklyProgress}
                            sx={{
                                height: 12,
                                borderRadius: 6,
                                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                '& .MuiLinearProgress-bar': {
                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                    borderRadius: 6,
                                },
                            }}
                        />

                        <Typography
                            variant="body2"
                            sx={{
                                color: '#10b981',
                                fontWeight: 600,
                                mt: 1,
                                textAlign: 'right'
                            }}
                        >
                            {Math.round(stats.weeklyProgress)}% Complete
                        </Typography>
                    </CardContent>
                </Card>

                {/* Activities Section */}
                <Card
                    elevation={0}
                    sx={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(20px)',
                        border: '2px solid rgba(255, 255, 255, 0.4)',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '4px',
                            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                        }
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar
                                    sx={{
                                        background: 'rgba(139, 92, 246, 0.15)',
                                        color: '#8b5cf6',
                                        width: 48,
                                        height: 48,
                                        mr: 2
                                    }}
                                >
                                    <FitnessCenter />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                                        Your Recent Activities
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                                        Track your fitness journey
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <ActivityList />
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default DashboardPage;