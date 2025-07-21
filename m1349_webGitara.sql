-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql18.mydevil.net
-- Generation Time: Lip 21, 2025 at 05:01 PM
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
('ad301c9f-600b-40ce-80e9-2997c586d424', '7120755b-671b-41b7-9682-0e48baf47d1c', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'Dzięki! Inspiracją był Tony Iommi, więc dobrze wyczute 😄', '2025-07-15 11:26:00'),
('c8d0b11e-fc63-4fbb-8f72-3fe80fdf3b88', '7120755b-671b-41b7-9682-0e48baf47d1c', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', ' Ale fajny klimat! Trochę przypomina mi stare Black Sabbath. Super riff na początku.', '2025-07-15 11:25:53'),
('c9f9f961-2276-4c2a-9387-4c5baf946e50', '7120755b-671b-41b7-9682-0e48baf47d1c', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'Czy to zagranie w 3. takcie na 5. progu ma być legato czy staccato? Nie jestem pewna.', '2025-07-15 11:26:10'),
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
('2e52e191-df97-4f9e-ac47-adc26675dbda', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '7c06f948-2b02-441d-90fa-34884f4e57a9', '2025-07-14 02:19:42');

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
('0ab39583-5643-47d6-9770-7c23f9261af7', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', 'e0ae281d-d2f7-4a73-a8f3-d3dff8001730', '2025-07-19 02:03:13'),
('1609dd95-ce56-4e85-a005-15f73ae738b9', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '8ef97658-27f8-42e8-881c-0bb9b450c6fb', '2025-07-19 02:04:03'),
('1ace9a06-b3e7-400f-8db0-a024dc5b7665', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '7c06f948-2b02-441d-90fa-34884f4e57a9', '2025-07-14 01:27:18'),
('1ba3452d-141a-4910-a9bf-317cc16fb901', '535f57c9-2888-49a1-a120-3c5b34803238', '7120755b-671b-41b7-9682-0e48baf47d1c', '2025-07-14 01:26:48'),
('2eab7b13-db7f-4b5c-92ad-e07e1efa462c', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '7c06f948-2b02-441d-90fa-34884f4e57a9', '2025-07-20 20:49:38'),
('2facb9d5-4d14-49ec-ba0c-7abbccd92ea6', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '7120755b-671b-41b7-9682-0e48baf47d1c', '2025-07-15 11:45:20'),
('57f39285-e4a4-44fd-93d2-3422f27537e8', '535f57c9-2888-49a1-a120-3c5b34803238', 'e4afecc4-ead7-4233-b549-b8a888518619', '2025-07-14 01:26:47'),
('6156c506-39e4-47f9-b379-f830bb4a3eaf', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'e4afecc4-ead7-4233-b549-b8a888518619', '2025-07-15 11:20:04'),
('6b208642-55b4-469b-b50d-68ac8fbf7a7d', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '4eec22fd-a917-449b-a30a-41b6dc0988bb', '2025-07-20 20:49:39'),
('9924fd67-4ef1-4077-b65b-f05baa6761c2', '535f57c9-2888-49a1-a120-3c5b34803238', 'e0ae281d-d2f7-4a73-a8f3-d3dff8001730', '2025-07-14 01:26:50'),
('b1116e4c-8b9b-45d1-b4cd-452307da7818', '535f57c9-2888-49a1-a120-3c5b34803238', '7c06f948-2b02-441d-90fa-34884f4e57a9', '2025-07-14 01:26:48'),
('cc9a64d7-bfea-4627-88f7-bd97ed32dec3', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '7120755b-671b-41b7-9682-0e48baf47d1c', '2025-07-20 20:49:38'),
('cf19911e-1dcd-4066-a611-ee8d9acb7b42', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', 'e4afecc4-ead7-4233-b549-b8a888518619', '2025-07-19 02:02:52');

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
('97062ffb-b454-4b7c-9818-7152b649d43c', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '7120755b-671b-41b7-9682-0e48baf47d1c', 1),
('c9bc5f28-6e84-4170-b590-b481db40802a', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', 'e0ae281d-d2f7-4a73-a8f3-d3dff8001730', 2),
('f8019069-43d4-4702-983e-253e02a63ebf', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '7c06f948-2b02-441d-90fa-34884f4e57a9', 5);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `reported_songs`
--

CREATE TABLE `reported_songs` (
  `idReportedSong` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `idSong` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `reported_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reported_songs`
--

INSERT INTO `reported_songs` (`idReportedSong`, `idSong`, `reported_by`, `created_at`) VALUES
('800c7dde-58c3-4b61-8295-66e77dcb8bba', '7120755b-671b-41b7-9682-0e48baf47d1c', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '2025-07-15 12:25:33');

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
('4eec22fd-a917-449b-a30a-41b6dc0988bb', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', 'Puste struny', 120, '2025-07-19 02:24:10', '2025-07-19 02:24:10', '[[{\"guitarString\":1,\"guitarFret\":0,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":0,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":0,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":0,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":0,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":0,\"duration\":\"4n\"}]]', NULL, 0.00),
('7120755b-671b-41b7-9682-0e48baf47d1c', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'Story', 120, '2025-06-29 15:45:55', '2025-07-16 01:10:46', '[[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":4,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":6,\"duration\":\"1n\"}],[{\"guitarString\":2,\"guitarFret\":8,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"2n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"2n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":0,\"duration\":\"4n\"},{\"guitarString\":4,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":1,\"guitarFret\":0,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":8,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":9,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"1n\"}],[{\"rest\":true,\"duration\":\"1n\"}],[{\"guitarString\":3,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":8,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":9,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":0,\"duration\":\"4n\"}]]', NULL, 2.50),
('7c06f948-2b02-441d-90fa-34884f4e57a9', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'Testowy utwór użytkownika', 120, '2025-06-29 15:37:16', '2025-06-29 15:37:16', '[[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":7,\"duration\":\"4n\"}]]', NULL, 0.00),
('8ef97658-27f8-42e8-881c-0bb9b450c6fb', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', 'jedna nuta', 120, '2025-07-16 15:15:14', '2025-07-18 11:43:52', '[[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"64n\"}],[{\"guitarString\":2,\"guitarFret\":3,\"duration\":\"64n\"}],[{\"guitarString\":2,\"guitarFret\":4,\"duration\":\"1n\"}],[{\"guitarString\":2,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":8,\"duration\":\"64n\"}]]', NULL, 0.00),
('e0ae281d-d2f7-4a73-a8f3-d3dff8001730', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', 'Happy Birthday', 120, '2025-07-03 22:49:21', '2025-07-19 02:02:33', '[[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":2,\"duration\":\"2n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"2n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":0,\"duration\":\"2n\"}],[{\"guitarString\":4,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":5,\"duration\":\"2n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"2n\"}]]', NULL, 2.00),
('e4afecc4-ead7-4233-b549-b8a888518619', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', 'Utwór testowy', 120, '2025-07-09 00:32:19', '2025-07-14 01:25:08', '[[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":1,\"duration\":\"4n\"}]]', NULL, 0.00);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `songs_history`
--

CREATE TABLE `songs_history` (
  `idHistory` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `idSong` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `version_number` int NOT NULL,
  `tablature` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `edited_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `edited_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `songs_history`
--

INSERT INTO `songs_history` (`idHistory`, `idSong`, `version_number`, `tablature`, `edited_by`, `edited_at`) VALUES
('1c735355-407c-485d-a4cb-e42de09e8082', 'e4afecc4-ead7-4233-b549-b8a888518619', 1, '[[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":1,\"duration\":\"4n\"}]]', '535f57c9-2888-49a1-a120-3c5b34803238', '2025-07-14 01:25:08'),
('35f9fbda-fd4a-4f14-8524-77020b55009e', 'e0ae281d-d2f7-4a73-a8f3-d3dff8001730', 1, '[[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":2,\"duration\":\"2n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"2n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":0,\"duration\":\"2n\"}],[{\"guitarString\":4,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"2n\"}]]', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '2025-07-19 02:02:33'),
('53e7037e-4657-4394-bb21-b584408d3124', '8ef97658-27f8-42e8-881c-0bb9b450c6fb', 2, '[[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":4,\"duration\":\"1n\"}],[{\"guitarString\":2,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":8,\"duration\":\"4n\"}]]', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '2025-07-16 15:20:33'),
('66eb7ab8-ced4-4f15-bf64-198e31a8eda5', '8ef97658-27f8-42e8-881c-0bb9b450c6fb', 1, '[[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":8,\"duration\":\"4n\"}]]', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '2025-07-16 15:16:12'),
('d4347fa9-796d-4a3b-950a-1e15d0dc8831', '8ef97658-27f8-42e8-881c-0bb9b450c6fb', 4, '[[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":4,\"duration\":\"1n\"}],[{\"guitarString\":2,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":8,\"duration\":\"64n\"}]]', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '2025-07-18 11:43:52'),
('de73860d-474a-4aae-9356-7302e5494628', '7120755b-671b-41b7-9682-0e48baf47d1c', 1, '[[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":4,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":6,\"duration\":\"1n\"}],[{\"guitarString\":2,\"guitarFret\":8,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"2n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"2n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":0,\"duration\":\"4n\"},{\"guitarString\":4,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":1,\"guitarFret\":0,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":8,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":9,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"1n\"}],[{\"rest\":true,\"duration\":\"1n\"}],[{\"guitarString\":3,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}]]', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '2025-07-16 01:10:46'),
('dfc7528a-f85f-4d01-8d6f-09f3ba38215c', '8ef97658-27f8-42e8-881c-0bb9b450c6fb', 3, '[[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":4,\"duration\":\"1n\"}],[{\"guitarString\":2,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":8,\"duration\":\"4n\"}]]', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '2025-07-18 11:43:29');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `tokens`
--

CREATE TABLE `tokens` (
  `idToken` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `idUser` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `type` enum('activation','password_reset') COLLATE utf8mb4_general_ci NOT NULL,
  `token` char(64) COLLATE utf8mb4_general_ci NOT NULL,
  `expires_at` datetime NOT NULL,
  `used` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`idToken`, `idUser`, `type`, `token`, `expires_at`, `used`, `created_at`) VALUES
('2a3ba831-2aa9-487b-b7c2-e11afb91eaf4', '535f57c9-2888-49a1-a120-3c5b34803238', 'password_reset', 'f7465104-9d4f-4852-8251-c34251b30cac', '2025-07-14 04:21:03', 1, '2025-07-14 03:21:02');

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
  `number_of_ratings_received` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`idUser`, `username`, `password_hash`, `email`, `isActivated`, `created_at`, `average_published_song_rating`, `number_of_ratings_received`) VALUES
('22500f9a-992e-4250-845a-d7ac5e460843', 'kolejny1', '$2b$10$jUNMktWYrJT8m3tR4zqUFOMek.xmfUbEnadFaTRDIh8LRg/pPIr6C', 'kolejny1@tlen.pl', 1, '2025-06-30 21:39:29', 0.00, 0),
('535f57c9-2888-49a1-a120-3c5b34803238', 'moderator', '$2b$10$yT7yFY2Ca4dT.TqeHeYyce2nIbrEvGP0aSgN4fnBpXQ3Zlmh7gWsu', 'strange2409@gmail.com', 1, '2025-07-06 16:01:19', 0.00, 0),
('b58597f1-20a8-4e91-ad5f-0e79a8f220af', 'admin', '$2b$10$ulSzO78yKbZiV7uI4UhUPOLSJodftcQK/x5V.Qx2Dm4BMuJrBzO3O', 'admin@admin.pl', 1, '2025-06-15 22:07:25', 2.00, 1),
('ed0d1939-0179-4969-bce5-71adaedfd9e5', 'uzytkownik', '$2b$10$7IE4JbDIFrlKkgzhPR0iF.9g5B4r2ZvTLDp7QdLxr4GwU2ruQamFO', 'uzytkownik@uzytkownik.pl', 1, '2025-06-15 22:15:34', 3.33, 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users_roles`
--

CREATE TABLE `users_roles` (
  `idUserRole` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `idUser` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `idRole` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `assigned_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `assigned_by` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_roles`
--

INSERT INTO `users_roles` (`idUserRole`, `idUser`, `idRole`, `assigned_at`, `assigned_by`) VALUES
('126e41ff-941c-40e5-b4d7-84658b535b38', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '51d021c2-5c03-406a-8f47-f10cdc93794b', '2025-07-05 02:15:11', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af'),
('2b0dd210-d175-495d-8c38-ffea9a6b882e', '22500f9a-992e-4250-845a-d7ac5e460843', '51d021c2-5c03-406a-8f47-f10cdc93794b', '2025-07-05 02:15:07', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af'),
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
-- Indeksy dla tabeli `reported_songs`
--
ALTER TABLE `reported_songs`
  ADD PRIMARY KEY (`idReportedSong`),
  ADD KEY `idSong` (`idSong`),
  ADD KEY `reported_by` (`reported_by`);

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
  ADD KEY `SongsHistory_Users` (`edited_by`);

--
-- Indeksy dla tabeli `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`idToken`),
  ADD KEY `fk_tokens_user` (`idUser`);

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
  ADD PRIMARY KEY (`idUserRole`),
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
-- Constraints for table `reported_songs`
--
ALTER TABLE `reported_songs`
  ADD CONSTRAINT `reported_songs_ibfk_1` FOREIGN KEY (`idSong`) REFERENCES `songs` (`idSong`) ON DELETE CASCADE,
  ADD CONSTRAINT `reported_songs_ibfk_2` FOREIGN KEY (`reported_by`) REFERENCES `users` (`idUser`) ON DELETE CASCADE;

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
  ADD CONSTRAINT `SongsHistory_Users` FOREIGN KEY (`edited_by`) REFERENCES `users` (`idUser`) ON DELETE CASCADE;

--
-- Constraints for table `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `fk_tokens_user` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE;

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
