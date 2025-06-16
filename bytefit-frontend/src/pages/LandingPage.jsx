import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Container,
  Stack,
  Paper,
  Chip,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'react-oauth2-code-pkce';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Footer from '../components/Footer';
import {
  FitnessCenter,
  TrendingUp,
  TrackChanges,
  Timeline,
  Speed,
  EmojiEvents,
  PlayArrow,
  ArrowForward,
  Star,
  CheckCircle,
  Rocket,
  Analytics,
  Groups,
  MonitorHeart,
} from '@mui/icons-material';

function LandingPage() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const user = useSelector((state) => state.auth.user);
  const [localToken, setLocalToken] = useState(localStorage.getItem('token'));

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setLocalToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Consistent authentication check
  const isUserAuthenticated = !!(token || localToken || (user && user.sub));

  const handleStartJourney = () => {
    if (isUserAuthenticated) {
      navigate('/dashboard');
      toast.success('Welcome to your Dashboard! 📊', {
        duration: 2000,
        position: 'top-center',
        style: {
          background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
          color: 'white',
          fontSize: '16px',
          fontWeight: '600',
          borderRadius: '12px',
          padding: '12px 20px',
          boxShadow: '0 4px 15px rgba(78, 205, 196, 0.3)',
        }
      });
    } else {
      toast.error('🔒 Please login to start your fitness journey', {
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
    }
  };

  const features = [
    {
      icon: <FitnessCenter sx={{ fontSize: 48, color: '#10b981' }} />,
      title: 'Activity Tracking',
      description: 'Track running, walking, cycling and other fitness activities with duration, calories, and metrics',
      color: '#10b981'
    },
    {
      icon: <Rocket sx={{ fontSize: 48, color: '#8b5cf6' }} />,
      title: 'AI-Powered Recommendations',
      description: 'Get personalized fitness insights and recommendations powered by AI',
      color: '#8b5cf6'
    },
    {
      icon: <Analytics sx={{ fontSize: 48, color: '#f59e0b' }} />,
      title: 'Real-time Analytics',
      description: 'Monitor performance with detailed analytics, progress tracking, and safety guidelines',
      color: '#f59e0b'
    },
    {
      icon: <Groups sx={{ fontSize: 48, color: '#06b6d4' }} />,
      title: 'Your Data is Secure',
      description: 'Enterprise-grade security with advanced encryption. Your personal fitness data is protected with bank-level authentication and privacy controls',
      color: '#06b6d4'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '500K+', label: 'Workouts Tracked' },
    { number: '98%', label: 'Goal Success Rate' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
        paddingTop: '80px',
        overflow: 'hidden',
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
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: 'center',
            py: { xs: 8, md: 12 },
            px: 2,
          }}
        >
          <Box
            sx={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '50px',
              padding: '16px 32px',
              marginBottom: 4,
              boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
              transform: 'perspective(1000px) rotateX(5deg)',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: 'white',
                fontWeight: 700,
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              🏆 #1 Fitness Tracking Platform
            </Typography>
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3.5rem', md: '5rem', lg: '6.5rem' },
              fontWeight: 900,
              background: 'linear-gradient(135deg, #1e293b 0%, #475569 50%, #64748b 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1,
              marginBottom: 3,
              textShadow: '0 4px 20px rgba(0,0,0,0.1)',
            }}
          >
            Transform Your
            <br />
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-10px',
                  left: 0,
                  right: 0,
                  height: '6px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '3px',
                  opacity: 0.3,
                }
              }}
            >
              Fitness Journey
            </Box>
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: '#64748b',
              fontWeight: 400,
              maxWidth: '700px',
              margin: '0 auto',
              marginBottom: 6,
              fontSize: { xs: '1.3rem', md: '1.5rem' },
              lineHeight: 1.7,
            }}
          >
            Experience the future of fitness tracking with ByteFit's AI-powered platform.
            Track, analyze, and achieve your fitness goals with intelligent insights and
            personalized recommendations.
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            justifyContent="center"
            alignItems="center"
            sx={{ marginBottom: 10 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleStartJourney}
              endIcon={<ArrowForward />}
              sx={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '50px',
                padding: '18px 45px',
                fontSize: '1.2rem',
                fontWeight: 700,
                textTransform: 'none',
                boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)',
                border: 'none',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  transition: 'left 0.6s',
                },
                '&:hover': {
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 15px 40px rgba(16, 185, 129, 0.5)',
                  '&::before': {
                    left: '100%',
                  }
                },
              }}
            >
              {isUserAuthenticated ? 'Go to Dashboard' : 'Start Your Journey'}
            </Button>
          </Stack>

          {/* Stats Section */}
          <Grid container spacing={4} sx={{ marginTop: 4 }}>
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    padding: 3,
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
                      background: 'rgba(255, 255, 255, 0.9)',
                    }
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 900,
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontSize: { xs: '2rem', md: '2.8rem' },
                      marginBottom: 1,
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#64748b',
                      fontWeight: 600,
                      fontSize: '1rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Features Section */}
        <Box sx={{ py: { xs: 8, md: 12 } }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                fontWeight: 800,
                color: '#1e293b',
                marginBottom: 4,
                lineHeight: 1.2,
              }}
            >
              Why Choose{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ByteFit
              </Box>
              ?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#64748b',
                fontWeight: 400,
                maxWidth: '700px',
                margin: '0 auto',
                fontSize: { xs: '1.2rem', md: '1.4rem' },
                lineHeight: 1.8,
                px: 2,
              }}
            >
              Discover the powerful features that make ByteFit the ultimate
              fitness companion for achieving your health goals.
            </Typography>
          </Box>

          <Container maxWidth="xl">
            <Grid
              container
              spacing={{ xs: 3, sm: 4, md: 5 }}
              justifyContent="center"
              alignItems="stretch"
            >
              {features.map((feature, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      width: '100%',
                      maxWidth: '380px',
                      height: '100%',
                      minHeight: '320px',
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(20px)',
                      border: '2px solid rgba(255, 255, 255, 0.4)',
                      borderRadius: '28px',
                      padding: { xs: '1.5rem', md: '2.5rem' },
                      textAlign: 'center',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '5px',
                        background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)`,
                        transform: 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 0.4s ease',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `radial-gradient(circle at center, ${feature.color}08 0%, transparent 70%)`,
                        opacity: 0,
                        transition: 'opacity 0.4s ease',
                        zIndex: 0,
                      },
                      '&:hover': {
                        transform: 'translateY(-12px)',
                        boxShadow: `0 20px 60px ${feature.color}25, 0 8px 32px rgba(0, 0, 0, 0.12)`,
                        background: 'rgba(255, 255, 255, 0.95)',
                        borderColor: `${feature.color}40`,
                        '&::before': {
                          transform: 'scaleX(1)',
                        },
                        '&::after': {
                          opacity: 1,
                        }
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        p: 0,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      <Box
                        sx={{
                          background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}25)`,
                          borderRadius: '50%',
                          width: { xs: '80px', md: '90px' },
                          height: { xs: '80px', md: '90px' },
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 2rem',
                          transition: 'all 0.4s ease',
                          border: `3px solid ${feature.color}30`,
                          position: 'relative',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            inset: '-3px',
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${feature.color}, ${feature.color}80)`,
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                            zIndex: -1,
                          }
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: '#1e293b',
                          mb: 2,
                          fontSize: { xs: '1.2rem', md: '1.3rem' },
                          lineHeight: 1.3,
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#64748b',
                          lineHeight: 1.8,
                          fontSize: { xs: '0.95rem', md: '1rem' },
                          flexGrow: 1,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            py: 10,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            borderRadius: '32px',
            margin: '4rem 0',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(circle at 30% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)
              `,
              zIndex: 0,
            }
          }}
        >
          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h3"
              sx={{
                color: 'white',
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3rem' },
              }}
            >
              Ready to Transform Your Life?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                mb: 5,
                fontWeight: 400,
                lineHeight: 1.7,
                fontSize: '1.2rem',
                maxWidth: '500px',
                margin: '0 auto 3rem',
              }}
            >
              Join thousands of fitness enthusiasts who have already transformed
              their lives with ByteFit. Your journey to better health starts now.
            </Typography>

            {!isUserAuthenticated ? (
              <Button
                variant="contained"
                size="large"
                startIcon={<Rocket />}
                onClick={handleStartJourney}
                sx={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  padding: '20px 50px',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  borderRadius: '50px',
                  textTransform: 'none',
                  boxShadow: '0 8px 30px rgba(16, 185, 129, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 15px 40px rgba(16, 185, 129, 0.5)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Start Free Today
              </Button>
            ) : (
              <Typography
                variant="h6"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  padding: '20px 40px',
                  background: 'rgba(16, 185, 129, 0.2)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '50px',
                  border: '2px solid rgba(16, 185, 129, 0.3)',
                  display: 'inline-block',
                  fontWeight: 600,
                  fontSize: '1.2rem',
                }}
              >
                🎉 Welcome back! Continue your amazing journey.
              </Typography>
            )}
          </Container>
        </Box>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default LandingPage;