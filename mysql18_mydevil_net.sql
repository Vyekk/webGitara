-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql18.mydevil.net
-- Generation Time: Lip 02, 2025 at 12:49 PM
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
CREATE DATABASE IF NOT EXISTS `m1349_webGitara` DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci;
USE `m1349_webGitara`;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `comments`
--

CREATE TABLE `comments` (
  `idComment` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `idSong` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `idUser` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `content` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`idComment`, `idSong`, `idUser`, `content`, `created_at`) VALUES
('07083058-48ad-4df0-8b12-18d1c588bd50', 'afb405d6-cde5-4003-9465-45b4f9433f4f', '138413cc-b931-4490-bc96-c6809390aee8', 'Test', '2025-06-14 21:02:39'),
('4abc59d3-8b2a-4b28-a2f8-ec37969b808d', '10e997a9-91c9-4db6-9385-3e881b34691c', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'Nice!', '2025-06-30 21:56:48'),
('4fb886b2-0fdf-4cc4-b10c-b3aca098f3cf', 'afb405d6-cde5-4003-9465-45b4f9433f4f', '138413cc-b931-4490-bc96-c6809390aee8', 'Dwa', '2025-06-14 21:04:47'),
('ec486573-d101-4964-9ff6-e5d8b70ae4bb', '7c06f948-2b02-441d-90fa-34884f4e57a9', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'Bardzo się starałem, aby zrobić ten utwór jak najlepiej!', '2025-06-29 15:39:54');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `favourites`
--

CREATE TABLE `favourites` (
  `idFavourite` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `idUser` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `idSong` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favourites`
--

INSERT INTO `favourites` (`idFavourite`, `idUser`, `idSong`, `created_at`) VALUES
('0c01061e-3148-4812-92d7-07aba11468d3', '138413cc-b931-4490-bc96-c6809390aee8', 'ff7fbe1f-d572-462f-a606-01a39141f1be', '2025-06-14 22:55:20'),
('1a4e764a-aced-43f5-ad16-88576492e2c4', '138413cc-b931-4490-bc96-c6809390aee8', '0b6887a7-ca79-44d2-9248-ff690f3d3039', '2025-06-14 22:55:20'),
('282e3b04-9cdd-465d-92db-8249d011a0a3', '4d8dd577-a9b0-466d-9e2d-2867ec751709', '0b6887a7-ca79-44d2-9248-ff690f3d3039', '2025-06-14 23:25:56');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `lastplayedsongs`
--

CREATE TABLE `lastplayedsongs` (
  `idLastPlayedSong` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `idUser` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `idSong` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `lastPlayed` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lastplayedsongs`
--

INSERT INTO `lastplayedsongs` (`idLastPlayedSong`, `idUser`, `idSong`, `lastPlayed`) VALUES
('0657a876-22aa-4741-a656-bb5e6feca26f', '138413cc-b931-4490-bc96-c6809390aee8', 'ff7fbe1f-d572-462f-a606-01a39141f1be', '2025-06-21 14:02:19'),
('091c1b36-d2ac-4daf-9b34-ac55371a298b', '4d8dd577-a9b0-466d-9e2d-2867ec751709', 'afb405d6-cde5-4003-9465-45b4f9433f4f', '2025-06-14 23:25:03'),
('10c0fea7-4d85-45af-aa0b-09e0f7152e4f', '4d8dd577-a9b0-466d-9e2d-2867ec751709', '58b65593-d8ba-4ef4-9cfd-8de0452184e8', '2025-06-14 23:26:34'),
('1ace9a06-b3e7-400f-8db0-a024dc5b7665', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '7c06f948-2b02-441d-90fa-34884f4e57a9', '2025-06-30 21:45:27'),
('22520b57-90a5-4ccd-a1d0-216baada6e5b', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '58b65593-d8ba-4ef4-9cfd-8de0452184e8', '2025-06-29 15:40:57'),
('246126e1-3fdc-41e0-828e-641d2d53230b', '138413cc-b931-4490-bc96-c6809390aee8', 'afb405d6-cde5-4003-9465-45b4f9433f4f', '2025-06-21 14:55:52'),
('2eab7b13-db7f-4b5c-92ad-e07e1efa462c', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '7c06f948-2b02-441d-90fa-34884f4e57a9', '2025-06-29 18:44:32'),
('2facb9d5-4d14-49ec-ba0c-7abbccd92ea6', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '7120755b-671b-41b7-9682-0e48baf47d1c', '2025-06-30 21:54:59'),
('3257e747-8639-4007-88e4-1bc5bc6e3edd', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'afb405d6-cde5-4003-9465-45b4f9433f4f', '2025-06-29 15:39:27'),
('41189ef5-bc77-4b6f-9041-73c8c0e2d0c2', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '6702db2d-04f4-4009-b784-da335196ec3c', '2025-06-30 22:03:30'),
('59468c57-2952-4792-8430-e7d9026c1cc0', '138413cc-b931-4490-bc96-c6809390aee8', '0b6887a7-ca79-44d2-9248-ff690f3d3039', '2025-06-21 14:44:47'),
('5f6081a9-a28e-4d17-aeac-65e5ccec92bc', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '3b3181cc-d44f-4e94-9ad8-33184e231097', '2025-06-29 15:39:19'),
('61a966be-4807-498b-9e0d-dad2747c1825', '4d8dd577-a9b0-466d-9e2d-2867ec751709', 'ff7fbe1f-d572-462f-a606-01a39141f1be', '2025-06-14 23:25:06'),
('6aec82af-fcf5-4101-a21e-c341ee19d6f0', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '6702db2d-04f4-4009-b784-da335196ec3c', '2025-06-29 15:47:09'),
('6d203ce4-1652-41a4-8930-191c52ff9bc2', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '0f215741-206d-423b-90c9-eb848f3faad7', '2025-06-30 22:04:48'),
('747fbf4f-08e1-4c88-9620-ffcbf526c2ad', '4d8dd577-a9b0-466d-9e2d-2867ec751709', '0b6887a7-ca79-44d2-9248-ff690f3d3039', '2025-06-14 23:24:48'),
('775efdd9-768a-4169-b105-e9ddfe59fccf', '138413cc-b931-4490-bc96-c6809390aee8', '58b65593-d8ba-4ef4-9cfd-8de0452184e8', '2025-06-19 23:03:00'),
('7db33399-06ea-4f6c-864d-c77be1ba4269', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '10e997a9-91c9-4db6-9385-3e881b34691c', '2025-06-30 21:56:42'),
('7ef0cf75-fbaa-4456-93c6-111a1b3e5f30', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'ff7fbe1f-d572-462f-a606-01a39141f1be', '2025-06-29 15:39:14'),
('97dbe189-9a2c-405d-9d16-428007b26de4', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '58b65593-d8ba-4ef4-9cfd-8de0452184e8', '2025-06-29 15:47:10'),
('a1dddc07-5b31-4f6b-930e-2e50052ab495', '138413cc-b931-4490-bc96-c6809390aee8', '0f215741-206d-423b-90c9-eb848f3faad7', '2025-06-19 23:03:00'),
('bd9af31d-3465-4d58-88d6-74ed209d369c', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', 'afb405d6-cde5-4003-9465-45b4f9433f4f', '2025-06-30 21:53:02'),
('e0496d85-b31d-4eb2-95dc-9b4eecb283be', '22500f9a-992e-4250-845a-d7ac5e460843', '0b6887a7-ca79-44d2-9248-ff690f3d3039', '2025-06-30 23:43:06'),
('ef34ea6c-ea8e-422b-8ade-bf80e1108793', '138413cc-b931-4490-bc96-c6809390aee8', '6702db2d-04f4-4009-b784-da335196ec3c', '2025-06-21 14:43:53'),
('f7fdb287-fa90-4d68-b0e2-e46d464d523e', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '0b6887a7-ca79-44d2-9248-ff690f3d3039', '2025-07-01 00:34:01'),
('fab5f203-3808-4842-bfe4-347e1fe09d0c', '138413cc-b931-4490-bc96-c6809390aee8', '3b3181cc-d44f-4e94-9ad8-33184e231097', '2025-06-21 14:56:42');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ratings`
--

CREATE TABLE `ratings` (
  `idRating` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `idUser` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `idSong` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `rating` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`idRating`, `idUser`, `idSong`, `rating`) VALUES
('0767a5e4-bdeb-4dd2-beaa-dfd9b047be4e', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '7120755b-671b-41b7-9682-0e48baf47d1c', 4),
('4287f143-6490-4a4c-886a-a2879ee4dbd7', '138413cc-b931-4490-bc96-c6809390aee8', '3b3181cc-d44f-4e94-9ad8-33184e231097', 2),
('43d7f7f6-1baa-49d1-af4e-c447c14c3764', '138413cc-b931-4490-bc96-c6809390aee8', '0b6887a7-ca79-44d2-9248-ff690f3d3039', 5),
('4e5139c4-500b-4fd7-a4db-bacb1f3284aa', '138413cc-b931-4490-bc96-c6809390aee8', 'ff7fbe1f-d572-462f-a606-01a39141f1be', 4),
('cc80ea12-69f7-4917-8fdc-72e83eb4afe9', '138413cc-b931-4490-bc96-c6809390aee8', 'afb405d6-cde5-4003-9465-45b4f9433f4f', 4),
('dba6d6a2-f040-4b9d-a4a8-46aa33e12445', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '10e997a9-91c9-4db6-9385-3e881b34691c', 4),
('f36e22b1-b671-43fb-8b4e-94a8ed6970d5', '138413cc-b931-4490-bc96-c6809390aee8', '6702db2d-04f4-4009-b784-da335196ec3c', 2),
('f8019069-43d4-4702-983e-253e02a63ebf', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '7c06f948-2b02-441d-90fa-34884f4e57a9', 5);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `songs`
--

CREATE TABLE `songs` (
  `idSong` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `idUser` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `default_bpm` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tablature` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `deleted_by_idUser` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `average_rating` decimal(3,2) NOT NULL
) ;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`idSong`, `idUser`, `title`, `default_bpm`, `created_at`, `updated_at`, `tablature`, `deleted_by_idUser`, `average_rating`) VALUES
('0b6887a7-ca79-44d2-9248-ff690f3d3039', '138413cc-b931-4490-bc96-c6809390aee8', 'Test', 120, '2025-06-14 21:09:23', '2025-06-14 21:09:23', '[[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}]]', NULL, 0.00),
('0f215741-206d-423b-90c9-eb848f3faad7', '138413cc-b931-4490-bc96-c6809390aee8', 'Test4', 120, '2025-06-15 22:03:58', '2025-06-15 22:03:58', '[[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}]]', NULL, 0.00),
('10e997a9-91c9-4db6-9385-3e881b34691c', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'Nowy utwór', 120, '2025-06-30 21:47:06', '2025-06-30 21:47:06', '[[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":1,\"duration\":\"4n\"}]]', NULL, 0.00),
('3b3181cc-d44f-4e94-9ad8-33184e231097', '138413cc-b931-4490-bc96-c6809390aee8', '3344', 120, '2025-06-19 23:03:14', '2025-06-21 14:56:39', '[[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":4,\"duration\":\"4n\"}]]', NULL, 0.00),
('58b65593-d8ba-4ef4-9cfd-8de0452184e8', '4d8dd577-a9b0-466d-9e2d-2867ec751709', 'Test rytmiki', 120, '2025-06-14 23:26:31', '2025-06-15 22:03:16', '[[{\"guitarString\":1,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"1n\"}],[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"1n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}]]', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', 0.00),
('6702db2d-04f4-4009-b784-da335196ec3c', '138413cc-b931-4490-bc96-c6809390aee8', 'Hej', 120, '2025-06-21 14:43:48', '2025-06-21 14:43:48', '[[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":4,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":6,\"guitarFret\":1,\"duration\":\"4n\"}]]', NULL, 0.00),
('7120755b-671b-41b7-9682-0e48baf47d1c', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'Story', 120, '2025-06-29 15:45:55', '2025-06-29 15:45:55', '[[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":4,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":6,\"duration\":\"1n\"}],[{\"guitarString\":2,\"guitarFret\":8,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"2n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"2n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":0,\"duration\":\"4n\"},{\"guitarString\":4,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":1,\"guitarFret\":0,\"duration\":\"4n\"}]]', NULL, 0.00),
('7c06f948-2b02-441d-90fa-34884f4e57a9', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'Testowy utwór użytkownika', 120, '2025-06-29 15:37:16', '2025-06-29 15:37:16', '[[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":7,\"duration\":\"4n\"}]]', NULL, 0.00),
('afb405d6-cde5-4003-9465-45b4f9433f4f', '138413cc-b931-4490-bc96-c6809390aee8', 'Test utworu', 120, '2025-06-14 18:33:05', '2025-06-14 21:37:50', '[[{\"guitarString\":1,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":24,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":24,\"duration\":\"4n\"}]]', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', 0.00),
('ff7fbe1f-d572-462f-a606-01a39141f1be', '138413cc-b931-4490-bc96-c6809390aee8', 'Test2', 120, '2025-06-14 21:05:33', '2025-06-14 21:43:18', '[[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":24,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":24,\"duration\":\"4n\"}]]', NULL, 0.00);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `songshistory`
--

CREATE TABLE `songshistory` (
  `idHistory` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `idSong` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `version_number` int NOT NULL,
  `tablature` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `edited_by_idUser` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `edited_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `idUser` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(32) COLLATE utf8mb4_general_ci NOT NULL,
  `password_hash` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `isModerator` tinyint(1) NOT NULL,
  `isActivated` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `average_published_song_rating` decimal(3,2) NOT NULL,
  `number_of_ratings_received` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`idUser`, `username`, `password_hash`, `email`, `isAdmin`, `isModerator`, `isActivated`, `created_at`, `average_published_song_rating`, `number_of_ratings_received`) VALUES
('138413cc-b931-4490-bc96-c6809390aee8', 'f', '$2b$10$Rdb.DcBgsL9tC9O8dbZk8.S0WpCjQ9YmPHra9fNogN187b7MXXF8q', 'f@f.pl', 0, 0, 1, '2025-06-14 18:23:42', 3.40, 5),
('22500f9a-992e-4250-845a-d7ac5e460843', 'kolejny1', '$2b$10$jUNMktWYrJT8m3tR4zqUFOMek.xmfUbEnadFaTRDIh8LRg/pPIr6C', 'kolejny1@tlen.pl', 0, 1, 1, '2025-06-30 21:39:29', 0.00, 0),
('4d8dd577-a9b0-466d-9e2d-2867ec751709', 'h', '$2b$10$zZ11QV0drGF4k7Rfk7fHCuNKYZRje0MCiLFahsxzx.x5M7qgEipzi', 'h@h.pl', 0, 0, 1, '2025-06-14 17:57:23', 0.00, 0),
('53c583a0-e475-4031-9461-9da45e1bd760', 'nowyUzytkownik', '$2b$10$X3Yvru2nI0ZQ0prSYVT3XeO11m43zE2W/1/t8toDnQPAy0r3/Gr1e', 'nowyUzytkownik@uzytkownik.pl', 0, 0, 1, '2025-06-29 15:15:10', 0.00, 0),
('65fd4127-9967-4880-9e0a-aaab35541522', 'nowyUzytkownik1', '$2b$10$WrQWga40fdo4nJSaKkLoUeHGsDN5BkhMskTk4jkdtE66EXrpjGZ9q', 'nowy@uzytkownik.pl', 0, 0, 1, '2025-07-02 01:47:08', 0.00, 0),
('b58597f1-20a8-4e91-ad5f-0e79a8f220af', 'admin', '$2b$10$ulSzO78yKbZiV7uI4UhUPOLSJodftcQK/x5V.Qx2Dm4BMuJrBzO3O', 'admin@admin.pl', 1, 0, 1, '2025-06-15 22:07:25', 0.00, 0),
('ed0d1939-0179-4969-bce5-71adaedfd9e5', 'uzytkownik', '$2b$10$7IE4JbDIFrlKkgzhPR0iF.9g5B4r2ZvTLDp7QdLxr4GwU2ruQamFO', 'uzytkownik@uzytkownik.pl', 0, 0, 1, '2025-06-15 22:15:34', 4.33, 3);

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
-- Indeksy dla tabeli `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`idSong`),
  ADD KEY `Songs_Deleted_By` (`deleted_by_idUser`),
  ADD KEY `idx_songs_user` (`idUser`);

--
-- Indeksy dla tabeli `songshistory`
--
ALTER TABLE `songshistory`
  ADD PRIMARY KEY (`idHistory`),
  ADD KEY `SongsHistory_Songs` (`idSong`),
  ADD KEY `SongsHistory_Users` (`edited_by_idUser`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`);

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
-- Constraints for table `songshistory`
--
ALTER TABLE `songshistory`
  ADD CONSTRAINT `SongsHistory_Songs` FOREIGN KEY (`idSong`) REFERENCES `songs` (`idSong`) ON DELETE CASCADE,
  ADD CONSTRAINT `SongsHistory_Users` FOREIGN KEY (`edited_by_idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
