FROM openjdk:20
ENV ENVIRONMENT=prod
LABEL maintainer="gif-manager@gifmanager.org"
EXPOSE 8080
ADD backend/target/gifmanager.jar app.jar
CMD [ "sh", "-c", "java -jar /app.jar" ]