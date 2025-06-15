-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Cze 15, 2025 at 03:49 AM
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
-- Database: `webgitara`
--

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
('07083058-48ad-4df0-8b12-18d1c588bd50', 'afb405d6-cde5-4003-9465-45b4f9433f4f', '138413cc-b931-4490-bc96-c6809390aee8', 'Test', '2025-06-14 21:02:39'),
('4fb886b2-0fdf-4cc4-b10c-b3aca098f3cf', 'afb405d6-cde5-4003-9465-45b4f9433f4f', '138413cc-b931-4490-bc96-c6809390aee8', 'Dwa', '2025-06-14 21:04:47');

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
('0c01061e-3148-4812-92d7-07aba11468d3', '138413cc-b931-4490-bc96-c6809390aee8', 'ff7fbe1f-d572-462f-a606-01a39141f1be', '2025-06-14 22:55:20'),
('1a4e764a-aced-43f5-ad16-88576492e2c4', '138413cc-b931-4490-bc96-c6809390aee8', '0b6887a7-ca79-44d2-9248-ff690f3d3039', '2025-06-14 22:55:20'),
('282e3b04-9cdd-465d-92db-8249d011a0a3', '4d8dd577-a9b0-466d-9e2d-2867ec751709', '0b6887a7-ca79-44d2-9248-ff690f3d3039', '2025-06-14 23:25:56');

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
('0657a876-22aa-4741-a656-bb5e6feca26f', '138413cc-b931-4490-bc96-c6809390aee8', 'ff7fbe1f-d572-462f-a606-01a39141f1be', '2025-06-14 21:43:24'),
('091c1b36-d2ac-4daf-9b34-ac55371a298b', '4d8dd577-a9b0-466d-9e2d-2867ec751709', 'afb405d6-cde5-4003-9465-45b4f9433f4f', '2025-06-14 23:25:03'),
('10c0fea7-4d85-45af-aa0b-09e0f7152e4f', '4d8dd577-a9b0-466d-9e2d-2867ec751709', '58b65593-d8ba-4ef4-9cfd-8de0452184e8', '2025-06-14 23:26:34'),
('246126e1-3fdc-41e0-828e-641d2d53230b', '138413cc-b931-4490-bc96-c6809390aee8', 'afb405d6-cde5-4003-9465-45b4f9433f4f', '2025-06-14 21:43:24'),
('59468c57-2952-4792-8430-e7d9026c1cc0', '138413cc-b931-4490-bc96-c6809390aee8', '0b6887a7-ca79-44d2-9248-ff690f3d3039', '2025-06-14 22:12:55'),
('61a966be-4807-498b-9e0d-dad2747c1825', '4d8dd577-a9b0-466d-9e2d-2867ec751709', 'ff7fbe1f-d572-462f-a606-01a39141f1be', '2025-06-14 23:25:06'),
('747fbf4f-08e1-4c88-9620-ffcbf526c2ad', '4d8dd577-a9b0-466d-9e2d-2867ec751709', '0b6887a7-ca79-44d2-9248-ff690f3d3039', '2025-06-14 23:24:48');

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
('43d7f7f6-1baa-49d1-af4e-c447c14c3764', '138413cc-b931-4490-bc96-c6809390aee8', '0b6887a7-ca79-44d2-9248-ff690f3d3039', 4),
('4e5139c4-500b-4fd7-a4db-bacb1f3284aa', '138413cc-b931-4490-bc96-c6809390aee8', 'ff7fbe1f-d572-462f-a606-01a39141f1be', 4),
('cc80ea12-69f7-4917-8fdc-72e83eb4afe9', '138413cc-b931-4490-bc96-c6809390aee8', 'afb405d6-cde5-4003-9465-45b4f9433f4f', 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `songs`
--

CREATE TABLE `songs` (
  `idSong` char(36) NOT NULL,
  `idUser` char(36) NOT NULL,
  `title` varchar(40) NOT NULL,
  `default_bpm` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `tablature` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`tablature`)),
  `deleted_by_idUser` char(36) DEFAULT NULL,
  `average_rating` decimal(3,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`idSong`, `idUser`, `title`, `default_bpm`, `created_at`, `updated_at`, `tablature`, `deleted_by_idUser`, `average_rating`) VALUES
('0b6887a7-ca79-44d2-9248-ff690f3d3039', '138413cc-b931-4490-bc96-c6809390aee8', 'Test', 120, '2025-06-14 21:09:23', '2025-06-14 21:09:23', '[[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}]]', NULL, 0.00),
('58b65593-d8ba-4ef4-9cfd-8de0452184e8', '4d8dd577-a9b0-466d-9e2d-2867ec751709', 'Test rytmiki', 120, '2025-06-14 23:26:31', '2025-06-14 23:26:31', '[[{\"guitarString\":1,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":4,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"1n\"}],[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"1n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}]]', NULL, 0.00),
('afb405d6-cde5-4003-9465-45b4f9433f4f', '138413cc-b931-4490-bc96-c6809390aee8', 'Test utworu', 120, '2025-06-14 18:33:05', '2025-06-14 21:37:50', '[[{\"guitarString\":1,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":1,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":2,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":24,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":24,\"duration\":\"4n\"}]]', NULL, 0.00),
('ff7fbe1f-d572-462f-a606-01a39141f1be', '138413cc-b931-4490-bc96-c6809390aee8', 'Test2', 120, '2025-06-14 21:05:33', '2025-06-14 21:43:18', '[[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":3,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":24,\"duration\":\"4n\"}],[{\"guitarString\":1,\"guitarFret\":24,\"duration\":\"4n\"}]]', NULL, 0.00);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `songshistory`
--

CREATE TABLE `songshistory` (
  `idHistory` char(36) NOT NULL,
  `idSong` char(36) NOT NULL,
  `version_number` int(11) NOT NULL,
  `tablature` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`tablature`)),
  `edited_by_idUser` char(36) NOT NULL,
  `edited_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `idUser` char(36) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password_hash` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `isModerator` tinyint(1) NOT NULL,
  `isActivated` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `average_published_song_rating` decimal(3,2) NOT NULL,
  `number_of_ratings_received` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`idUser`, `username`, `password_hash`, `email`, `isAdmin`, `isModerator`, `isActivated`, `created_at`, `average_published_song_rating`, `number_of_ratings_received`) VALUES
('138413cc-b931-4490-bc96-c6809390aee8', 'f', '$2b$10$Rdb.DcBgsL9tC9O8dbZk8.S0WpCjQ9YmPHra9fNogN187b7MXXF8q', 'f@f.pl', 1, 0, 1, '2025-06-14 18:23:42', 3.67, 3),
('4d8dd577-a9b0-466d-9e2d-2867ec751709', 'h', '$2b$10$zZ11QV0drGF4k7Rfk7fHCuNKYZRje0MCiLFahsxzx.x5M7qgEipzi', 'h@h.pl', 0, 1, 1, '2025-06-14 17:57:23', 0.00, 0),
('92131802-ab6a-4105-89fb-8ab9ba14205a', 'dbTest', '$2b$10$Q4g3/b3C.9rr06ZQAuXF4OKtufXbc1U/quQXPW.mwzuYf54d0F0Re', 'test@test.pl', 0, 0, 1, '2025-06-14 00:54:28', 0.00, 0),
('962e7db7-23e9-446a-8a85-3b43524fec30', 'dbHej', '$2b$10$ODFC0VHXU76P.0GfzD3t5epETMmi08Oe9wcltRIUB2rtBty3/WBjS', 'dbHej@gmail.com', 0, 0, 1, '2025-06-14 01:10:12', 0.00, 0),
('973c8b87-5f1a-4d16-8aec-d4951131e0db', 'test', '$2b$10$H27JqQLGzFsJC5qNve8EN.ajN.CvoKAGZQZH6qS03XqLhkW9yN.rq', 'test@test.pl', 0, 0, 1, '2025-06-14 01:50:23', 0.00, 0),
('af2f563a-5bc2-43be-aed2-5393f3d9be39', 'hej', '$2b$10$hHa2x5rnCRXv2YacU8VvY.cSrCjlY.4kgmeoyIrZgsytEe1lIdY52', 'hej@hej.pl', 0, 0, 1, '2025-06-14 18:20:04', 0.00, 0),
('b0376ccf-4e03-4ae5-bd81-de3f0557ccf4', 'testAdmin', '$2b$10$1edwk6FJ8jpJQqxne6j6oOZyQxPghs/2hC3dSa2Hzs/IVmXtuXqle', 'testAdmin@test.pl', 0, 0, 1, '2025-06-14 17:53:41', 0.00, 0),
('d56149b2-4762-45e4-bf4d-ce51624af63c', 'b', '$2b$10$KShGLcEmQDu0xqpbontqRuvvv0Umx/cLkjzac2RDJSI7JB/0Rsqhe', 'b@mail.com', 0, 0, 1, '2025-06-14 01:27:01', 0.00, 0),
('e70b0a6d-8cd2-4717-9c1a-1e9a3d0251b1', 'adminTest', '$2b$10$N8vsAMo/GQ/3zyGs.aB3yuq/OWkKd1diEMUXryIEohedMjQC5/UlS', 'adminTest@test.pl', 0, 0, 1, '2025-06-14 17:54:58', 0.00, 0);

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
  ADD CONSTRAINT `Comments_Songs` FOREIGN KEY (`idSong`) REFERENCES `songs` (`idSong`),
  ADD CONSTRAINT `Comments_Users` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`);

--
-- Constraints for table `favourites`
--
ALTER TABLE `favourites`
  ADD CONSTRAINT `Favourites_Songs` FOREIGN KEY (`idSong`) REFERENCES `songs` (`idSong`),
  ADD CONSTRAINT `Favourites_Users` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`);

--
-- Constraints for table `lastplayedsongs`
--
ALTER TABLE `lastplayedsongs`
  ADD CONSTRAINT `LastPlayedSong_Songs` FOREIGN KEY (`idSong`) REFERENCES `songs` (`idSong`),
  ADD CONSTRAINT `LastPlayedSong_Users` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`);

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `Ratings_Songs` FOREIGN KEY (`idSong`) REFERENCES `songs` (`idSong`),
  ADD CONSTRAINT `Ratings_Users` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`);

--
-- Constraints for table `songs`
--
ALTER TABLE `songs`
  ADD CONSTRAINT `Songs_Deleted_By` FOREIGN KEY (`deleted_by_idUser`) REFERENCES `users` (`idUser`),
  ADD CONSTRAINT `Songs_Users` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`);

--
-- Constraints for table `songshistory`
--
ALTER TABLE `songshistory`
  ADD CONSTRAINT `SongsHistory_Songs` FOREIGN KEY (`idSong`) REFERENCES `songs` (`idSong`),
  ADD CONSTRAINT `SongsHistory_Users` FOREIGN KEY (`edited_by_idUser`) REFERENCES `users` (`idUser`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
