# Stage 1: Build the JAR using Maven
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app
# Copy only the pom first to cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline
# Copy source and build
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Install curl so the healthcheck in your docker-compose works
RUN apk add --no-cache curl

# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Spring Boot will automatically use the SERVER_PORT env var from your compose file
ENTRYPOINT ["java", "-jar", "app.jar"]