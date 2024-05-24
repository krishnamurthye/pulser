-- DROP database IF EXISTS pulserdb;

-- CREATE DATABASE IF NOT EXISTS pulserdb;

-- use pulserdb;

-- Create the referenced tables first
CREATE TABLE IF NOT EXISTS `role` (
  `id` INTEGER PRIMARY KEY,
  `roleName` VARCHAR(255),
  `isActive` BOOLEAN
);

CREATE TABLE IF NOT EXISTS `nationality` (
  `id` INTEGER PRIMARY KEY,
  `name` VARCHAR(255),
  `isActive` BOOLEAN
);

CREATE TABLE IF NOT EXISTS `needLevel` (
  `id` INTEGER PRIMARY KEY,
  `Level` VARCHAR(255),
  `isActive` BOOLEAN
);

CREATE TABLE IF NOT EXISTS `schoolSystem` (
  `id` INTEGER PRIMARY KEY,
  `schoolSystem` VARCHAR(255),
  `isActive` BOOLEAN
);

CREATE TABLE IF NOT EXISTS `ethnicity` (
  `id` INTEGER PRIMARY KEY,
  `ethnicity` VARCHAR(255),
  `isActive` BOOLEAN
);

CREATE TABLE IF NOT EXISTS `education` (
  `id` INTEGER PRIMARY KEY,
  `education` VARCHAR(255),
  `isActive` BOOLEAN
);

CREATE TABLE IF NOT EXISTS `specialization` (
  `id` INTEGER PRIMARY KEY,
  `specialization` VARCHAR(255),
  `isActive` BOOLEAN
);


CREATE TABLE IF NOT EXISTS `schoolName` (
  `id` INTEGER PRIMARY KEY,
  `schoolSystem` INTEGER,
  `schoolName` VARCHAR(255),
  `isActive` BOOLEAN,
  FOREIGN KEY (`schoolSystem`) REFERENCES `schoolSystem`(`id`)
);

-- Create the dependent tables after the referenced tables
CREATE TABLE IF NOT EXISTS `users` (
  `id` INTEGER PRIMARY KEY,
  `firstName` VARCHAR(255),
  `lastName` VARCHAR(255),
  `role` INTEGER,
  `created_at` TIMESTAMP,
  `parentId` INTEGER,
  `userType` INTEGER,
  `phoneNumber` VARCHAR(255),
  `dob` TIMESTAMP,
  `isActive` BOOLEAN,
  `nationality` INTEGER,
  FOREIGN KEY (`role`) REFERENCES `role`(`id`),
  FOREIGN KEY (`nationality`) REFERENCES `nationality`(`id`)
);

CREATE TABLE IF NOT EXISTS `Authentication` (
  `id1` INTEGER PRIMARY KEY,
  `auth_user_id` INTEGER,
  `created_at` TIMESTAMP,
  `updated_at` TIMESTAMP,
  `username` VARCHAR(255),
  `password` VARCHAR(255),
  `failedAttempts` INTEGER
);

CREATE TABLE IF NOT EXISTS `schooling` (
  `id` INTEGER PRIMARY KEY,
  `userId` INTEGER,
  `schoolSystem` INTEGER,
  `grade` INTEGER,
  `schoolId` INTEGER,
  `status` INTEGER,
  `created_at` TIMESTAMP,
  `needLevel` INTEGER,
  `additionalDetails` VARCHAR(255),
  FOREIGN KEY (`needLevel`) REFERENCES `needLevel`(`id`),
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`),
  FOREIGN KEY (`schoolSystem`) REFERENCES `schoolSystem`(`id`),
  FOREIGN KEY (`schoolId`) REFERENCES `schoolName`(`id`)
);

CREATE TABLE IF NOT EXISTS `userType` (
  `id` INTEGER PRIMARY KEY,
  `userType` VARCHAR(255),
  `isActive` BOOLEAN
);

CREATE TABLE IF NOT EXISTS `grade` (
  `id` INTEGER PRIMARY KEY,
  `grade` VARCHAR(255),
  `isActive` BOOLEAN
);

CREATE TABLE IF NOT EXISTS `LSADetails` (
  `id` INTEGER PRIMARY KEY,
  `userId` INTEGER,
  `ethnicity` INTEGER,
  `education` INTEGER,
  `specialization` INTEGER,
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`),
  FOREIGN KEY (`ethnicity`) REFERENCES `ethnicity`(`id`),
  FOREIGN KEY (`education`) REFERENCES `education`(`id`),
  FOREIGN KEY (`specialization`) REFERENCES `specialization`(`id`)
);
