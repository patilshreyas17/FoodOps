# 🍽️ FoodOps

FoodOps is a microservices-based food ordering platform built using **Spring Boot**, **Spring Cloud**, **Docker**, and **MySQL**, with a **React frontend** and an **API Gateway**.

---

##  Tech Stack

- **Backend:** Spring Boot, Spring Cloud
- **Gateway:** Spring Cloud Gateway
- **Service Discovery:** Eureka
- **Database:** MySQL
- **Frontend:** React, Vite, Material-UI, Tailwind CSS
- **Containerization:** Docker & Docker Compose
- **Authentication:** JWT
- **Maps Integration:** Google Maps API
- **Payment:** Razorpay

---

##  Project Structure

```text
FoodOps/
│
├── Backend/                    # Main Spring Boot application
├── api-gateway/               # Spring Cloud Gateway
├── discovery-service/        # Eureka Service Discovery
├── payment-service/          # Payment microservice
├── Frontend/                  # React frontend with MapTravel integration
├── docker-compose.yml         # Docker orchestration
├── .env.example              # Environment variable template
├── .env                      # Actual environment values (❌ do NOT commit)
└── README.md
```

---

##  Environment Configuration

This project uses environment variables for configuration. All environment variables are managed at the root level and injected into containers via Docker Compose.

---

### 📄 Files

- **`.env.example`** → Environment variable template (**committed to Git**)
- **`.env`** → Actual environment values (**❌ do NOT commit**)

---

##  Setup Environment Variables

1. Copy the sample file:

```bash
cp .env.example .env
```

2. Open `.env` and fill in the required values.

---

##  Environment Variables

```env
# ==============================
# FoodOps Environment Variables
# ==============================

# ---------- Server ----------
SERVER_PORT=5454

# ---------- MySQL ----------
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=foodops
MYSQL_USER=user
MYSQL_PASSWORD=password

# ---------- Spring Boot ----------
SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/foodops?allowPublicKeyRetrieval=true&useSSL=false
SPRING_DATASOURCE_USERNAME=user
SPRING_DATASOURCE_PASSWORD=password
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_SHOW_SQL=true

# ---------- CORS ----------
CORS_ORIGINS=http://localhost:3000,http://192.168.1.38:3000,http://192.168.1.103:3000

# ---------- Email ----------
EMAIL=your-email@gmail.com
EMAIL_APP_PASSWORD=your-app-password

# ---------- Microservices ----------
DISCOVERY_SERVICE_PORT=8761
GATEWAY_SERVICE_PORT=9090
PAYMENT_SERVICE_PORT=9091

# ---------- Payment Gateway ----------
RAZORPAY_API_KEY=your-razorpay-key
RAZORPAY_API_SECRET=your-razorpay-secret

# ---------- Frontend Environment Variables ----------
VITE_API_URL=/proxy
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
VITE_RAPID_API_KEY=your-rapid-api-key
```

---

##  Important Security Notes

- ✅ Commit **`.env.example`**
- ❌ Never commit **`.env`**
- ✅ Ensure `.env` is listed in `.gitignore`
- ✅ All sensitive files are properly ignored

---

##  🐳 Running with Docker

From the project root, run:

```bash
docker compose up --build
```

---

##  🌐 Application URLs

After starting the services:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5454
- **API Gateway:** http://localhost:9090
- **Discovery Service:** http://localhost:8761
- **Payment Service:** http://localhost:9091

---

##  🗺️ MapTravel Integration

The frontend includes integrated MapTravel functionality with:
- **Google Maps API** for restaurant locations
- **Travel Advisor API** for place recommendations
- **Interactive map** with restaurant markers
- **Search and filter** capabilities

**Required API Keys:**
- `VITE_GOOGLE_MAPS_API_KEY`: Get from [Google Cloud Console](https://console.cloud.google.com/)
- `VITE_RAPID_API_KEY`: Get from [RapidAPI](https://rapidapi.com/)

---

##  � Features

- **Restaurant Management:** Add, edit, and manage restaurants
- **Menu Management:** Dynamic menu items with categories
- **Order Processing:** Complete order lifecycle
- **Payment Integration:** Razorpay payment gateway
- **User Authentication:** JWT-based authentication
- **Interactive Maps:** Find restaurants with map integration
- **Admin Dashboard:** Comprehensive admin interface
- **Customer Interface:** User-friendly ordering experience

---

##  🔧 Development

### Frontend Development
```bash
cd Frontend
npm install
npm run dev
```

### Backend Development
```bash
Open Sts or intellij idea and import all microservices as maven projects/Modules
```