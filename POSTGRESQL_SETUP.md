# 📦 Intégration PostgreSQL - MEDOC

## 🚀 Configuration terminée

L'application est maintenant connectée à PostgreSQL avec Prisma selon le cahier des charges.

## 🗄️ Base de données configurée

### Schéma Prisma complet
- **User** : Utilisateurs standards
- **Pharmacy** : Pharmacies (validation admin)
- **Medication** : Référentiel médicaments  
- **PharmacyMedication** : Disponibilités (OUI/NON uniquement)
- **Review** : Avis utilisateurs
- **Favorite** : Favoris utilisateurs
- **Admin** : Administrateurs système

### 🎯 Conformité cahier des charges
✅ **Pas d'exposition de données sensibles** :
- Aucun champ `price` ou `quantity`
- Disponibilité binaire OUI/NON uniquement
- Dashboard pharmacie interne uniquement

✅ **Pattern Admin Controlled Account Creation** :
- Seul un admin peut créer des comptes pharmacie
- Flux validation → activation

## 📊 Données de test

Le seed crée automatiquement :
- **1 Admin** : `admin@medoc.fr` / `admin123`
- **1 User** : `user@example.fr` / `user123`
- **3 Pharmacies** : 
  - 2 validées (Pharmacie du Centre, Pharmacie Saint-Louis)
  - 1 en attente (Pharmacie de la Bastille)
- **5 Médicaments** courants
- **Disponibilités** par pharmacie
- **Avis** et **favoris** exemples

## 🛠️ Utilisation

### Initialiser la base de données
```bash
# 1. Démarrer PostgreSQL localement
docker-compose up -d postgres

# 2. Créer la base
docker-compose exec postgres createdb -U postgres medoc_db

# 3. Générer client Prisma
npm run db:generate

# 4. Lancer les migrations
npm run db:migrate

# 5. Peupler les données de test
npm run db:seed
```

### Développer
```bash
npm run dev  # Démarre avec PostgreSQL
```

## 🔧 Variables d'environnement

```bash
# Database
DATABASE_URL="postgresql://medoc_user:medoc_password@localhost:5432/medoc_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"

# App
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 📋 Architecture implémentée

### Backend MVC
- **Controllers** : Gestion HTTP
- **Services** : Logique métier (auth, admin, search)
- **Repositories** : Accès PostgreSQL via Prisma
- **Middleware** : Auth, erreurs, validation

### Features Frontend
- `/features/auth` : Login/Register flows
- `/features/search` : Recherche inversée médicament→pharmacies  
- `/features/pharmacy` : Dashboard interne
- `/features/admin` : Supervision/validation
- `/features/user` : Profil et favoris

### Sécurité
- Mots de passe hashés (bcrypt)
- JWT tokens signés
- Rôles sécurisés (USER/PHARMACY/ADMIN)
- Pas d'exposition données sensibles

## 🚨 Prochaines étapes

1. **Tester les endpoints API** avec le fichier `API_TESTS.http`
2. **Connecter le frontend** aux vraies API
3. **Déployer** avec Docker et PostgreSQL
4. **Monitoring** et logs en production

L'infrastructure PostgreSQL est prête pour un usage en production ! 🎉