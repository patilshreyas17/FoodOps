# 🍽️ FoodOps

A modern microservices-based food ordering platform that connects restaurants with customers through seamless online ordering and management capabilities.

## 🚀 About FoodOps

FoodOps is a comprehensive restaurant management and food delivery platform built with cutting-edge technology. It enables restaurant owners to manage their operations efficiently while providing customers with an intuitive ordering experience.

## ✨ Key Features

### 🏪 For Restaurant Owners
- **Restaurant Management** - Complete control over restaurant profiles and information
- **Menu Management** - Dynamic menu creation with categories, pricing, and availability
- **Order Processing** - Real-time order tracking and management dashboard
- **Analytics & Insights** - Business intelligence and performance metrics
- **Payment Integration** - Secure payment processing with multiple options

### 🛍️ For Customers
- **Restaurant Discovery** - Browse and search restaurants by location and cuisine
- **Interactive Maps** - Find restaurants with Google Maps integration
- **Online Ordering** - Seamless ordering experience with real-time updates
- **Secure Payments** - Multiple payment methods including UPI, cards, and wallets
- **Order Tracking** - Real-time order status from preparation to delivery

## 🏗️ Architecture

FoodOps follows a microservices architecture for scalability and maintainability:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Gateway   │    │  Backend Services│
│   (React)       │◄──►│  (Spring Cloud) │◄──►│  (Spring Boot)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                       ┌─────────────────┐
                       │ Service Discovery│
                       │   (Eureka)      │
                       └─────────────────┘
```

### Core Services
- **Frontend** - React.js with modern UI components
- **API Gateway** - Centralized routing and load balancing
- **Backend Services** - Business logic and data management
- **Discovery Service** - Service registration and discovery
- **Payment Service** - Dedicated payment processing
- **Database** - MySQL for persistent data storage

## 🛠️ Technology Stack

### Frontend
- **React.js** - Modern JavaScript framework
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI** - React component library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **Spring Boot** - Java application framework
- **Spring Cloud** - Microservices framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database access layer
- **Eureka** - Service discovery
- **JWT** - Token-based authentication

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy and load balancing
- **MySQL** - Relational database
- **Railway** - Cloud database hosting

### Integrations
- **Google Maps API** - Location services and mapping
- **Razorpay** - Payment gateway
- **Travel Advisor API** - Restaurant recommendations

## 🌐 Live Application

**FoodOps is live and running at:** [http://www.foodops.shop](http://www.foodops.shop)

## � Payment Integration

Seamlessly integrated with Razorpay for secure payment processing:
- Credit/Debit Cards
- UPI (Unified Payments Interface)
- Net Banking
- Digital Wallets
- Buy Now, Pay Later options

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Encryption** - BCrypt encryption for user passwords
- **CORS Protection** - Cross-origin resource sharing configuration
- **Input Validation** - Comprehensive input sanitization
- **Secure APIs** - Protected endpoints with role-based access


## 🚀 Deployment

The application is deployed on a VPS with:
- **Domain:** www.foodops.shop
- **Database:** Railway MySQL (managed service)
- **Container Orchestration:** Docker Compose
- **Load Balancing:** Nginx reverse proxy


