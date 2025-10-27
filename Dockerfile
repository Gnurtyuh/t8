FROM openjdk:17-alpine

ARG FILE_JAR=target/*.jar

ADD ${FILE_JAR} api-service.jar

ENTRYPOINT ["java","-jar","api-service.jar"]

EXPOSE 8080