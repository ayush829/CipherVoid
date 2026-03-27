# STAGE 1: Build the application
# We use Maven to compile the code and build the JAR inside the cloud
FROM maven:3.8.5-openjdk-17-slim AS build
WORKDIR /app

# Copy the pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build the JAR file (skipping tests for speed)
RUN mvn clean package -DskipTests

# STAGE 2: Run the application
# We use a lightweight JDK image to keep the final size small
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

# Copy the JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Tell Render which port the app uses
EXPOSE 8080

# Start the application
ENTRYPOINT ["java", "-jar", "app.jar"]
