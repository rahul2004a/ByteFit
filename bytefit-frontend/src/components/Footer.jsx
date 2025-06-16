import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Link,
    IconButton,
    Stack,
    Divider,
} from '@mui/material';
import {
    FitnessCenter,
    LinkedIn,
    GitHub,
    Twitter,
    ArrowUpward,
} from '@mui/icons-material';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const footerLinks = {
        product: [
            { name: 'Features', href: '#features' },
            { name: 'Dashboard', href: '/dashboard' },
        ],
        company: [
            { name: 'About', href: '#about' },
            { name: 'Contact', href: '#contact' },
        ],
    };

    const socialLinks = [
        { icon: <GitHub />, href: 'https://github.com', label: 'GitHub' },
        { icon: <LinkedIn />, href: 'https://linkedin.com', label: 'LinkedIn' },
        { icon: <Twitter />, href: 'https://twitter.com', label: 'Twitter' },
    ];

    return (
        <Box
            component="footer"
            sx={{
                position: 'relative',
                background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                color: 'white',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `
            radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
          `,
                    zIndex: 0,
                }
            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                {/* Main Footer Content */}
                <Box sx={{ py: 4 }}>
                    <Grid container spacing={4} alignItems="center">
                        {/* Brand Section */}
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, md: 0 } }}>
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
                                    <FitnessCenter sx={{ color: 'white', fontSize: '1.3rem' }} />
                                </Box>
                                <Box>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 800,
                                            background: 'linear-gradient(45deg, #10b981, #059669)',
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            fontSize: '1.4rem',
                                            mb: 0.5,
                                        }}
                                    >
                                        ByteFit
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            fontSize: '0.85rem',
                                        }}
                                    >
                                        AI-powered fitness tracking
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Quick Links */}
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, alignItems: 'center', gap: 3 }}>
                                <Stack direction="row" spacing={3}>
                                    {footerLinks.product.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.href}
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                textDecoration: 'none',
                                                fontSize: '0.85rem',
                                                transition: 'color 0.3s ease',
                                                '&:hover': {
                                                    color: '#10b981',
                                                },
                                            }}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                    {footerLinks.company.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.href}
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                textDecoration: 'none',
                                                fontSize: '0.85rem',
                                                transition: 'color 0.3s ease',
                                                '&:hover': {
                                                    color: '#10b981',
                                                },
                                            }}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                {/* Bottom Footer */}
                <Box
                    sx={{
                        py: 2,
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 1.5,
                    }}
                >
                    {/* Copyright */}
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontSize: '0.8rem',
                        }}
                    >
                        © 2025 ByteFit. All rights reserved.
                    </Typography>

                    {/* Social Links */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {socialLinks.map((social, index) => (
                            <IconButton
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                size="small"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        color: '#10b981',
                                        transform: 'translateY(-1px)',
                                    },
                                }}
                            >
                                {social.icon}
                            </IconButton>
                        ))}

                        {/* Back to Top Button */}
                        <IconButton
                            onClick={scrollToTop}
                            aria-label="Back to top"
                            size="small"
                            sx={{
                                ml: 1,
                                background: 'linear-gradient(45deg, #10b981, #059669)',
                                color: 'white',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #059669, #047857)',
                                    transform: 'translateY(-1px)',
                                },
                            }}
                        >
                            <ArrowUpward fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
