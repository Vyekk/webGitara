-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql18.mydevil.net
-- Generation Time: Lip 07, 2025 at 01:44 PM
-- Wersja serwera: 8.0.39
-- Wersja PHP: 8.1.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `m1349_webGitara`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `comments`
--

CREATE TABLE `comments` (
  `idComment` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `idSong` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `idUser` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`idComment`, `idSong`, `idUser`, `content`, `created_at`) VALUES
('4abc59d3-8b2a-4b28-a2f8-ec37969b808d', '10e997a9-91c9-4db6-9385-3e881b34691c', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'Nice!', '2025-06-30 21:56:48'),
('ec486573-d101-4964-9ff6-e5d8b70ae4bb', '7c06f948-2b02-441d-90fa-34884f4e57a9', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'Bardzo się starałem, aby zrobić ten utwór jak najlepiej!', '2025-06-29 15:39:54');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `favourites`
--

CREATE TABLE `favourites` (
  `idFavourite` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `idUser` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `idSong` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favourites`
--

INSERT INTO `favourites` (`idFavourite`, `idUser`, `idSong`, `created_at`) VALUES
('394f49be-1bd4-4573-b0dd-50edafa3b052', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '7c06f948-2b02-441d-90fa-34884f4e57a9', '2025-07-03 22:47:12'),
('97bdf181-8b41-4ebc-9e89-145786617a54', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '10e997a9-91c9-4db6-9385-3e881b34691c', '2025-07-03 22:47:12');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `lastplayedsongs`
--

CREATE TABLE `lastplayedsongs` (
  `idLastPlayedSong` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `idUser` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `idSong` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lastPlayed` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lastplayedsongs`
--

INSERT INTO `lastplayedsongs` (`idLastPlayedSong`, `idUser`, `idSong`, `lastPlayed`) VALUES
('0ab39583-5643-47d6-9770-7c23f9261af7', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', 'e0ae281d-d2f7-4a73-a8f3-d3dff8001730', '2025-07-06 16:37:20'),
('1ace9a06-b3e7-400f-8db0-a024dc5b7665', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '7c06f948-2b02-441d-90fa-34884f4e57a9', '2025-06-30 21:45:27'),
('2eab7b13-db7f-4b5c-92ad-e07e1efa462c', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '7c06f948-2b02-441d-90fa-34884f4e57a9', '2025-07-06 16:36:00'),
('2facb9d5-4d14-49ec-ba0c-7abbccd92ea6', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '7120755b-671b-41b7-9682-0e48baf47d1c', '2025-06-30 21:54:59'),
('2fead4f9-2311-4235-9999-3b65632ee458', '535f57c9-2888-49a1-a120-3c5b34803238', '8096b47b-1138-4f3d-8c28-08333510b927', '2025-07-07 01:18:10'),
('645a3657-ce61-4f85-8277-e0e6318878c4', '535f57c9-2888-49a1-a120-3c5b34803238', '234668d2-69ad-40b7-865b-26b4c0a7fcb5', '2025-07-07 01:22:47'),
('76fb3fff-8234-4006-bc25-e6ce80c5e19b', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '57c3ba90-4e9a-4062-97fc-427ff0133958', '2025-07-04 02:23:37'),
('7db33399-06ea-4f6c-864d-c77be1ba4269', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '10e997a9-91c9-4db6-9385-3e881b34691c', '2025-06-30 21:56:42'),
('b1116e4c-8b9b-45d1-b4cd-452307da7818', '535f57c9-2888-49a1-a120-3c5b34803238', '7c06f948-2b02-441d-90fa-34884f4e57a9', '2025-07-06 16:02:16'),
('c29885e4-ce07-406a-bf86-934fa04f92e4', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '10e997a9-91c9-4db6-9385-3e881b34691c', '2025-07-03 22:58:38'),
('cc9a64d7-bfea-4627-88f7-bd97ed32dec3', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '7120755b-671b-41b7-9682-0e48baf47d1c', '2025-07-04 01:42:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ratings`
--

CREATE TABLE `ratings` (
  `idRating` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `idUser` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `idSong` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rating` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`idRating`, `idUser`, `idSong`, `rating`) VALUES
('0767a5e4-bdeb-4dd2-beaa-dfd9b047be4e', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '7120755b-671b-41b7-9682-0e48baf47d1c', 4),
('dba6d6a2-f040-4b9d-a4a8-46aa33e12445', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '10e997a9-91c9-4db6-9385-3e881b34691c', 4),
('f8019069-43d4-4702-983e-253e02a63ebf', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '7c06f948-2b02-441d-90fa-34884f4e57a9', 5);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `roles`
--

CREATE TABLE `roles` (
  `idRole` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`idRole`, `name`) VALUES
('35a6d58c-1f54-4137-9c0a-2d6d4c030632', 'admin'),
('51d021c2-5c03-406a-8f47-f10cdc93794b', 'user'),
('55a82b5a-a9ed-4b80-b993-c83ee3c38878', 'moderator');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `songs`
--

CREATE TABLE `songs` (
  `idSong` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `idUser` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `default_bpm` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tablature` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `deleted_by_idUser` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `average_rating` decimal(3,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`idSong`, `idUser`, `title`, `default_bpm`, `created_at`, `updated_at`, `tablature`, `deleted_by_idUser`, `average_rating`) VALUES
('10e997a9-91c9-4db6-9385-3e881b34691c', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'Nowy utwór', 120, '2025-06-30 21:47:06', '2025-06-30 21:47:06', '[[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":1,\"duration\":\"4n\"}]]', NULL, 0.00),
('234668d2-69ad-40b7-865b-26b4c0a7fcb5', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', 'niechbedziedobrze', 120, '2025-07-04 02:30:56', '2025-07-07 01:23:17', '[[{\"rest\":true,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"2n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}]]', NULL, 0.00),
('57c3ba90-4e9a-4062-97fc-427ff0133958', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', 'Straszne', 120, '2025-07-04 02:17:06', '2025-07-04 02:23:44', '[[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"1n\"}],[{\"guitarString\":5,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":2,\"duration\":\"4n\"}]]', NULL, 0.00),
('7120755b-671b-41b7-9682-0e48baf47d1c', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'Story', 120, '2025-06-29 15:45:55', '2025-07-04 01:41:39', '[[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":4,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":6,\"duration\":\"1n\"}],[{\"guitarString\":2,\"guitarFret\":8,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"2n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"2n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":0,\"duration\":\"4n\"},{\"guitarString\":4,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":1,\"guitarFret\":0,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":8,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":9,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"1n\"}],[{\"rest\":true,\"duration\":\"1n\"}],[{\"guitarString\":3,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}]]', NULL, 0.00),
('7c06f948-2b02-441d-90fa-34884f4e57a9', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'Testowy utwór użytkownika', 120, '2025-06-29 15:37:16', '2025-06-29 15:37:16', '[[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":7,\"duration\":\"4n\"}]]', NULL, 0.00),
('8096b47b-1138-4f3d-8c28-08333510b927', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', 'terazbedziedobrze', 120, '2025-07-04 02:34:24', '2025-07-07 01:22:09', '[[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}]]', NULL, 0.00),
('e0ae281d-d2f7-4a73-a8f3-d3dff8001730', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', 'Happy Birthday', 120, '2025-07-03 22:49:21', '2025-07-04 02:27:49', '[[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":2,\"duration\":\"2n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"2n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":0,\"duration\":\"2n\"}],[{\"guitarString\":4,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"2n\"}]]', NULL, 0.00),
('e417aab6-ad5a-49d3-98bb-53623c32f67b', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', 'heh', 120, '2025-07-04 02:28:00', '2025-07-04 02:28:00', '[[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"},{\"guitarString\":2,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"},{\"guitarString\":2,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":5,\"duration\":\"4n\"},{\"guitarString\":2,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":2,\"duration\":\"2n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"2n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":0,\"duration\":\"2n\"}],[{\"guitarString\":4,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"2n\"}]]', NULL, 0.00);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `songs_history`
--

CREATE TABLE `songs_history` (
  `idHistory` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `idSong` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `version_number` int NOT NULL,
  `tablature` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `edited_by_idUser` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `edited_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `songs_history`
--

INSERT INTO `songs_history` (`idHistory`, `idSong`, `version_number`, `tablature`, `edited_by_idUser`, `edited_at`) VALUES
('1e56f778-db0b-4371-8cf6-a200f522eae0', '8096b47b-1138-4f3d-8c28-08333510b927', 1, '[[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}]]', '535f57c9-2888-49a1-a120-3c5b34803238', '2025-07-07 01:21:48'),
('66671433-4b8d-4749-967e-e65b44f76c89', '234668d2-69ad-40b7-865b-26b4c0a7fcb5', 1, '[[{\"rest\":true,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"2n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}]]', '535f57c9-2888-49a1-a120-3c5b34803238', '2025-07-07 01:22:57'),
('90ab98ad-e257-49e4-9363-512bc449a59b', '234668d2-69ad-40b7-865b-26b4c0a7fcb5', 2, '[[{\"rest\":true,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"2n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"4n\"}]]', '535f57c9-2888-49a1-a120-3c5b34803238', '2025-07-07 01:23:17'),
('a53ecf7f-861f-446e-8a93-997c2d970a50', '8096b47b-1138-4f3d-8c28-08333510b927', 2, '[[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":1,\"duration\":\"4n\"}]]', '535f57c9-2888-49a1-a120-3c5b34803238', '2025-07-07 01:22:09');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `idUser` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password_hash` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `isActivated` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `average_published_song_rating` decimal(3,2) NOT NULL,
  `number_of_ratings_received` int NOT NULL,
  `activationToken` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`idUser`, `username`, `password_hash`, `email`, `isActivated`, `created_at`, `average_published_song_rating`, `number_of_ratings_received`, `activationToken`) VALUES
('22500f9a-992e-4250-845a-d7ac5e460843', 'kolejny1', '$2b$10$jUNMktWYrJT8m3tR4zqUFOMek.xmfUbEnadFaTRDIh8LRg/pPIr6C', 'kolejny1@tlen.pl', 1, '2025-06-30 21:39:29', 0.00, 0, NULL),
('535f57c9-2888-49a1-a120-3c5b34803238', 'moderator', '$2b$10$8S63CcQXqhUYO4E5Px8uB.fXOpECxtKkG2GB4PNCtbriy3uJUeRi.', 'strange2409@gmail.com', 1, '2025-07-06 16:01:19', 0.00, 0, NULL),
('b58597f1-20a8-4e91-ad5f-0e79a8f220af', 'admin', '$2b$10$ulSzO78yKbZiV7uI4UhUPOLSJodftcQK/x5V.Qx2Dm4BMuJrBzO3O', 'admin@admin.pl', 1, '2025-06-15 22:07:25', 0.00, 0, NULL),
('b6c166fb-381b-4540-a7f4-3c647cefb47b', 'niepojawiesie', '$2b$10$O04O7GcoHfiXZPM6TAAVPedknBvRuXNc486Evr1xm9DGxp39oDtr6', 'strange2409@gmdfgdfgail.com', 0, '2025-07-07 01:40:20', 0.00, 0, 'ba32d66c-6826-47dc-ae40-85dc2d617769'),
('ed0d1939-0179-4969-bce5-71adaedfd9e5', 'uzytkownik', '$2b$10$7IE4JbDIFrlKkgzhPR0iF.9g5B4r2ZvTLDp7QdLxr4GwU2ruQamFO', 'uzytkownik@uzytkownik.pl', 1, '2025-06-15 22:15:34', 4.33, 3, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users_roles`
--

CREATE TABLE `users_roles` (
  `idUser_role` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `idUser` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `idRole` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `assigned_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `assigned_by` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_roles`
--

INSERT INTO `users_roles` (`idUser_role`, `idUser`, `idRole`, `assigned_at`, `assigned_by`) VALUES
('126e41ff-941c-40e5-b4d7-84658b535b38', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '51d021c2-5c03-406a-8f47-f10cdc93794b', '2025-07-05 02:15:11', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af'),
('2b0dd210-d175-495d-8c38-ffea9a6b882e', '22500f9a-992e-4250-845a-d7ac5e460843', '51d021c2-5c03-406a-8f47-f10cdc93794b', '2025-07-05 02:15:07', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af'),
('6e230323-b21d-4ffe-b8a6-c1395d2e5316', 'b6c166fb-381b-4540-a7f4-3c647cefb47b', '51d021c2-5c03-406a-8f47-f10cdc93794b', '2025-07-07 03:40:20', NULL),
('c5c45865-16f3-49b8-88bd-dd2e4d3acbe2', '535f57c9-2888-49a1-a120-3c5b34803238', '55a82b5a-a9ed-4b80-b993-c83ee3c38878', '2025-07-06 18:29:20', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af'),
('c835666d-a7b2-4e0f-a5da-0fa46d9d4657', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '35a6d58c-1f54-4137-9c0a-2d6d4c030632', '2025-07-05 02:14:27', NULL);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`idComment`),
  ADD KEY `Comments_Users` (`idUser`),
  ADD KEY `idx_comments_song` (`idSong`);

--
-- Indeksy dla tabeli `favourites`
--
ALTER TABLE `favourites`
  ADD PRIMARY KEY (`idFavourite`),
  ADD UNIQUE KEY `unique_favourite` (`idUser`,`idSong`),
  ADD KEY `Favourites_Songs` (`idSong`);

--
-- Indeksy dla tabeli `lastplayedsongs`
--
ALTER TABLE `lastplayedsongs`
  ADD PRIMARY KEY (`idLastPlayedSong`),
  ADD UNIQUE KEY `unique_last_played` (`idUser`,`idSong`),
  ADD KEY `LastPlayedSong_Songs` (`idSong`);

--
-- Indeksy dla tabeli `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`idRating`),
  ADD UNIQUE KEY `unique_rating` (`idUser`,`idSong`),
  ADD KEY `idx_ratings_song` (`idSong`);

--
-- Indeksy dla tabeli `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idRole`);

--
-- Indeksy dla tabeli `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`idSong`),
  ADD KEY `Songs_Deleted_By` (`deleted_by_idUser`),
  ADD KEY `idx_songs_user` (`idUser`);

--
-- Indeksy dla tabeli `songs_history`
--
ALTER TABLE `songs_history`
  ADD PRIMARY KEY (`idHistory`),
  ADD KEY `SongsHistory_Songs` (`idSong`),
  ADD KEY `SongsHistory_Users` (`edited_by_idUser`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `unique_email` (`email`);

--
-- Indeksy dla tabeli `users_roles`
--
ALTER TABLE `users_roles`
  ADD PRIMARY KEY (`idUser_role`),
  ADD UNIQUE KEY `unique_user_role` (`idUser`),
  ADD KEY `fk_user_roles_role` (`idRole`),
  ADD KEY `fk_user_roles_assigned_by` (`assigned_by`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `Comments_Songs` FOREIGN KEY (`idSong`) REFERENCES `songs` (`idSong`) ON DELETE CASCADE,
  ADD CONSTRAINT `Comments_Users` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE;

--
-- Constraints for table `favourites`
--
ALTER TABLE `favourites`
  ADD CONSTRAINT `Favourites_Songs` FOREIGN KEY (`idSong`) REFERENCES `songs` (`idSong`) ON DELETE CASCADE,
  ADD CONSTRAINT `Favourites_Users` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE;

--
-- Constraints for table `lastplayedsongs`
--
ALTER TABLE `lastplayedsongs`
  ADD CONSTRAINT `LastPlayedSong_Songs` FOREIGN KEY (`idSong`) REFERENCES `songs` (`idSong`) ON DELETE CASCADE,
  ADD CONSTRAINT `LastPlayedSong_Users` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE;

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `Ratings_Songs` FOREIGN KEY (`idSong`) REFERENCES `songs` (`idSong`) ON DELETE CASCADE,
  ADD CONSTRAINT `Ratings_Users` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE;

--
-- Constraints for table `songs`
--
ALTER TABLE `songs`
  ADD CONSTRAINT `Songs_Deleted_By` FOREIGN KEY (`deleted_by_idUser`) REFERENCES `users` (`idUser`) ON DELETE SET NULL,
  ADD CONSTRAINT `Songs_Users` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE;

--
-- Constraints for table `songs_history`
--
ALTER TABLE `songs_history`
  ADD CONSTRAINT `SongsHistory_Songs` FOREIGN KEY (`idSong`) REFERENCES `songs` (`idSong`) ON DELETE CASCADE,
  ADD CONSTRAINT `SongsHistory_Users` FOREIGN KEY (`edited_by_idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE;

--
-- Constraints for table `users_roles`
--
ALTER TABLE `users_roles`
  ADD CONSTRAINT `fk_user_roles_assigned_by` FOREIGN KEY (`assigned_by`) REFERENCES `users` (`idUser`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_user_roles_role` FOREIGN KEY (`idRole`) REFERENCES `roles` (`idRole`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_user_roles_user` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
