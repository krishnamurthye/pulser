-- DROP database IF EXISTS pulserdb;

CREATE DATABASE IF NOT EXISTS pulserdb;

use pulserdb;

CREATE TABLE `Authentication` (
  `id1` integer PRIMARY KEY,
  `auth_user_id` integer,
  `created_at` timestamp,
  `updated_at` timestamp,
  `username` varchar(255),
  `password` varchar(255),
  `failedAttempts` integer
);

CREATE TABLE `appUsers` (
  `id` integer PRIMARY KEY,
  `firstName` varchar(255),
  `lastName` varchar(255),
  `role` integer,
  `created_at` timestamp,
  `parentId` integer,
  `userType` integer,
  `phoneNumber` varchar(255),
  `dob` timestamp,
  `isActive` bool,
  `nationality` integer
);

CREATE TABLE `role` (
  `id` integer PRIMARY KEY,
  `roleName` varchar(255),
  `isActive` bool
);

CREATE TABLE `nationality` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `isActive` bool
);

CREATE TABLE `schooling` (
  `id` integer PRIMARY KEY,
  `userId` integer,
  `schoolSystem` integer,
  `grade` integer,
  `schoolId` integer,
  `status` integer,
  `created_at` timestamp,
  `needLevel` integer,
  `additionalDetails` varchar(255)
);

CREATE TABLE `userType` (
  `id` integer PRIMARY KEY,
  `userType` varchar(255),
  `isActive` bool
);

CREATE TABLE `schoolSystem` (
  `id` integer PRIMARY KEY,
  `schoolSystem` varchar(255),
  `isActive` bool
);

CREATE TABLE `schoolName` (
  `id` integer PRIMARY KEY,
  `schoolSystem` integer,
  `schoolName` varchar(255),
  `isActive` bool
);

CREATE TABLE `grade` (
  `id` integer PRIMARY KEY,
  `grade` varchar(255),
  `isActive` bool
);

CREATE TABLE `needLevel` (
  `id` integer PRIMARY KEY,
  `Level` varchar(255),
  `isActive` bool
);

CREATE TABLE `LSADetails` (
  `id` integer PRIMARY KEY,
  `userId` integer,
  `ethnicity` integer,
  `education` integer,
  `specialization` integer
);

CREATE TABLE `ethnicity` (
  `id` integer PRIMARY KEY,
  `ethnicity` varchar(255),
  `isActive` bool
);

CREATE TABLE `education` (
  `id` integer PRIMARY KEY,
  `education` varchar(255),
  `isActive` bool
);

CREATE TABLE `specialization` (
  `id` integer PRIMARY KEY,
  `specialization` varchar(255),
  `isActive` bool
);

CREATE TABLE `las_files` (
  `id` integer PRIMARY KEY,
  `userId` integer,
  `fileType` integer,
  `fileName` varchar(255),
  `fileContent` bool
);

CREATE TABLE `experience` (
  `id` integer PRIMARY KEY,
  `lsa_userId` integer,
  `student_userId` integer,
  `parent_userId` integer,
  `start_date` timestamp,
  `end_date` timestamp,
  `rating` decimal,
  `comments` varchar(255)
);

CREATE TABLE `lsaRequest` (
  `id` integer PRIMARY KEY,
  `raisedBy` integer,
  `age` integer,
  `grade` integer,
  `school` integer,
  `needs` integer,
  `start_date` timestamp,
  `end_date` timestamp,
  `lsaType` integer,
  `experience` integer,
  `comments` varchar(255)
);

CREATE TABLE `experienceLevel` (
  `id` integer PRIMARY KEY,
  `experience` varchar(255),
  `isActive` bool
);

ALTER TABLE `users` ADD FOREIGN KEY (`nationality`) REFERENCES `nationality` (`id`);

ALTER TABLE `schooling` ADD FOREIGN KEY (`schoolSystem`) REFERENCES `schoolSystem` (`id`);

ALTER TABLE `schoolName` ADD FOREIGN KEY (`schoolSystem`) REFERENCES `schoolSystem` (`id`);

ALTER TABLE `schooling` ADD FOREIGN KEY (`schoolId`) REFERENCES `schoolName` (`id`);

ALTER TABLE `schooling` ADD FOREIGN KEY (`grade`) REFERENCES `grade` (`id`);

ALTER TABLE `LSADetails` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `LSADetails` ADD FOREIGN KEY (`ethnicity`) REFERENCES `ethnicity` (`id`);

ALTER TABLE `LSADetails` ADD FOREIGN KEY (`education`) REFERENCES `education` (`id`);

ALTER TABLE `LSADetails` ADD FOREIGN KEY (`specialization`) REFERENCES `specialization` (`id`);

ALTER TABLE `las_files` ADD FOREIGN KEY (`id`) REFERENCES `users` (`id`);

ALTER TABLE `lsaRequest` ADD FOREIGN KEY (`raisedBy`) REFERENCES `users` (`id`);

ALTER TABLE `lsaRequest` ADD FOREIGN KEY (`grade`) REFERENCES `grade` (`id`);

ALTER TABLE `lsaRequest` ADD FOREIGN KEY (`school`) REFERENCES `schoolName` (`id`);

ALTER TABLE `lsaRequest` ADD FOREIGN KEY (`lsaType`) REFERENCES `specialization` (`id`);

ALTER TABLE `lsaRequest` ADD FOREIGN KEY (`experience`) REFERENCES `experienceLevel` (`id`);

ALTER TABLE `schooling` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `Authentication` ADD FOREIGN KEY (`auth_user_id`) REFERENCES `users` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`parentId`) REFERENCES `users` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`role`) REFERENCES `role` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`userType`) REFERENCES `users` (`id`);

ALTER TABLE `schooling` ADD FOREIGN KEY (`needLevel`) REFERENCES `needLevel` (`id`);

-- MySQL dump 10.13  Distrib 8.1.0, for macos13 (arm64)
--
-- Host: localhost    Database: pulsardb
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `children`
--

DROP TABLE IF EXISTS `children`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `children` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `dob` varchar(225) NOT NULL,
  `school` varchar(255) NOT NULL,
  `grade` varchar(255) NOT NULL,
  `needLevel` varchar(255) NOT NULL,
  `age` varchar(255) NOT NULL,
  `additionalInformation` varchar(255) NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`userId`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `children`
--

LOCK TABLES `children` WRITE;
/*!40000 ALTER TABLE `children` DISABLE KEYS */;
/*!40000 ALTER TABLE `children` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(225) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (11,'c1@pulsar.com','c1@pulsar.com','1234567890','$2b$10$ECJyc5QLDn2XuvJ2v7ZkC.JWkRl25LcpXj1xdAMdebhGToq06sphm','Councillor'),(12,'p1@pulsar.com','p1@pulsar.com','1234567890','$2b$10$.yjruFkpDybF3lT8Cb8DY.HArhAWhzqBmsDVIq9fEP46W774CyTYC','Parent'),(13,'l1@pulsar.com','l1@pulsar.com','1234567890','$2b$10$NAAcnAzUbXSXxe7vjTN2cORfm8QEQX2.5G2sUyWAKw/84xQgBrVmy','LSA');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-06 23:23:17
