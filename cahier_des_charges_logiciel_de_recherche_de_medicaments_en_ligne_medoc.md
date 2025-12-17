# Cahier des charges – Logiciel de recherche de médicaments en ligne (MEDOC)

## 0. Positionnement pédagogique et qualité logicielle

Ce projet doit être développé comme un **produit professionnel**, en appliquant strictement :

- **SOLID principles**
- **YAGNI** (pas de fonctionnalités inutiles)
- **KISS** (simplicité maximale)
- **Clean Code**
- **Clean Architecture**
- **MVC pour l’API**
- **TypeScript strict (no `any`)**

Le code doit être **lisible, testable, maintenable et évolutif**.

---

## 1. Vision produit

MEDOC est une plateforme de **mise en relation indirecte** entre utilisateurs et pharmacies.

⚠️ Le système **NE DOIT PAS exposer** :
- Les quantités réelles de stock
- Les prix exacts
- Les données internes des pharmacies

👉 Le système répond uniquement à la question :
> "Cette pharmacie dispose-t-elle de ce médicament ?"

---

## 2. Acteurs du système

### 2.1 Utilisateur (public)

- Peut utiliser l’application **sans compte**
- Peut rechercher des médicaments
- Peut consulter des pharmacies
- Peut quitter la plateforme sans action

### 2.2 Utilisateur connecté

- Accès à :
  - Informations personnelles
  - Favoris (pharmacies / médicaments)

⚠️ Pas de dashboard complexe

---

### 2.3 Pharmacie (acteur contrôlé)

⚠️ **Une pharmacie ne peut PAS s’inscrire seule**

Flux proposé (pattern d’approbation admin – recommandé) :

1. L’admin crée la pharmacie dans le système
2. La pharmacie reçoit ses identifiants
3. La pharmacie se connecte
4. L’admin valide définitivement le compte
5. La pharmacie accède à son dashboard

➡️ Pattern utilisé : **Admin Controlled Account Creation**

---

### 2.4 Administrateur

- Supervision globale
- Création et validation des pharmacies
- Gestion des référentiels

---

## 3. Parcours utilisateurs (flows)

### 3.1 Flow utilisateur public

1. Arrivée sur landing page
2. Recherche d’un médicament
3. Résultats : liste de pharmacies
4. Consultation d’une pharmacie
5. Quitte la plateforme

---

### 3.2 Flow utilisateur connecté

1. Inscription / connexion
2. Recherche
3. Ajout pharmacie aux favoris
4. Consultation ultérieure

---

### 3.3 Flow pharmacie (sécurisé)

1. Création du compte par admin
2. Connexion pharmacie
3. Accès dashboard
4. Gestion interne des médicaments

---

## 4. Fonctionnalités clés (CORE)

### 4.1 Recherche (logique inversée)

- Input : médicament
- Output : pharmacies

Données visibles :
- Nom pharmacie
- Localisation
- Disponibilité (OUI / NON)
- Note moyenne

❌ Jamais de prix
❌ Jamais de quantité

---

### 4.2 Page pharmacie

- Carte plein écran
- Pharmacie centrée
- Scroll pour infos publiques

Infos publiques autorisées :
- Nom
- Adresse
- Horaires
- Avis

---

## 5. Architecture Frontend (Next.js)

### 5.1 Organisation

- `/app` : routing
- `/components` : composants UI
- `/features` : logique métier front
- `/lib` : helpers
- `/types` : types globaux

---

### 5.2 Design system (sans dégradés)

Contraintes UI :
- Pas de dégradés
- Pas d’effets inutiles
- Couleurs sobres
- Composants réutilisables

Composants de base :
- Button
- Input
- Card
- Modal
- Badge
- Rating
- MapContainer

Pattern : **Atomic Design**

---

## 6. Architecture Backend (API v1)

### 6.1 Versionnement

- Toutes les routes : `/api/v1/...`

---

### 6.2 MVC strict

- Controller : gestion HTTP
- Service : logique métier
- Repository (via Prisma)

---

### 6.3 Format de réponse API (OBLIGATOIRE)

```json
{
  "status": "success | error",
  "code": 200,
  "message": "description",
  "data": {}
}
```

➡️ Valable pour GET, POST, PUT, DELETE

---

### 6.4 Middleware

Backend :
- Auth middleware
- Role middleware
- Error handler

Frontend :
- Route protection
- Redirection par rôle

---

## 7. Base de données (logique – sans intégration)

### Tables principales :

- User
- Pharmacy
- Medication
- PharmacyMedication (relation)
- Review
- Favorite
- Admin

⚠️ Les champs sensibles sont privés (prix, stock)

---

## 8. Dashboard Pharmacie

Fonctionnalités internes uniquement :
- Gestion médicaments (interne)
- Disponibilité OUI/NON
- Statistiques internes

---

## 9. Dashboard Admin

- CRUD pharmacies
- Validation pharmacies
- CRUD médicaments
- Supervision globale

---

## 10. Tests & outils locaux

- Testeurs API locaux (REST client)
- Scripts de seed
- Tests unitaires services

---

## 11. DevOps

- Docker obligatoire
- GitHub Actions :
  - Lint
  - Build
  - Tests

---

## 12. Conclusion

Ce document doit être **lu entièrement par l’agent IA avant toute ligne de code**.

L’objectif n’est pas de coder vite, mais de **coder proprement, durablement et intelligemment**.

---

**FIN DU CAHIER DES CHARGES**

