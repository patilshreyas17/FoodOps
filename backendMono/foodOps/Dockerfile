# ---------- BUILD STAGE ----------
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code and build
COPY src ./src
RUN mvn clean package -DskipTests

# ---------- RUNTIME STAGE ----------
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port
ARG SERVER_PORT=5454
EXPOSE ${SERVER_PORT}

# Run Spring Boot app
ENTRYPOINT ["sh", "-c", "java -jar app.jar"]
