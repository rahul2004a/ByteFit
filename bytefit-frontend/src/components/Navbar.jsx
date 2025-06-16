import React, { useContext, useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Chip,
    useScrollTrigger,
    Slide,
} from '@mui/material';
import {
    FitnessCenter,
    Dashboard,
    Add,
    AccountCircle,
    Logout,
    Person,
    Settings
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'react-oauth2-code-pkce';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import toast from 'react-hot-toast';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { logIn, logOut, token } = useContext(AuthContext);
    const user = useSelector((state) => state.auth.user);
    const [anchorEl, setAnchorEl] = useState(null);
    const [localToken, setLocalToken] = useState(localStorage.getItem('token'));

    // Custom toast styles
    const toastStyles = {
        success: {
            background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '12px',
            padding: '12px 20px',
            boxShadow: '0 4px 15px rgba(78, 205, 196, 0.3)',
        },
        error: {
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '12px',
            padding: '12px 20px',
            boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
        },
        warning: {
            background: 'linear-gradient(135deg, #ff8a65 0%, #ff7043 100%)',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '12px',
            padding: '12px 20px',
            boxShadow: '0 4px 15px rgba(255, 138, 101, 0.3)',
        },
        info: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '12px',
            padding: '12px 20px',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
        }
    };

    // Listen for localStorage changes
    useEffect(() => {
        const handleStorageChange = () => {
            setLocalToken(localStorage.getItem('token'));
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    // Use both token and isAuthenticated to determine auth state
    // Simplified authentication check - if any token exists, consider authenticated
    const isUserAuthenticated = !!(token || localToken || (user && user.sub));



    const handleDashboard = () => {
        if (isUserAuthenticated) {
            navigate('/dashboard');
            toast.success('Welcome to your Dashboard!', {
                duration: 2000,
                position: 'top-center',
                style: toastStyles.success
            });
        } else {
            toast.error('Please login to access your dashboard', {
                duration: 4000,
                position: 'top-center',
                style: toastStyles.error
            });
        }
    };

    const handleAddActivity = () => {
        if (isUserAuthenticated) {
            navigate('/add-activity');
            toast.success('Ready to log your workout!', {
                duration: 2000,
                position: 'top-center',
                style: toastStyles.success
            });
        } else {
            toast.error('Login required to track your activities', {
                duration: 4000,
                position: 'top-center',
                style: toastStyles.warning
            });
        }
    };

    const handleLogin = () => {
        toast.loading('Redirecting to login...', {
            duration: 2000,
            position: 'top-center',
            style: toastStyles.info
        });
        logIn();
    };

    const handleLogout = () => {
        // Show logout toast
        toast.success('Successfully logged out! See you soon!', {
            duration: 3000,
            position: 'top-center',
            style: toastStyles.success
        });

        // Clear OAuth2 token and state
        logOut();

        // Clear Redux state
        dispatch(logout());

        // Clear local state
        setLocalToken(null);

        // Navigate to home page
        navigate('/');

        // Close menu
        setAnchorEl(null);

        // Optional: Force page refresh to ensure all state is cleared
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            <AppBar
                position="fixed"
                elevation={trigger ? 4 : 0}
                sx={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease-in-out',
                    borderBottom: trigger ? '1px solid rgba(255,255,255,0.1)' : 'none',
                }}
            >
                <Toolbar sx={{ padding: '0 2rem' }}>
                    {/* Logo and Brand Name */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            },
                        }}
                        onClick={handleLogoClick}
                    >
                        <Box
                            sx={{
                                background: 'linear-gradient(45deg, #10b981, #059669)',
                                borderRadius: '50%',
                                padding: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '12px',
                                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                            }}
                        >
                            <FitnessCenter sx={{ color: 'white', fontSize: '1.8rem' }} />
                        </Box>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.8rem',
                                background: 'linear-gradient(45deg, #ffffff, #f0f8ff)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                letterSpacing: '0.5px',
                            }}
                        >
                            ByteFit
                        </Typography>
                    </Box>

                    {/* Spacer */}
                    <Box sx={{ flexGrow: 1 }} />

                    {/* Navigation Items */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {/* Dashboard Button - Always visible */}
                        <Button
                            color="inherit"
                            startIcon={<Dashboard />}
                            onClick={handleDashboard}
                            sx={{
                                borderRadius: '25px',
                                padding: '8px 20px',
                                textTransform: 'none',
                                fontWeight: 600,
                                background: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                },
                                '&:active': {
                                    transform: 'translateY(0px)',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                                    background: 'rgba(255, 255, 255, 0.3)',
                                },
                                '&:focus': {
                                    outline: 'none',
                                    boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.5)',
                                },
                            }}
                        >
                            Dashboard
                        </Button>

                        {/* Add Activity Button - Always visible */}
                        <Button
                            color="inherit"
                            startIcon={<Add />}
                            onClick={handleAddActivity}
                            sx={{
                                borderRadius: '25px',
                                padding: '8px 20px',
                                textTransform: 'none',
                                fontWeight: 600,
                                background: 'linear-gradient(45deg, #10b981, #059669)',
                                border: 'none',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 2px 10px rgba(16, 185, 129, 0.3)',
                                cursor: 'pointer',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #059669, #047857)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)',
                                },
                                '&:active': {
                                    transform: 'translateY(0px)',
                                    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.5)',
                                    background: 'linear-gradient(45deg, #047857, #059669)',
                                },
                                '&:focus': {
                                    outline: 'none',
                                    boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.6)',
                                },
                            }}
                        >
                            Add Activity
                        </Button>

                        {isUserAuthenticated ? (
                            <>
                                {/* User Profile Section */}
                                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                                    {(user?.name || user?.given_name || user?.preferred_username) && (
                                        <Chip
                                            label={`Welcome, ${user?.given_name ||
                                                user?.name?.split(' ')[0] ||
                                                user?.preferred_username ||
                                                'User'
                                                }`}
                                            sx={{
                                                background: 'rgba(255, 255, 255, 0.15)',
                                                color: 'white',
                                                fontWeight: 500,
                                                marginRight: '12px',
                                                backdropFilter: 'blur(10px)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                            }}
                                        />
                                    )}
                                    <IconButton
                                        onClick={handleProfileMenuOpen}
                                        sx={{
                                            padding: '4px',
                                            '&:hover': {
                                                background: 'rgba(255, 255, 255, 0.1)',
                                            },
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                background: 'linear-gradient(45deg, #10b981, #059669)',
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                                boxShadow: '0 2px 10px rgba(16, 185, 129, 0.3)',
                                            }}
                                        >
                                            {(user?.name || user?.given_name || user?.preferred_username || 'U')
                                                .charAt(0).toUpperCase()}
                                        </Avatar>
                                    </IconButton>

                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleMenuClose}
                                        sx={{
                                            '& .MuiPaper-root': {
                                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                                backdropFilter: 'blur(10px)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                borderRadius: '12px',
                                                minWidth: '180px',
                                            },
                                        }}
                                    >
                                        <MenuItem
                                            onClick={handleMenuClose}
                                            sx={{
                                                color: 'white',
                                                '&:hover': { background: 'rgba(255, 255, 255, 0.1)' }
                                            }}
                                        >
                                            <Person sx={{ mr: 1 }} />
                                            Profile
                                        </MenuItem>
                                        <MenuItem
                                            onClick={handleMenuClose}
                                            sx={{
                                                color: 'white',
                                                '&:hover': { background: 'rgba(255, 255, 255, 0.1)' }
                                            }}
                                        >
                                            <Settings sx={{ mr: 1 }} />
                                            Settings
                                        </MenuItem>
                                        <MenuItem
                                            onClick={handleLogout}
                                            sx={{
                                                color: '#ff6b6b',
                                                '&:hover': { background: 'rgba(255, 107, 107, 0.1)' }
                                            }}
                                        >
                                            <Logout sx={{ mr: 1 }} />
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Button
                                    color="inherit"
                                    onClick={handleLogin}
                                    sx={{
                                        borderRadius: '25px',
                                        padding: '10px 25px',
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                        background: 'linear-gradient(45deg, #10b981, #059669)',
                                        border: 'none',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 2px 10px rgba(16, 185, 129, 0.3)',
                                        marginRight: '10px',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #059669, #047857)',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)',
                                        },
                                    }}
                                >
                                    Login
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </Slide>
    );
};

export default Navbar;