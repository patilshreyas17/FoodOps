# Stage 1: Build the JAR
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app
# Cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline
# Build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Install curl for the healthcheck defined in docker-compose
RUN apk add --no-cache curl

# Copy the built jar from the builder stage
COPY --from=build /app/target/*.jar app.jar

# Spring Boot will use the SERVER_PORT environment variable from Docker Compose
ENTRYPOINT ["java", "-jar", "app.jar"]