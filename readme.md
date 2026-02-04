# Analyse de texte — Application full-stack

Ce projet est une application full-stack permettant d’analyser un texte et de lui attribuer une note entre **0 et 100** selon des règles simples.  
L’architecture est volontairement découpée pour illustrer une séparation claire des responsabilités.

---

### Rôles des briques

- **Frontend (React)**  
  Interface utilisateur :
  - saisie du texte
  - affichage du score
  - affichage de l’historique

- **API (NestJS)**  
  - endpoint `/api/analyze` pour analyser et persister un texte
  - endpoint `/api/history` pour récupérer l’historique
  - communication avec la base de données via Prisma

- **Analyzer (module isolé)**  
  - logique pure d’analyse de texte
  - aucune dépendance réseau ou base de données
  - utilisé par l’API

---

## ⚙️ Prérequis

- Node.js ≥ 18
- npm ou yarn
- Git

---

## 🚀 Installation

### 1️⃣ Cloner le projet

```bash
git clone <repo-url>
cd <repo-name>
```

### 2️⃣ Installer les dépendances

## Frontend

```bash
cd apps/frontend
npm install
```

## API

```bash
cd apps/api
npm install
```

## ANALYZE

```bash
cd apps/analyze
npm install
```

### 🗄️ Base de données (SQLite + Prisma)

L’application utilise SQLite en local.

## 1️⃣ Créer le fichier .env dans api/

```bash
DATABASE_URL="file:./dev.db"
```

## 2️⃣ Générer le client Prisma
```bash
npx prisma generate
```

## 3️⃣ Appliquer les migrations
```bash
npx prisma migrate dev
```

Cela :

crée la base dev.db

applique le schéma

rend l’API prête à écrire/lire des données

## ▶️ Lancer l’application

Depuis analyze/ :
```bash
npm run dev
```

Microservice disponible sur :

`http://localhost:4000`

API (NestJS)

Depuis api/ :
```bash
npm run start:dev
```

API disponible sur :

`http://localhost:3000`

Frontend (React)

Depuis `frontend/` :
```bash
npm run dev
```

Frontend disponible sur :

`http://localhost:5173`
