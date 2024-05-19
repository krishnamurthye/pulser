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

CREATE TABLE `users` (
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
