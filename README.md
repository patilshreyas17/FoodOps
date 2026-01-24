# 🍽️ FoodOps

FoodOps is a microservices-based food ordering platform built using **Spring Boot**, **Spring Cloud**, **Docker**, and **MySQL**, with a **React frontend** and an **API Gateway**.

---

##  Tech Stack

- **Backend:** Spring Boot, Spring Cloud
- **Gateway:** Spring Cloud Gateway
- **Service Discovery:** Eureka
- **Database:** MySQL
- **Frontend:** React
- **Containerization:** Docker & Docker Compose
- **Authentication:** JWT

---

##  Project Structure

```text
FoodOps/
│
├── Backend/
├── api-gateway/
├── discovery-service/
├── payment-service/
├── frontend/
├── docker-compose.yml
├── env.sample
└── README.md
```
##  Environment Configuration

This project uses environment variables for configuration.

---

### 📄 Files

- **`env.sample`** → Environment variable template (**committed to Git**)
- **`.env`** → Actual environment values (**❌ do NOT commit**)

---

##  Setup Environment Variables

1. Copy the sample file:

```bash
cp env.sample .env
Open `.env` and fill in the required values.
```
##  `env.sample`

```env
# ==============================
# FoodOps Environment Variables
# ==============================

# ---------- Server ----------
SERVER_PORT=5454


# ---------- MySQL ----------
MYSQL_ROOT_PASSWORD=
MYSQL_DATABASE=foodops
MYSQL_USER=
MYSQL_PASSWORD=


# ---------- Spring Boot ----------
# Format: jdbc:mysql://<HOST>:<PORT>/<DB_NAME>
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/foodops?allowPublicKeyRetrieval=true&useSSL=false
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=

SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_SHOW_SQL=true


# ---------- CORS ----------
# Comma-separated list
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000


# ---------- Microservices ----------
DISCOVERY_SERVICE_PORT=8761
GATEWAY_SERVICE_PORT=9090
PAYMENT_SERVICE_PORT=9091


#---------- Razor Api Config ----------
RAZORPAY_API_KEY= razor api key here
RAZORPAY_API_SECRET= razor api secret here
```
##  Important Security Notes

- Commit **`env.sample`**
- Never commit **`.env`**
- Ensure `.env` is listed in `.gitignore`

```gitignore
.env
```
🐳 Running with Docker

From the project root, run:
```
docker compose up --build
```