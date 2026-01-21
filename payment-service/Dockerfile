# Stage 1: Build the JAR
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Optimization: Copy pom.xml first to cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Install curl for future healthchecks or debugging
RUN apk add --no-cache curl

COPY --from=build /app/target/*.jar app.jar

# Spring Boot will automatically use the SERVER_PORT and EUREKA_URL
# passed from your docker-compose.yml environment section.
ENTRYPOINT ["java", "-jar", "app.jar"]