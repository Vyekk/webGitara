# Podstawowe kroki uruchomienia projektu

1. Sklonuj repozytorium:

   ```bash
   git clone <adres_repozytorium>
   ```

2. Przejdź do katalogu projektu:

   ```bash
   cd webGitara
   ```

3. Zainstaluj zależności dla frontendu i backendu:

   ```bash
   npm install
   cd backend
   npm install
   ```

---
# Instrukcja uruchomienia aplikacji przez Dockera

## Wymagania wstępne

- Zainstalowany [Docker](https://www.docker.com/get-started)
- (Opcjonalnie) [Docker Compose](https://docs.docker.com/compose/)

## Szybki start

1. Otwórz terminal w katalogu głównym projektu (`webGitara`).
2. Uruchom polecenie:

   ```powershell
   docker-compose up --build
   ```

   lub jeśli nie masz docker-compose:

   ```powershell
   docker compose up --build
   ```

3. Po zbudowaniu i uruchomieniu kontenerów:
   - Frontend będzie dostępny pod adresem: [http://localhost:3000](http://localhost:3000)
   - Backend (API) będzie dostępny pod adresem: [http://localhost:5000](http://localhost:5000) (lub innym, jeśli zmieniono porty w docker-compose.yml)

4. (Opcjonalnie) Aby zaimportować bazę danych do kontenera MySQL:

   Skopiuj plik bazy danych do kontenera:

   ```powershell
   docker cp m1349_webGitara.sql webgitara-mysql:/import.sql
   ```

   Wejdź do kontenera:

   ```powershell
   docker exec -it webgitara-mysql bash
   ```

   Następnie zaimportuj bazę poleceniem:

   ```bash
   mysql -u root -p mydatabase < /import.sql
   ```

   Po pojawieniu się prośby o hasło wpisz: `rootpassword`

   Wyjdź z kontenera poleceniem:

   ```bash
   exit
   ```

5. Aby zatrzymać kontenery, użyj:

   ```powershell
   docker-compose down
   ```

---
