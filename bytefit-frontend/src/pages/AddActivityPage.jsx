import React from 'react';
import { 
    Box, 
    Typography, 
    Container,
    Card,
    CardContent,
    Chip,
} from '@mui/material';
import {
    FitnessCenter,
    TrendingUp,
    Timer,
    LocalFireDepartment,
} from '@mui/icons-material';
import ActivityForm from '../components/ActivityForm';
import { useNavigate } from 'react-router-dom';

const AddActivityPage = () => {
    const navigate = useNavigate();

    const handleActivityAdded = () => {
        // Navigate back to dashboard after successfully adding an activity
        navigate('/dashboard');
    };

    return (
        <Box 
            sx={{ 
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
                paddingTop: '80px',
                py: 4,
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
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                {/* Header Section */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Box
                        sx={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            borderRadius: '50%',
                            padding: '20px',
                            marginBottom: 3,
                            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
                        }}
                    >
                        <FitnessCenter sx={{ color: 'white', fontSize: '3rem' }} />
                    </Box>
                    
                    <Typography 
                        variant="h3" 
                        sx={{
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 2,
                            fontSize: { xs: '2.5rem', md: '3rem' }
                        }}
                    >
                        Track Your Activity
                    </Typography>
                    
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            color: '#64748b',
                            fontWeight: 400,
                            maxWidth: '500px',
                            margin: '0 auto',
                            lineHeight: 1.6,
                        }}
                    >
                        Record your fitness journey and watch your progress grow with every workout
                    </Typography>

                    {/* Feature Chips */}
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <Chip
                            icon={<Timer />}
                            label="Track Duration"
                            sx={{
                                background: 'rgba(16, 185, 129, 0.1)',
                                color: '#10b981',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                fontWeight: 600,
                            }}
                        />
                        <Chip
                            icon={<LocalFireDepartment />}
                            label="Count Calories"
                            sx={{
                                background: 'rgba(245, 158, 11, 0.1)',
                                color: '#f59e0b',
                                border: '1px solid rgba(245, 158, 11, 0.3)',
                                fontWeight: 600,
                            }}
                        />
                        <Chip
                            icon={<TrendingUp />}
                            label="Monitor Progress"
                            sx={{
                                background: 'rgba(139, 92, 246, 0.1)',
                                color: '#8b5cf6',
                                border: '1px solid rgba(139, 92, 246, 0.3)',
                                fontWeight: 600,
                            }}
                        />
                    </Box>
                </Box>

                {/* Activity Form Card */}
                <Card
                    elevation={0}
                    sx={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(20px)',
                        border: '2px solid rgba(255, 255, 255, 0.4)',
                        borderRadius: '32px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '6px',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        }
                    }}
                >
                    <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                        <ActivityForm onActivityAdded={handleActivityAdded} />
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default AddActivityPage;