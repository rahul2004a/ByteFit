# ByteFit - Fitness Tracking Application 🏋️‍♂️

ByteFit is a comprehensive fitness tracking application built with a modern microservices architecture. It allows users to track their fitness activities, receive AI-powered recommendations, and monitor their fitness journey with detailed analytics.

## 🏗️ Architecture Overview

ByteFit follows a microservices architecture pattern with the following components:

### Backend Services (Spring Boot)

- **API Gateway** - Central entry point for all client requests with OAuth2 security
- **Eureka Server** - Service discovery and registration
- **Config Server** - Centralized configuration management
- **User Service** - User management and authentication
- **Activity Service** - Activity tracking and management
- **AI Service** - AI-powered fitness recommendations using Google Gemini API

### Frontend

- **React Application** - Modern responsive web interface built with Vite

### Infrastructure

- **PostgreSQL** - User data persistence
- **MongoDB** - Activity and recommendation data storage
- **RabbitMQ** - Asynchronous communication between services
- **Keycloak** - OAuth2/OIDC authentication provider

## 🚀 Features

### Core Functionality

- **User Registration & Authentication** - Secure OAuth2-based authentication
- **Activity Tracking** - Track various fitness activities (Running, Walking, Cycling)
- **AI Recommendations** - Personalized fitness recommendations based on activity data
- **Activity Analytics** - Detailed insights and performance metrics
- **Real-time Updates** - Asynchronous processing with RabbitMQ

### Technical Features

- **Microservices Architecture** - Scalable and maintainable service separation
- **Service Discovery** - Automatic service registration and discovery with Eureka
- **Centralized Configuration** - External configuration management
- **API Gateway** - Unified API endpoint with routing and security
- **Event-Driven Architecture** - Asynchronous communication between services

## 🛠️ Technology Stack

### Backend

- **Java 24** - Modern Java with latest features
- **Spring Boot 3.4.6** - Application framework
- **Spring Cloud 2024.0.1** - Microservices toolkit
- **Spring Security** - OAuth2 resource server
- **Spring Data JPA** - PostgreSQL data access
- **Spring Data MongoDB** - MongoDB data access
- **Spring AMQP** - RabbitMQ integration
- **Maven** - Build and dependency management

### Frontend

- **React 19.1.0** - UI library
- **Vite** - Build tool and dev server
- **Material-UI** - Component library
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **react-oauth2-code-pkce** - OAuth2 authentication

### Databases

- **PostgreSQL** - Relational database for user data
- **MongoDB** - Document database for activities and recommendations

### Message Broker

- **RabbitMQ** - Asynchronous messaging

### External APIs

- **Google Gemini API** - AI-powered recommendations

## 📋 Prerequisites

Before running the application, ensure you have the following installed:

- **Java 24** or higher
- **Node.js 18+** and npm
- **PostgreSQL** database
- **MongoDB** database
- **RabbitMQ** message broker
- **Keycloak** server (for OAuth2 authentication)
- **Maven 3.6+**

## 🙏 Acknowledgments

- Spring Boot community for excellent documentation
- React and Material-UI teams for great developer experience
- Google Gemini API for AI capabilities
