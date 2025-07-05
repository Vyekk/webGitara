-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Lip 06, 2025 at 12:33 AM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `m1349_webgitara`
--
CREATE DATABASE IF NOT EXISTS `m1349_webgitara` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `m1349_webgitara`;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `comments`
--

CREATE TABLE `comments` (
  `idComment` char(36) NOT NULL,
  `idSong` char(36) NOT NULL,
  `idUser` char(36) NOT NULL,
  `content` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`idComment`, `idSong`, `idUser`, `content`, `created_at`) VALUES
('4abc59d3-8b2a-4b28-a2f8-ec37969b808d', '10e997a9-91c9-4db6-9385-3e881b34691c', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'Nice!', '2025-06-30 21:56:48'),
('a89c6f75-30ca-4c41-8d2b-53570797a808', 'ec5f8f3e-d403-4f6b-8d9c-8def8ad1e0d2', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'Nice!', '2025-07-05 01:00:57'),
('ec486573-d101-4964-9ff6-e5d8b70ae4bb', '7c06f948-2b02-441d-90fa-34884f4e57a9', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'Bardzo się starałem, aby zrobić ten utwór jak najlepiej!', '2025-06-29 15:39:54');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `favourites`
--

CREATE TABLE `favourites` (
  `idFavourite` char(36) NOT NULL,
  `idUser` char(36) NOT NULL,
  `idSong` char(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favourites`
--

INSERT INTO `favourites` (`idFavourite`, `idUser`, `idSong`, `created_at`) VALUES
('84e7954e-4c91-454c-af27-d71f34fa32dd', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'ec5f8f3e-d403-4f6b-8d9c-8def8ad1e0d2', '2025-07-05 01:01:02');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `lastplayedsongs`
--

CREATE TABLE `lastplayedsongs` (
  `idLastPlayedSong` char(36) NOT NULL,
  `idUser` char(36) NOT NULL,
  `idSong` char(36) NOT NULL,
  `lastPlayed` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lastplayedsongs`
--

INSERT INTO `lastplayedsongs` (`idLastPlayedSong`, `idUser`, `idSong`, `lastPlayed`) VALUES
('1ace9a06-b3e7-400f-8db0-a024dc5b7665', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '7c06f948-2b02-441d-90fa-34884f4e57a9', '2025-06-30 21:45:27'),
('2748ca22-6fe1-4e6a-ba96-e0c67bedcfc7', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '7120755b-671b-41b7-9682-0e48baf47d1c', '2025-07-05 01:01:26'),
('2eab7b13-db7f-4b5c-92ad-e07e1efa462c', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '7c06f948-2b02-441d-90fa-34884f4e57a9', '2025-07-02 13:21:02'),
('2facb9d5-4d14-49ec-ba0c-7abbccd92ea6', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '7120755b-671b-41b7-9682-0e48baf47d1c', '2025-06-30 21:54:59'),
('426f5df9-2c2a-4360-959c-29c26dd46618', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', '10e997a9-91c9-4db6-9385-3e881b34691c', '2025-07-05 01:01:25'),
('7db33399-06ea-4f6c-864d-c77be1ba4269', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '10e997a9-91c9-4db6-9385-3e881b34691c', '2025-06-30 21:56:42'),
('e4f79561-144b-4cda-a01c-8015b82e3a85', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', 'ec5f8f3e-d403-4f6b-8d9c-8def8ad1e0d2', '2025-07-05 01:01:27');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ratings`
--

CREATE TABLE `ratings` (
  `idRating` char(36) NOT NULL,
  `idUser` char(36) NOT NULL,
  `idSong` char(36) NOT NULL,
  `rating` int(11) NOT NULL
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
  `idRole` char(36) NOT NULL,
  `name` varchar(50) NOT NULL
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
  `default_bpm` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `tablature` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `deleted_by_idUser` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `average_rating` decimal(3,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`idSong`, `idUser`, `title`, `default_bpm`, `created_at`, `updated_at`, `tablature`, `deleted_by_idUser`, `average_rating`) VALUES
('10e997a9-91c9-4db6-9385-3e881b34691c', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'Nowy utwór', 120, '2025-06-30 21:47:06', '2025-07-05 00:28:19', '[[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":1,\"duration\":\"4n\"}]]', NULL, 0.00),
('7120755b-671b-41b7-9682-0e48baf47d1c', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'Story', 120, '2025-06-29 15:45:55', '2025-06-29 15:45:55', '[[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":4,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":6,\"duration\":\"1n\"}],[{\"guitarString\":2,\"guitarFret\":8,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"2n\"}],[{\"guitarString\":3,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"2n\"}],[{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":5,\"guitarFret\":0,\"duration\":\"4n\"},{\"guitarString\":4,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":3,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":2,\"guitarFret\":2,\"duration\":\"4n\"},{\"guitarString\":1,\"guitarFret\":0,\"duration\":\"4n\"}]]', NULL, 0.00),
('7c06f948-2b02-441d-90fa-34884f4e57a9', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', 'Testowy utwór użytkownika', 120, '2025-06-29 15:37:16', '2025-06-29 15:37:16', '[[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":7,\"duration\":\"4n\"}]]', NULL, 0.00),
('ec5f8f3e-d403-4f6b-8d9c-8def8ad1e0d2', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', 'Od góry do dołu', 120, '2025-07-02 13:18:53', '2025-07-05 00:28:40', '[[{\"guitarString\":1,\"guitarFret\":9,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":8,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":7,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":6,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":5,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":1,\"duration\":\"4n\"}]]', NULL, 0.00);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `songshistory`
--

CREATE TABLE `songshistory` (
  `idHistory` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `idSong` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `version_number` int(11) NOT NULL,
  `tablature` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `edited_by_idUser` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `edited_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `idUser` char(36) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password_hash` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `isActivated` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `average_published_song_rating` decimal(3,2) NOT NULL,
  `number_of_ratings_received` int(11) NOT NULL,
  `activationToken` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`idUser`, `username`, `password_hash`, `email`, `isActivated`, `created_at`, `average_published_song_rating`, `number_of_ratings_received`, `activationToken`) VALUES
('22500f9a-992e-4250-845a-d7ac5e460843', 'kolejny1', '$2b$10$jUNMktWYrJT8m3tR4zqUFOMek.xmfUbEnadFaTRDIh8LRg/pPIr6C', 'kolejny1@tlen.pl', 1, '2025-06-30 21:39:29', 0.00, 0, NULL),
('53c583a0-e475-4031-9461-9da45e1bd760', 'nowyUzytkownik', '$2b$10$X3Yvru2nI0ZQ0prSYVT3XeO11m43zE2W/1/t8toDnQPAy0r3/Gr1e', 'nowyUzytkownik@uzytkownik.pl', 1, '2025-06-29 15:15:10', 0.00, 0, NULL),
('65fd4127-9967-4880-9e0a-aaab35541522', 'nowyUzytkownik1', '$2b$10$WrQWga40fdo4nJSaKkLoUeHGsDN5BkhMskTk4jkdtE66EXrpjGZ9q', 'nowy@uzytkownik.pl', 1, '2025-07-02 01:47:08', 0.00, 0, NULL),
('6e2f2c6c-c62b-4c4a-9e74-7284a84f0548', 'moderator', '$2b$10$qHq6zJFtH0oopYwf9LIQNOpzebpp.Z4V5ZJy2p85sB7C4TIukwKlW', 'strange2409@gmail.com', 1, '2025-07-05 01:02:06', 0.00, 0, NULL),
('b58597f1-20a8-4e91-ad5f-0e79a8f220af', 'admin', '$2b$10$ulSzO78yKbZiV7uI4UhUPOLSJodftcQK/x5V.Qx2Dm4BMuJrBzO3O', 'admin@admin.pl', 1, '2025-06-15 22:07:25', 0.00, 0, NULL),
('ed0d1939-0179-4969-bce5-71adaedfd9e5', 'uzytkownik', '$2b$10$7IE4JbDIFrlKkgzhPR0iF.9g5B4r2ZvTLDp7QdLxr4GwU2ruQamFO', 'uzytkownik@uzytkownik.pl', 1, '2025-06-15 22:15:34', 4.33, 3, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users_roles`
--

CREATE TABLE `users_roles` (
  `idUser_role` char(36) NOT NULL,
  `idUser` char(36) NOT NULL,
  `idRole` char(36) NOT NULL,
  `assigned_at` datetime NOT NULL DEFAULT current_timestamp(),
  `assigned_by` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_roles`
--

INSERT INTO `users_roles` (`idUser_role`, `idUser`, `idRole`, `assigned_at`, `assigned_by`) VALUES
('126e41ff-941c-40e5-b4d7-84658b535b38', 'ed0d1939-0179-4969-bce5-71adaedfd9e5', '51d021c2-5c03-406a-8f47-f10cdc93794b', '2025-07-05 02:15:11', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af'),
('2b0dd210-d175-495d-8c38-ffea9a6b882e', '22500f9a-992e-4250-845a-d7ac5e460843', '51d021c2-5c03-406a-8f47-f10cdc93794b', '2025-07-05 02:15:07', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af'),
('2b524b94-ad3a-4d57-af7c-3c0cb8b39fc8', '65fd4127-9967-4880-9e0a-aaab35541522', '51d021c2-5c03-406a-8f47-f10cdc93794b', '2025-07-05 03:02:45', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af'),
('6cd91b92-d732-45d5-8c6e-53758dfda6c5', '6e2f2c6c-c62b-4c4a-9e74-7284a84f0548', '55a82b5a-a9ed-4b80-b993-c83ee3c38878', '2025-07-05 03:02:41', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af'),
('7823610c-4b68-4451-ac0e-3348203c8c03', '53c583a0-e475-4031-9461-9da45e1bd760', '51d021c2-5c03-406a-8f47-f10cdc93794b', '2025-07-05 03:02:48', 'b58597f1-20a8-4e91-ad5f-0e79a8f220af'),
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
-- Constraints for table `songshistory`
--
ALTER TABLE `songshistory`
  ADD CONSTRAINT `SongsHistory_Songs` FOREIGN KEY (`idSong`) REFERENCES `songs` (`idSong`) ON DELETE CASCADE,
  ADD CONSTRAINT `SongsHistory_Users` FOREIGN KEY (`edited_by_idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE;

--
-- Constraints for table `users_roles`
--
ALTER TABLE `users_roles`
  ADD CONSTRAINT `fk_user_roles_assigned_by` FOREIGN KEY (`assigned_by`) REFERENCES `users` (`idUser`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_user_roles_role` FOREIGN KEY (`idRole`) REFERENCES `roles` (`idRole`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_user_roles_user` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE;
--
-- Database: `phpmyadmin`
--
CREATE DATABASE IF NOT EXISTS `phpmyadmin` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `phpmyadmin`;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pma__bookmark`
--

CREATE TABLE `pma__bookmark` (
  `id` int(10) UNSIGNED NOT NULL,
  `dbase` varchar(255) NOT NULL DEFAULT '',
  `user` varchar(255) NOT NULL DEFAULT '',
  `label` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `query` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Bookmarks';

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pma__central_columns`
--

CREATE TABLE `pma__central_columns` (
  `db_name` varchar(64) NOT NULL,
  `col_name` varchar(64) NOT NULL,
  `col_type` varchar(64) NOT NULL,
  `col_length` text DEFAULT NULL,
  `col_collation` varchar(64) NOT NULL,
  `col_isNull` tinyint(1) NOT NULL,
  `col_extra` varchar(255) DEFAULT '',
  `col_default` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Central list of columns';

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pma__column_info`
--

CREATE TABLE `pma__column_info` (
  `id` int(5) UNSIGNED NOT NULL,
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `column_name` varchar(64) NOT NULL DEFAULT '',
  `comment` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `mimetype` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `transformation` varchar(255) NOT NULL DEFAULT '',
  `transformation_options` varchar(255) NOT NULL DEFAULT '',
  `input_transformation` varchar(255) NOT NULL DEFAULT '',
  `input_transformation_options` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Column information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pma__designer_settings`
--

CREATE TABLE `pma__designer_settings` (
  `username` varchar(64) NOT NULL,
  `settings_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Settings related to Designer';

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pma__export_templates`
--

CREATE TABLE `pma__export_templates` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL,
  `export_type` varchar(10) NOT NULL,
  `template_name` varchar(64) NOT NULL,
  `template_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved export templates';

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pma__favorite`
--

CREATE TABLE `pma__favorite` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Favorite tables';

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pma__history`
--

CREATE TABLE `pma__history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db` varchar(64) NOT NULL DEFAULT '',
  `table` varchar(64) NOT NULL DEFAULT '',
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp(),
  `sqlquery` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='SQL history for phpMyAdmin';

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pma__navigationhiding`
--

CREATE TABLE `pma__navigationhiding` (
  `username` varchar(64) NOT NULL,
  `item_name` varchar(64) NOT NULL,
  `item_type` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Hidden items of navigation tree';

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pma__pdf_pages`
--

CREATE TABLE `pma__pdf_pages` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `page_nr` int(10) UNSIGNED NOT NULL,
  `page_descr` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='PDF relation pages for phpMyAdmin';

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pma__recent`
--

CREATE TABLE `pma__recent` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Recently accessed tables';

--
-- Dumping data for table `pma__recent`
--

INSERT INTO `pma__recent` (`username`, `tables`) VALUES
('root', '[{\"db\":\"m1349_webgitara\",\"table\":\"roles\"},{\"db\":\"m1349_webgitara\",\"table\":\"users_roles\"},{\"db\":\"m1349_webgitara\",\"table\":\"users\"},{\"db\":\"m1349_webgitara\",\"table\":\"songshistory\"},{\"db\":\"m1349_webgitara\",\"table\":\"songs\"},{\"db\":\"m1349_webgitara\",\"table\":\"ratings\"},{\"db\":\"m1349_webgitara\",\"table\":\"lastplayedsongs\"},{\"db\":\"m1349_webgitara\",\"table\":\"favourites\"},{\"db\":\"m1349_webgitara\",\"table\":\"comments\"},{\"db\":\"webgitara\",\"table\":\"users\"}]');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pma__relation`
--

CREATE TABLE `pma__relation` (
  `master_db` varchar(64) NOT NULL DEFAULT '',
  `master_table` varchar(64) NOT NULL DEFAULT '',
  `master_field` varchar(64) NOT NULL DEFAULT '',
  `foreign_db` varchar(64) NOT NULL DEFAULT '',
  `foreign_table` varchar(64) NOT NULL DEFAULT '',
  `foreign_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Relation table';

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pma__savedsearches`
--

CREATE TABLE `pma__savedsearches` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `search_name` varchar(64) NOT NULL DEFAULT '',
  `search_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved searches';

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pma__table_coords`
--

CREATE TABLE `pma__table_coords` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `pdf_page_number` int(11) NOT NULL DEFAULT 0,
  `x` float UNSIGNED NOT NULL DEFAULT 0,
  `y` float UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table coordinates for phpMyAdmin PDF output';

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pma__table_info`
--

CREATE TABLE `pma__table_info` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `display_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pma__table_uiprefs`
--

CREATE TABLE `pma__table_uiprefs` (
  `username` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `prefs` text NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Tables'' UI preferences';

--
-- Dumping data for table `pma__table_uiprefs`
--

INSERT INTO `pma__table_uiprefs` (`username`, `db_name`, `table_name`, `prefs`, `last_update`) VALUES
('root', 'm1349_webgitara', 'users', '{\"sorted_col\":\"`users`.`idUser` ASC\"}', '2025-07-04 22:57:41'),
('root', 'webgitara', 'users', '{\"CREATE_TIME\":\"2025-06-13 23:52:11\",\"col_order\":[0,1,2,3,4,5,6,7,8,9],\"col_visib\":[1,1,1,1,1,1,1,1,1,1]}', '2025-07-02 10:42:40');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pma__tracking`
--

CREATE TABLE `pma__tracking` (
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `version` int(10) UNSIGNED NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `schema_snapshot` text NOT NULL,
  `schema_sql` text DEFAULT NULL,
  `data_sql` longtext DEFAULT NULL,
  `tracking` set('UPDATE','REPLACE','INSERT','DELETE','TRUNCATE','CREATE DATABASE','ALTER DATABASE','DROP DATABASE','CREATE TABLE','ALTER TABLE','RENAME TABLE','DROP TABLE','CREATE INDEX','DROP INDEX','CREATE VIEW','ALTER VIEW','DROP VIEW') DEFAULT NULL,
  `tracking_active` int(1) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Database changes tracking for phpMyAdmin';

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pma__userconfig`
--

CREATE TABLE `pma__userconfig` (
  `username` varchar(64) NOT NULL,
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `config_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User preferences storage for phpMyAdmin';

--
-- Dumping data for table `pma__userconfig`
--

INSERT INTO `pma__userconfig` (`username`, `timevalue`, `config_data`) VALUES
('root', '2025-07-05 22:31:27', '{\"Console\\/Mode\":\"show\",\"lang\":\"pl\",\"Console\\/Height\":257.9864}');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pma__usergroups`
--

CREATE TABLE `pma__usergroups` (
  `usergroup` varchar(64) NOT NULL,
  `tab` varchar(64) NOT NULL,
  `allowed` enum('Y','N') NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User groups with configured menu items';

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pma__users`
--

CREATE TABLE `pma__users` (
  `username` varchar(64) NOT NULL,
  `usergroup` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Users and their assignments to user groups';

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `pma__central_columns`
--
ALTER TABLE `pma__central_columns`
  ADD PRIMARY KEY (`db_name`,`col_name`);

--
-- Indeksy dla tabeli `pma__column_info`
--
ALTER TABLE `pma__column_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `db_name` (`db_name`,`table_name`,`column_name`);

--
-- Indeksy dla tabeli `pma__designer_settings`
--
ALTER TABLE `pma__designer_settings`
  ADD PRIMARY KEY (`username`);

--
-- Indeksy dla tabeli `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_user_type_template` (`username`,`export_type`,`template_name`);

--
-- Indeksy dla tabeli `pma__favorite`
--
ALTER TABLE `pma__favorite`
  ADD PRIMARY KEY (`username`);

--
-- Indeksy dla tabeli `pma__history`
--
ALTER TABLE `pma__history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`,`db`,`table`,`timevalue`);

--
-- Indeksy dla tabeli `pma__navigationhiding`
--
ALTER TABLE `pma__navigationhiding`
  ADD PRIMARY KEY (`username`,`item_name`,`item_type`,`db_name`,`table_name`);

--
-- Indeksy dla tabeli `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  ADD PRIMARY KEY (`page_nr`),
  ADD KEY `db_name` (`db_name`);

--
-- Indeksy dla tabeli `pma__recent`
--
ALTER TABLE `pma__recent`
  ADD PRIMARY KEY (`username`);

--
-- Indeksy dla tabeli `pma__relation`
--
ALTER TABLE `pma__relation`
  ADD PRIMARY KEY (`master_db`,`master_table`,`master_field`),
  ADD KEY `foreign_field` (`foreign_db`,`foreign_table`);

--
-- Indeksy dla tabeli `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_savedsearches_username_dbname` (`username`,`db_name`,`search_name`);

--
-- Indeksy dla tabeli `pma__table_coords`
--
ALTER TABLE `pma__table_coords`
  ADD PRIMARY KEY (`db_name`,`table_name`,`pdf_page_number`);

--
-- Indeksy dla tabeli `pma__table_info`
--
ALTER TABLE `pma__table_info`
  ADD PRIMARY KEY (`db_name`,`table_name`);

--
-- Indeksy dla tabeli `pma__table_uiprefs`
--
ALTER TABLE `pma__table_uiprefs`
  ADD PRIMARY KEY (`username`,`db_name`,`table_name`);

--
-- Indeksy dla tabeli `pma__tracking`
--
ALTER TABLE `pma__tracking`
  ADD PRIMARY KEY (`db_name`,`table_name`,`version`);

--
-- Indeksy dla tabeli `pma__userconfig`
--
ALTER TABLE `pma__userconfig`
  ADD PRIMARY KEY (`username`);

--
-- Indeksy dla tabeli `pma__usergroups`
--
ALTER TABLE `pma__usergroups`
  ADD PRIMARY KEY (`usergroup`,`tab`,`allowed`);

--
-- Indeksy dla tabeli `pma__users`
--
ALTER TABLE `pma__users`
  ADD PRIMARY KEY (`username`,`usergroup`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__column_info`
--
ALTER TABLE `pma__column_info`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__history`
--
ALTER TABLE `pma__history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  MODIFY `page_nr` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- Database: `test`
--
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `test`;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
