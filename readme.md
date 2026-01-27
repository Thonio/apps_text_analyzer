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

