# Ordre d’implémentation – Projet MEDOC

Ce document définit **l’ordre exact et logique d’implémentation** des fonctionnalités du projet MEDOC.

Objectifs :
- Respecter **YAGNI**
- Construire une base **solide et évolutive**
- Permettre à un agent IA ou un développeur humain de travailler **sans ambiguïté**

⚠️ Règle : **Aucune étape ne doit être sautée**.

---

## PHASE 0 – Préparation (obligatoire)

### 0.1 Lecture & compréhension
- Lire intégralement le cahier des charges (Markdown principal)
- Lire le prompt d’accompagnement
- Comprendre les contraintes locales (confidentialité pharmacies)

### 0.2 Audit du projet existant
- Vérifier la structure Next.js existante
- Identifier :
  - pages déjà créées
  - composants existants
- Ne rien supprimer sans justification

---

## PHASE 1 – Fondations techniques

### 1.1 Configuration TypeScript stricte

- Activer `strict: true`
- Interdire `any`
- Créer dossier `/types`

---

### 1.2 Architecture globale du projet

Créer (sans implémentation métier) :

```
/app
/components
/features
/lib
/types
/app/api/v1
  ├── controllers
  ├── services
  ├── repositories
  ├── middlewares
```

---

### 1.3 Design system (UI de base)

Créer les composants atomiques :
- Button
- Input
- Card
- Badge
- Modal
- Rating
- MapContainer

⚠️ Aucun dégradé
⚠️ Style sobre

---

## PHASE 2 – Backend Core (API v1)

### 2.1 Standardisation des réponses API

- Créer un `ApiResponse<T>`
- Middleware global de réponse

---

### 2.2 Middlewares backend

- Auth middleware
- Role middleware
- Error handler

---

### 2.3 Authentification

- Inscription utilisateur
- Connexion utilisateur
- Connexion admin
- Connexion pharmacie

⚠️ Pas d’inscription pharmacie publique

---

## PHASE 3 – Modèles & logique métier

### 3.1 Modèles Prisma (sans DB réelle)

Créer les modèles :
- User
- Admin
- Pharmacy
- Medication
- PharmacyMedication
- Review
- Favorite

---

### 3.2 Services métier

- SearchService
- PharmacyService
- UserService
- AdminService

⚠️ Logique métier uniquement ici

---

## PHASE 4 – Fonctionnalité CORE : Recherche

### 4.1 Recherche inversée

- Input : médicament
- Output : pharmacies

Données retournées :
- Nom pharmacie
- Localisation
- Disponibilité OUI/NON
- Note moyenne

---

### 4.2 API Search

- `GET /api/v1/search`
- Validation des inputs
- Tests locaux

---

## PHASE 5 – Frontend : Parcours public

### 5.1 Page recherche

- Champ de recherche
- Liste de pharmacies
- UX simple

---

### 5.2 Page pharmacie (map-first)

- Carte plein écran
- Pharmacie centrée
- Scroll vers infos

---

## PHASE 6 – Utilisateur connecté (léger)

### 6.1 Auth UI

- Login
- Register

---

### 6.2 Espace personnel

- Infos personnelles
- Favoris

---

## PHASE 7 – Dashboard Pharmacie

### 7.1 Accès sécurisé

- Protection par rôle
- Redirection automatique

---

### 7.2 Fonctionnalités internes

- Gestion médicaments (interne)
- Disponibilité OUI/NON
- Statistiques simples

---

## PHASE 8 – Dashboard Admin

### 8.1 Gestion pharmacies

- Création pharmacie
- Validation
- Suspension

---

### 8.2 Référentiel médicaments

- CRUD médicaments
- Anti-doublons

---

## PHASE 9 – Sécurité & conformité

- Vérification des permissions
- Audit des données exposées
- Protection routes sensibles

---

## PHASE 10 – Tests & qualité

- Tests unitaires services
- Testeurs API locaux
- Vérification TypeScript

---

## PHASE 11 – DevOps

- Docker (dev + prod)
- GitHub Actions :
  - lint
  - build
  - tests

---


## PHASE 12 – Workflows avancés ADMIN (POST-MVP)

### 12.1 Workflow de validation avancée des pharmacies

- Revue manuelle des informations
- Historique des validations
- Commentaire interne admin (non visible pharmacie)

### 12.2 Gestion des accès admin

- Rôles admin (SUPER_ADMIN / ADMIN)
- Journal des actions admin

### 12.3 Suspension & réactivation

- Suspension temporaire
- Réactivation conditionnelle
- Blocage immédiat de connexion

---

## PHASE 13 – Workflows avancés PHARMACIE (POST-MVP)

### 13.1 Profil pharmacie interne

- Modification infos internes
- Horaires
- Contact interne

### 13.2 Gestion avancée disponibilité

- Indisponibilité temporaire
- Historique des changements

### 13.3 Analytics internes pharmacie

- Tendances de recherche
- Médicaments souvent recherchés
- Périodes de forte demande

---

## PHASE 14 – Notifications & communication

### 14.1 Notifications système

- Validation pharmacie
- Suspension
- Réactivation

### 14.2 Logs & alertes internes

- Alertes admin
- Alertes pharmacie

---

## PHASE 15 – Scalabilité & préparation future

- Séparation services
- Préparation API v2
- Feature flags

---

## PHASE 16 – Finalisation

- Nettoyage du code
- Documentation README
- Vérification conformité cahier des charges

---

## PHASE 13 – Finalisation

- Nettoyage du code
- Documentation README
- Vérification conformité cahier des charges

---

## RÈGLE FINALE

👉 **Si une fonctionnalité n’est pas mentionnée ici, elle ne doit pas être implémentée (YAGNI).**

---

**FIN DU DOCUMENT – ORDRE D’IMPLÉMENTATION**

