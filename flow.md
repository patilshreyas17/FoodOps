# FoodOps Project Flow & Architecture Documentation

## 🍽️ Project Overview

FoodOps is a comprehensive microservices-based food ordering platform built with modern technologies. The system enables customers to browse restaurants, place orders, and make payments while providing restaurant owners and administrators with powerful management tools.

## 🏗️ Technology Stack

### Backend Technologies
- **Spring Boot 3.4.1** - Main application framework
- **Spring Cloud 2024.0.0** - Microservices orchestration
- **Spring Security** - Authentication and authorization
- **MySQL 8.1** - Primary database
- **JWT** - Token-based authentication
- **Razorpay** - Payment gateway integration
- **Eureka** - Service discovery
- **Spring Cloud Gateway** - API Gateway

### Frontend Technologies
- **React 18.2.0** - UI framework
- **Material-UI 5.14.6** - UI component library
- **Redux** - State management
- **React Router** - Navigation
- **Vite** - Build tool
- **Tailwind CSS** - Styling

### Infrastructure
- **Docker & Docker Compose** - Containerization
- **Nginx** - Reverse proxy (frontend)

## 🏛️ System Architecture

### Microservices Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │  API Gateway    │    │ Discovery       │
│   (React)       │◄──►│  (Port 9090)    │◄──►│ Service         │
│   Port 3000     │    │                 │    │ (Port 8761)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Main Backend  │    │ Payment Service│    │   MySQL         │
│   (Port 5454)   │    │   (Port 9091)  │    │   (Port 3307)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Project Structure & File Responsibilities

### Root Level Files

#### 📄 `docker-compose.yml`
**Responsibility**: Orchestrates all microservices and infrastructure
- Defines service dependencies
- Manages environment variables
- Sets up networking between containers
- Configures health checks

#### 📄 `.env.example`
**Responsibility**: Template for environment variables
- Database configuration
- API keys and secrets
- Service ports
- CORS settings

#### 📄 `README.md`
**Responsibility**: Project documentation and setup instructions

---

## 🔧 Backend Services

### Main Backend Service (`/Backend`)

#### 📱 Application Entry Point
- **`FoodOpsApplication.java`** - Main Spring Boot application class with Eureka client enablement

#### ⚙️ Configuration Layer (`/config`)
- **`AppConfig.java`** - Security configuration, CORS setup, JWT validation
- **`DataInitializer.java`** - Database seeding with default users (admin, customer, restaurant owner)
- **`JwtProvider.java`** - JWT token generation and validation
- **`JwtConstant.java`** - JWT-related constants (secret key, header names)
- **`JwtTokenValidator.java`** - JWT token validation filter for security
- **`WebClientConfig.java`** - WebClient configuration for inter-service communication

#### 🗄️ Model Layer (`/model`)
- **`User.java`** - User entity with roles, authentication, and profile data
- **`Restaurant.java`** - Restaurant entity with owner, menu, and operational data
- **`Order.java`** - Order entity with customer, restaurant, and payment relationships
- **`Food.java`** - Menu item entity with pricing, availability, and ingredients
- **`OrderItem.java`** - Individual items within an order
- **`Cart.java`** - Shopping cart entity for customer orders
- **`CartItem.java`** - Individual items in shopping cart
- **`Category.java`** - Food categorization system
- **`Payment.java`** - Payment transaction records
- **`Review.java`** - Customer review and rating system
- **`Address.java`** - User address management
- **`ContactInformation.java`** - Restaurant contact details
- **`IngredientsItem.java`** - Food ingredient tracking
- **`IngredientCategory.java`** - Ingredient categorization
- **`Coupon.java`** - Discount and promotion system
- **`Events.java`** - Restaurant events and promotions
- **`Notification.java`** - User notification system
- **`PasswordResetToken.java`** - Password reset functionality

#### 🎭 Domain Layer (`/domain`)
- **`USER_ROLE.java`** - User role enumeration (CUSTOMER, RESTAURANT_OWNER, RESTAURANT_MANAGER, ADMIN)
- **`OrderStatus.java`** - Order status enumeration (RECEIVED, PENDING, READY_FOR_PICKUP, OUT_FOR_DELIVERY, DELIVERED, CANCELLED)

#### 💾 Repository Layer (`/repository`)
- **`UserRepository.java`** - User data access operations
- **`RestaurantRepository.java`** - Restaurant data access operations
- **`OrderRepository.java`** - Order data access operations
- **`foodRepository.java`** - Menu item data access operations
- **`CartRepository.java`** - Shopping cart data access operations
- **`CategoryRepository.java`** - Food category data access operations
- **`PaymentRepository.java`** - Payment transaction data access
- **`ReviewRepository.java`** - Customer review data access
- **And other specialized repositories...**

#### 🎮 Controller Layer (`/controller`)
- **`AuthController.java`** - Authentication endpoints (signup, signin, password reset)
- **`RestaurantController.java`** - Public restaurant operations (search, view, favorites)
- **`OrderController.java`** - Customer order management
- **`CartController.java`** - Shopping cart operations
- **`AdminRestaurantController.java`** - Restaurant owner operations
- **`AdminMenuItemController.java`** - Menu item management for restaurant owners
- **`AdminOrderController.java`** - Order management for restaurant owners
- **`SuperAdminController.java`** - Platform administration
- **`SupperAdminController.java`** - Alternative admin controller
- **`SuperAdminRestaurantController.java`** - Restaurant approval and management
- **`AnalyticsController.java`** - Business analytics and reporting
- **`CategoryController.java`** - Food category management
- **`ReviewController.java`** - Review and rating management
- **`IngredientsController.java`** - Ingredient management
- **`EventController.java`** - Restaurant event management
- **`NotificationController.java`** - User notification system
- **`ResetPasswordController.java`** - Password reset operations
- **`HomeController.java`** - Home page and general endpoints
- **`MenuItemController.java`** - Public menu item operations

#### 🛠️ Service Layer (`/service`)
- **Business logic implementation for all controllers**
- **Transaction management**
- **Data validation and transformation**
- **Integration with external services**

#### ❗ Exception Layer (`/Exception`)
- **Custom exception classes for different business scenarios**
- **`UserException.java`** - User-related errors
- **`RestaurantException.java`** - Restaurant-related errors
- **`OrderException.java`** - Order-related errors
- **`FoodException.java`** - Food item-related errors
- **`CartException.java`** - Shopping cart errors
- **`ReviewException.java`** - Review system errors

---

### API Gateway Service (`/api-gateway`)

#### 📱 Application Entry Point
- **`ApiGetwayApplication.java`** - Gateway service main application

#### ⚙️ Configuration
- **`GatewayConfig.java`** - Route configuration and load balancing
- **`AppConfig.java`** - Gateway security configuration

**Responsibility**: 
- Route requests to appropriate microservices
- Load balancing across service instances
- Cross-cutting concerns (logging, monitoring)
- API versioning and security

---

### Discovery Service (`/discovery-service`)

#### 📱 Application Entry Point
- **`DiscoveryServiceApplication.java`** - Eureka server main application

**Responsibility**:
- Service registration and discovery
- Health monitoring of services
- Load balancing coordination

---

### Payment Service (`/payment-service`)

**Responsibility**:
- Razorpay payment integration
- Payment processing and verification
- Transaction logging
- Refund processing

---

## 🎨 Frontend Application (`/Frontend`)

### 📱 Application Structure
- **`App.jsx`** - Main application component with theme and routing setup
- **`index.html`** - HTML entry point
- **`package.json`** - Dependencies and scripts configuration

### 🛣️ Routing (`/Routers`)
- **`Routers.jsx`** - Main routing configuration
- **`AdminRouters.jsx`** - Restaurant owner routes
- **`CustomerRoutes.jsx`** - Customer-facing routes

### 🎨 UI Components (`/components`)
- **GlobalSpinner.jsx** - Loading indicator
- **Reusable UI components**

### 🏪 Customer Interface (`/customers`)
- **Restaurant browsing and search**
- **Menu viewing and ordering**
- **Cart management**
- **Order tracking**
- **Payment processing**
- **Review and rating system**

### 🍽️ Restaurant Owner Interface (`/Admin`)
- **Restaurant management**
- **Menu item management**
- **Order processing**
- **Analytics and reporting**
- **Customer management**

### 👑 Super Admin Interface (`/SuperAdmin`)
- **Platform-wide user management**
- **Restaurant approval system**
- **System analytics**
- **Platform configuration**

### 🔄 State Management (`/State`)
- **Redux store configuration**
- **Action creators for different modules**
- **Reducers for state management**
- **Authentication state**
- **Cart state management**
- **Restaurant state management**
- **Order state management**

### 🎨 Styling (`/theme`)
- **Material-UI theme configuration**
- **Dark theme implementation**
- **Custom styling**

### 🔧 Configuration (`/config`)
- **API configuration**
- **Utility functions**

---

## 🔄 Data Flow & Business Logic

### User Authentication Flow
1. User registers/logs in via `AuthController`
2. JWT token generated by `JwtProvider`
3. Token validated by `JwtTokenValidator` filter
4. User context established in security context

### Restaurant Management Flow
1. Restaurant owner registers via `AuthController`
2. Creates restaurant via `AdminRestaurantController`
3. Restaurant goes to Super Admin for approval
4. Once approved, owner can manage menu and orders

### Order Processing Flow
1. Customer browses restaurants via `RestaurantController`
2. Adds items to cart via `CartController`
3. Places order via `OrderController`
4. Payment processed via Payment Service
5. Order status updated through various stages

### Microservices Communication
- Services register with Eureka Discovery Service
- API Gateway routes requests to appropriate services
- Inter-service communication via WebClient with load balancing

---

## 🗄️ Database Schema

### Core Entities Relationships
```
User (1) ──────── (N) Order
User (1) ──────── (N) Cart
User (1) ──────── (1) Restaurant (for owners)
Restaurant (1) ── (N) Food
Restaurant (1) ── (N) Order
Order (1) ─────── (N) OrderItem
Food (1) ──────── (N) OrderItem
User (1) ──────── (N) Review
Restaurant (1) ── (N) Review
```

---

## 🔐 Security Implementation

### Authentication
- JWT-based stateless authentication
- Role-based access control (RBAC)
- Password encryption with BCrypt

### Authorization
- Customer endpoints: ROLE_CUSTOMER
- Restaurant owner endpoints: ROLE_RESTAURANT_OWNER
- Admin endpoints: ROLE_ADMIN
- Super admin endpoints: ROLE_ADMIN with additional privileges

### CORS Configuration
- Configurable allowed origins
- Support for multiple frontend URLs
- Proper header handling

---

## 🚀 Deployment Architecture

### Docker Containerization
- Each service runs in separate container
- Docker Compose orchestrates multi-container deployment
- Environment variables injected at runtime
- Health checks ensure service availability

### Service Ports
- Frontend: 3000
- Main Backend: 5454
- API Gateway: 9090
- Discovery Service: 8761
- Payment Service: 9091
- MySQL: 3307

---

## 📊 Key Features

### Customer Features
- Restaurant search and filtering
- Menu browsing with detailed information
- Shopping cart management
- Secure payment processing
- Order tracking
- Review and rating system
- Favorite restaurants

### Restaurant Owner Features
- Restaurant registration and management
- Menu item management
- Order processing and fulfillment
- Business analytics
- Customer management
- Promotion and event management

### Super Admin Features
- User management across the platform
- Restaurant approval workflow
- System-wide analytics
- Platform configuration
- Content moderation

---

## 🔧 Development & Maintenance

### Environment Setup
1. Copy `.env.example` to `.env`
2. Configure database and API keys
3. Run `docker compose up --build`
4. Access services via configured ports

### Code Quality
- Spring Boot best practices
- React component architecture
- RESTful API design
- Proper error handling
- Comprehensive logging

### Monitoring & Observability
- Spring Boot Actuator endpoints
- Eureka service health monitoring
- Application logging
- Performance metrics

---

## 🔄 API Endpoints Summary

### Authentication (`/auth`)
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login
- `POST /auth/reset-password-request` - Request password reset
- `POST /auth/reset-password` - Complete password reset

### Restaurants (`/api/restaurants`)
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/search` - Search restaurants
- `GET /api/restaurants/{id}` - Get restaurant details
- `PUT /api/restaurants/{id}/add-favorites` - Add to favorites

### Orders (`/api/order`)
- `POST /api/order` - Create order
- `GET /api/order/user` - Get user orders

### Admin Operations (`/api/admin/*`)
- Restaurant management endpoints
- Menu item management
- Order processing
- Analytics access

---

This documentation provides a comprehensive overview of the FoodOps platform architecture, file responsibilities, and system flow. Each component plays a crucial role in delivering a complete food ordering experience.
