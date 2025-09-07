-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql18.mydevil.net
-- Generation Time: Wrz 07, 2025 at 07:24 PM
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
('18f54df6-f6c9-45d1-b5ae-c40e809ca183', 'cc14faa5-6e6f-4369-99cb-13e7dba88a70', '7c06f948-2b02-441d-90fa-34884f4e57a9', '2025-08-25 06:37:06'),
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
('0ab39583-5643-47d6-9770-7c23f9261af7', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', 'e0ae281d-d2f7-4a73-a8f3-d3dff8001730', '2025-09-07 02:48:48'),
('1ace9a06-b3e7-400f-8db0-a024dc5b7665', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '7c06f948-2b02-441d-90fa-34884f4e57a9', '2025-09-06 09:35:51'),
('1ba3452d-141a-4910-a9bf-317cc16fb901', '535f57c9-2888-49a1-a120-3c5b34803238', '7120755b-671b-41b7-9682-0e48baf47d1c', '2025-07-14 01:26:48'),
('1f67c45f-d255-4e7c-9d22-3fd9ee99aa3b', 'e0c1c3cc-126d-498f-b304-0c506e9dfabf', 'e0ae281d-d2f7-4a73-a8f3-d3dff8001730', '2025-08-31 21:54:58'),
('2eab7b13-db7f-4b5c-92ad-e07e1efa462c', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '7c06f948-2b02-441d-90fa-34884f4e57a9', '2025-09-06 21:38:15'),
('2facb9d5-4d14-49ec-ba0c-7abbccd92ea6', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '7120755b-671b-41b7-9682-0e48baf47d1c', '2025-09-06 09:35:19'),
('319da82c-3d33-4f00-bd5b-4c64e7f68f9d', 'd666d9be-bf48-497c-8a81-6fdd7491a81f', '7c06f948-2b02-441d-90fa-34884f4e57a9', '2025-09-07 01:44:52'),
('57f39285-e4a4-44fd-93d2-3422f27537e8', '535f57c9-2888-49a1-a120-3c5b34803238', 'e4afecc4-ead7-4233-b549-b8a888518619', '2025-07-14 01:26:47'),
('5a057918-7996-447a-a417-d78dfbaaed85', 'e0c1c3cc-126d-498f-b304-0c506e9dfabf', '7e72f231-9587-4d37-ae3e-89586f03d695', '2025-08-31 21:54:59'),
('6156c506-39e4-47f9-b379-f830bb4a3eaf', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'e4afecc4-ead7-4233-b549-b8a888518619', '2025-07-23 01:30:48'),
('636076f1-0cf0-45f6-a408-24d9262f4c6c', 'd666d9be-bf48-497c-8a81-6fdd7491a81f', 'e0ae281d-d2f7-4a73-a8f3-d3dff8001730', '2025-09-07 01:44:54'),
('67b1f068-2b78-4bbc-9c4e-c2e7d77e62b4', 'cc14faa5-6e6f-4369-99cb-13e7dba88a70', '7c06f948-2b02-441d-90fa-34884f4e57a9', '2025-08-25 06:40:16'),
('7efeceee-972b-42d1-9a42-7b64a6fe6e92', 'cc14faa5-6e6f-4369-99cb-13e7dba88a70', '7120755b-671b-41b7-9682-0e48baf47d1c', '2025-08-25 06:37:49'),
('8af2eb13-c305-4b37-9af3-7d5768f7304b', 'd666d9be-bf48-497c-8a81-6fdd7491a81f', '7120755b-671b-41b7-9682-0e48baf47d1c', '2025-09-07 01:44:53'),
('906416db-15e4-419f-8163-d083db3abd2c', 'd666d9be-bf48-497c-8a81-6fdd7491a81f', 'e4afecc4-ead7-4233-b549-b8a888518619', '2025-09-07 01:44:51'),
('9924fd67-4ef1-4077-b65b-f05baa6761c2', '535f57c9-2888-49a1-a120-3c5b34803238', 'e0ae281d-d2f7-4a73-a8f3-d3dff8001730', '2025-07-14 01:26:50'),
('b1116e4c-8b9b-45d1-b4cd-452307da7818', '535f57c9-2888-49a1-a120-3c5b34803238', '7c06f948-2b02-441d-90fa-34884f4e57a9', '2025-07-14 01:26:48'),
('bc7e24ef-3384-44dd-8a27-7e76e0ff3158', '661879bd-3323-424a-bd81-7e9d37b309d7', 'e0ae281d-d2f7-4a73-a8f3-d3dff8001730', '2025-07-21 23:26:28'),
('cc9a64d7-bfea-4627-88f7-bd97ed32dec3', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '7120755b-671b-41b7-9682-0e48baf47d1c', '2025-09-01 02:17:26'),
('cf19911e-1dcd-4066-a611-ee8d9acb7b42', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', 'e4afecc4-ead7-4233-b549-b8a888518619', '2025-09-06 21:34:43'),
('d644fd9b-89a3-4633-8581-b02b0c35d71b', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '7e72f231-9587-4d37-ae3e-89586f03d695', '2025-09-06 21:38:03'),
('ee1e52e9-d9d6-4073-95ec-caa0003c7148', 'e0c1c3cc-126d-498f-b304-0c506e9dfabf', '7c06f948-2b02-441d-90fa-34884f4e57a9', '2025-08-31 21:54:58');

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
('f3bda6a4-a755-4d7f-acab-80d3c42efe2d', 'd666d9be-bf48-497c-8a81-6fdd7491a81f', 'e0ae281d-d2f7-4a73-a8f3-d3dff8001730', 4),
('f8019069-43d4-4702-983e-253e02a63ebf', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '7c06f948-2b02-441d-90fa-34884f4e57a9', 5),
('f8eeba24-dce8-4442-a456-4fefd190d574', 'd666d9be-bf48-497c-8a81-6fdd7491a81f', '7c06f948-2b02-441d-90fa-34884f4e57a9', 3);

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
('e46d276c-5636-4ead-afe1-9214aa28ddf6', '7120755b-671b-41b7-9682-0e48baf47d1c', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '2025-09-07 18:42:07'),
('f7fe4cc7-e87d-4cc6-8269-501dfae138bb', 'e4afecc4-ead7-4233-b549-b8a888518619', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '2025-09-07 18:42:07');

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
('7120755b-671b-41b7-9682-0e48baf47d1c', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'Story', 120, '2025-06-29 15:45:55', '2025-09-06 23:30:40', '[[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":4,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":6,\"duration\":\"1n\"}],[{\"guitarString\":2,\"guitarFret\":8,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"2n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"2n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":0,\"duration\":\"4n\"},{\"guitarString\":4,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":1,\"guitarFret\":0,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":8,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":9,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"1n\"}],[{\"rest\":true,\"duration\":\"1n\"}],[{\"guitarString\":3,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":8,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":9,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":0,\"duration\":\"4n\"}]]', NULL, 2.50),
('7c06f948-2b02-441d-90fa-34884f4e57a9', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'Testowy utwór użytkownika', 120, '2025-06-29 15:37:16', '2025-06-29 15:37:16', '[[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":7,\"duration\":\"4n\"}]]', NULL, 4.00),
('7e72f231-9587-4d37-ae3e-89586f03d695', 'cc14faa5-6e6f-4369-99cb-13e7dba88a70', 'Testowy utwor', 120, '2025-08-25 06:40:10', '2025-08-25 06:40:10', '[[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":6,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":3,\"duration\":\"4n\"},{\"guitarString\":4,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":4,\"guitarFret\":0,\"duration\":\"4n\"},{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":2,\"guitarFret\":3,\"duration\":\"4n\"}]]', NULL, 0.00),
('e0ae281d-d2f7-4a73-a8f3-d3dff8001730', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', 'Happy Birthday', 120, '2025-07-03 22:49:21', '2025-07-19 02:02:33', '[[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":2,\"duration\":\"2n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"2n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":0,\"duration\":\"2n\"}],[{\"guitarString\":4,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":5,\"duration\":\"2n\"}],[{\"guitarString\":5,\"guitarFret\":3,\"duration\":\"2n\"}]]', NULL, 3.00),
('e4afecc4-ead7-4233-b549-b8a888518619', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', 'Utwór testowy', 120, '2025-07-09 00:32:19', '2025-08-31 18:45:57', '[[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":1,\"duration\":\"4n\"}]]', NULL, 0.00);

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
('7bf04cad-cfcb-45fb-bb31-803eb3a103f8', 'e4afecc4-ead7-4233-b549-b8a888518619', 2, '[[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":1,\"duration\":\"4n\"}]]', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '2025-08-31 18:45:57'),
('de73860d-474a-4aae-9356-7302e5494628', '7120755b-671b-41b7-9682-0e48baf47d1c', 1, '[[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":4,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":6,\"duration\":\"1n\"}],[{\"guitarString\":2,\"guitarFret\":8,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"2n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"2n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":0,\"duration\":\"4n\"},{\"guitarString\":4,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":1,\"guitarFret\":0,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":8,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":9,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"1n\"}],[{\"rest\":true,\"duration\":\"1n\"}],[{\"guitarString\":3,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"rest\":true,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":5,\"duration\":\"4n\"}]]', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '2025-07-16 01:10:46');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `tokens`
--

CREATE TABLE `tokens` (
  `idToken` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `idUser` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `token` char(64) COLLATE utf8mb4_general_ci NOT NULL,
  `expires_at` datetime NOT NULL,
  `used` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `idTokenType` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`idToken`, `idUser`, `token`, `expires_at`, `used`, `created_at`, `idTokenType`) VALUES
('00c53c40-0f6e-4f5e-9615-83f8ba1ba877', 'd666d9be-bf48-497c-8a81-6fdd7491a81f', '4d3fb066-4371-48bf-a4ad-3d888ec17f03', '2025-09-07 04:39:49', 0, '2025-09-07 03:39:48', 'f0e9d8c7-b6a5-4321-fedc-ba9876543210'),
('2a3ba831-2aa9-487b-b7c2-e11afb91eaf4', '535f57c9-2888-49a1-a120-3c5b34803238', 'f7465104-9d4f-4852-8251-c34251b30cac', '2025-07-14 04:21:03', 1, '2025-07-14 03:21:02', 'f0e9d8c7-b6a5-4321-fedc-ba9876543210'),
('2c6e1c9d-33bc-4e6c-9620-08ed22c5855f', '661879bd-3323-424a-bd81-7e9d37b309d7', '9026b722-ee3d-4e3c-aeff-0701c3226839', '2025-07-23 01:26:06', 1, '2025-07-22 01:26:05', 'a1b2c3d4-e5f6-7890-1234-567890abcdef'),
('2e2637b0-cc94-413a-b761-7b0f57edd170', 'd666d9be-bf48-497c-8a81-6fdd7491a81f', '739e227e-9ea0-4a3e-ab2a-505dc9a5aac2', '2025-09-07 03:58:21', 0, '2025-09-07 02:58:21', 'f0e9d8c7-b6a5-4321-fedc-ba9876543210'),
('526f7fc9-e7fe-4f76-b3ed-5b3e82a2a455', 'd666d9be-bf48-497c-8a81-6fdd7491a81f', '0f06676a-9c96-404c-b0f2-ff530acfe60c', '2025-09-07 04:38:47', 1, '2025-09-07 03:38:47', 'f0e9d8c7-b6a5-4321-fedc-ba9876543210'),
('657beb2f-1ef2-48fc-8ec2-de8bec08093c', '273cde2e-19fb-4d8f-956b-56b0e0136cfb', 'f66f8220-c1ec-4e26-b672-b630796e77cd', '2025-09-01 20:46:38', 0, '2025-08-31 20:46:38', 'a1b2c3d4-e5f6-7890-1234-567890abcdef'),
('90f5b901-2f95-46ec-b9c1-de54d36d7c9b', 'd666d9be-bf48-497c-8a81-6fdd7491a81f', '62d719e5-1c5d-4e5a-8047-3668e2907690', '2025-09-07 02:56:07', 0, '2025-09-07 01:56:07', 'f0e9d8c7-b6a5-4321-fedc-ba9876543210'),
('9646c5f0-ae5a-4860-a4ee-fbc6e0297f20', 'cc14faa5-6e6f-4369-99cb-13e7dba88a70', 'a7a5c2f7-c3a2-460f-8b3e-00de78ff898f', '2025-08-26 08:35:54', 1, '2025-08-25 08:35:53', 'a1b2c3d4-e5f6-7890-1234-567890abcdef'),
('99fcf17f-ca7d-48b9-956e-670a4b3f7f31', 'd666d9be-bf48-497c-8a81-6fdd7491a81f', 'a21a55d6-c636-4a0b-9f24-ca0f75c76d3e', '2025-09-08 01:55:44', 1, '2025-09-07 01:55:44', 'a1b2c3d4-e5f6-7890-1234-567890abcdef'),
('a8eda2d2-a77a-4de9-a08c-66a6c141c1a3', '535f57c9-2888-49a1-a120-3c5b34803238', 'cfbd44e9-9759-49c0-a327-47f92b1a70ca', '2025-09-07 06:05:38', 1, '2025-09-07 05:05:37', 'f0e9d8c7-b6a5-4321-fedc-ba9876543210'),
('b434f6e9-6da8-4d54-88f0-a3a08b3bd9c2', 'e0c1c3cc-126d-498f-b304-0c506e9dfabf', 'efb37a5a-8bff-409f-9501-b3e8829697cb', '2025-09-01 23:54:31', 1, '2025-08-31 23:54:30', 'a1b2c3d4-e5f6-7890-1234-567890abcdef'),
('cef5f206-deb5-4049-9b4a-ba44a5ced927', 'd666d9be-bf48-497c-8a81-6fdd7491a81f', 'bc821cb7-af56-4f7c-a238-eee399e473aa', '2025-09-07 04:01:52', 0, '2025-09-07 03:01:51', 'f0e9d8c7-b6a5-4321-fedc-ba9876543210'),
('eaaf896c-929a-46b3-82d5-8cc115e8f058', '39e32ed8-21dd-498f-b4f5-78a7e4e0ad7a', '07ba5ff1-53c5-45b9-9f8b-c60dab53765a', '2025-09-01 20:47:01', 1, '2025-08-31 20:47:00', 'a1b2c3d4-e5f6-7890-1234-567890abcdef');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `tokens_types`
--

CREATE TABLE `tokens_types` (
  `idTokenType` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tokens_types`
--

INSERT INTO `tokens_types` (`idTokenType`, `name`) VALUES
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'activation'),
('f0e9d8c7-b6a5-4321-fedc-ba9876543210', 'password_reset');

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
('273cde2e-19fb-4d8f-956b-56b0e0136cfb', 'nowyTest', '$2b$10$PCSoBI6cp6TCNTCxGsb2VuTrF4cmuh5Cfck6c0H/7X.PP9t7J7w1y', 'effi@spoko.pl', 0, '2025-08-31 18:46:38', 0.00, 0),
('39e32ed8-21dd-498f-b4f5-78a7e4e0ad7a', 'nowaTest', '$2b$10$2zW6g53XOzOiNdPEaz9x9uCxN4dmVv34FslRUhptdbR8NSyjwhRVe', 'koluchkon@gmail.com', 1, '2025-08-31 18:47:00', 0.00, 0),
('535f57c9-2888-49a1-a120-3c5b34803238', 'moderator', '$2b$10$zfQqyLorRCWln12KinJgJenuJLjZ.1rfvDgfw9We0pacI2B4w5AAe', 'strange2409@gmail.com', 1, '2025-07-06 16:01:19', 0.00, 0),
('661879bd-3323-424a-bd81-7e9d37b309d7', 'konrad', '$2b$10$AIgAFdF2jfPvB7vlIM6ihuUl9yKwm0UT390TAUixtbXn/zC34CuJC', 'konradkoluch1999@gmail.com', 1, '2025-07-21 23:26:05', 0.00, 0),
('b58597f1-20a8-4e91-ad5f-0e79a8f220af', 'admin', '$2b$10$ulSzO78yKbZiV7uI4UhUPOLSJodftcQK/x5V.Qx2Dm4BMuJrBzO3O', 'admin@admin.pl', 1, '2025-06-15 22:07:25', 3.00, 2),
('cc14faa5-6e6f-4369-99cb-13e7dba88a70', 'pgago', '$2b$10$X7PDPSFLK9AOWvlyBA6RZeZA6ZHDWaQSfF8kb4yRNT1kqYEJv0tb2', 'pgago@pjwstk.edu.pl', 1, '2025-08-25 06:35:53', 0.00, 0),
('d666d9be-bf48-497c-8a81-6fdd7491a81f', 'konradkol', '$2b$10$/BmLBs37YA0FWGjey6gBz.S9bMlsKLnap8ZHO/QsJy4w1cNwAg842', 's20699@pjwstk.edu.pl', 1, '2025-09-06 23:55:44', 0.00, 0),
('e0c1c3cc-126d-498f-b304-0c506e9dfabf', 'woj99', '$2b$10$00KA.gg.DaJMb/CC7W.ceu/X5hKjwlKMJpypwWkz8PTsf6uppv4Gi', 'woj-70@tlen.pl', 1, '2025-08-31 21:54:30', 0.00, 0),
('ed0d1939-0179-4969-bce5-71adaedfd9e5', 'uzytkownik', '$2b$10$7IE4JbDIFrlKkgzhPR0iF.9g5B4r2ZvTLDp7QdLxr4GwU2ruQamFO', 'uzytkownik@uzytkownik.pl', 1, '2025-06-15 22:15:34', 3.25, 4);

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
('04b2c0c5-05f7-4536-86b0-c98c18805fc7', '273cde2e-19fb-4d8f-956b-56b0e0136cfb', '51d021c2-5c03-406a-8f47-f10cdc93794b', '2025-08-31 20:46:38', NULL),
('273225d4-5473-45ff-883b-15e67f046e60', 'd666d9be-bf48-497c-8a81-6fdd7491a81f', '51d021c2-5c03-406a-8f47-f10cdc93794b', '2025-09-07 01:55:44', NULL),
('3ad02d6c-b2aa-4afa-8244-8a134fa84641', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '55a82b5a-a9ed-4b80-b993-c83ee3c38878', '2025-08-31 20:45:31', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af'),
('72ef6e7c-7440-4495-b56a-2ff72c99cf49', '39e32ed8-21dd-498f-b4f5-78a7e4e0ad7a', '51d021c2-5c03-406a-8f47-f10cdc93794b', '2025-08-31 20:47:00', NULL),
('7b2ac837-4aea-4526-b7fc-c7dea4a4d25c', 'e0c1c3cc-126d-498f-b304-0c506e9dfabf', '55a82b5a-a9ed-4b80-b993-c83ee3c38878', '2025-09-01 04:17:38', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af'),
('9e7b005d-a14b-401a-aff3-c139cd3b792f', '661879bd-3323-424a-bd81-7e9d37b309d7', '51d021c2-5c03-406a-8f47-f10cdc93794b', '2025-07-22 01:26:05', NULL),
('c2cc2876-240e-476c-bb34-7324e490cb15', 'cc14faa5-6e6f-4369-99cb-13e7dba88a70', '51d021c2-5c03-406a-8f47-f10cdc93794b', '2025-08-25 08:35:53', NULL),
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
  ADD KEY `fk_tokens_user` (`idUser`),
  ADD KEY `fk_tokens_token_type` (`idTokenType`);

--
-- Indeksy dla tabeli `tokens_types`
--
ALTER TABLE `tokens_types`
  ADD PRIMARY KEY (`idTokenType`),
  ADD UNIQUE KEY `unique_token_type_name` (`name`);

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
  ADD CONSTRAINT `fk_tokens_token_type` FOREIGN KEY (`idTokenType`) REFERENCES `tokens_types` (`idTokenType`) ON DELETE CASCADE,
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
