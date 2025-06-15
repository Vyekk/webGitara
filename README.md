# Instrukcja uruchomienia aplikacji

## Wymagania wstępne

- Node.js oraz npm zainstalowane na komputerze
- (Opcjonalnie) Zainstalowany nodemon:  
  npm install -g nodemon

## Instalacja zależności

W głównym katalogu projektu uruchom:
```
npm install
```

## Uruchomienie frontendu (React)

1. Przejdź do katalogu z frontendem, np.:
   ```
   cd src
   ```
2. Uruchom aplikację:
   ```
   npm start
   ```

## Uruchomienie backendu (Node.js)

1. Przejdź do katalogu backendu, np.:
   ```
   cd backend/src
   ```
2. Uruchom serwer (przykład z nodemon):
   ```
   npx nodemon server.ts
   ```

## Baza danych

W pliku `webgitara_test.sql` znajduje się kod do utworzenia bazy danych. Zaimportuj ten plik do swojej bazy danych przed uruchomieniem aplikacji.
