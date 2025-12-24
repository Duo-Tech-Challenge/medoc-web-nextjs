# 🏥 MEDOC - Medicine Search Platform

Plateforme de **mise en relation indirecte** entre patients et pharmacies pour rechercher la **disponibilité des médicaments**.

## 🎯 Vision

MEDOC permet aux utilisateurs de chercher un médicament et découvrir les pharmacies qui le proposent, **sans exposer les données sensibles** (prix, quantités réelles, stocks internes).

### Logique inversée
```
INPUT:  Médicament (ex: "Aspirin 500mg")
        ↓
OUTPUT: Liste des pharmacies avec disponibilité (OUI/NON)
```

---

## 🚀 Stack Technique

### Frontend
- **Next.js 16** (App Router)
- **React 19** + TypeScript
- **Tailwind CSS v4**
- **Framer Motion** (animations)

### Backend
- **Next.js API Routes** (/api/v1)
- **MVC Pattern**: Controllers → Services → Repositories
- **TypeScript strict** (no `any`)

### Database
- **Prisma ORM** (PostgreSQL ready)
- **PostgreSQL** (avec PostGIS pour géolocalisation future)

### DevOps
- **Docker** + Docker Compose
- **GitHub Actions** (CI/CD)
- **GitHub Workflows** (lint, build, test)

---

## 📦 Installation & Démarrage

### Option 1: Direct (Node.js local)

\`\`\`bash
# Cloner
git clone https://github.com/Duo-Tech-Challenge/medoc-web-nextjs.git
cd medoc-web-nextjs

# Install
npm install

# Setup env
cp .env.example .env.local

# Dev
npm run dev
\`\`\`

Open \`http://localhost:3000\`

### Option 2: Docker (Recommandé)

\`\`\`bash
# Démarrer avec Docker Compose (includes PostgreSQL)
docker-compose -f docker-compose.dev.yml up

# App: http://localhost:3000
# Database: localhost:5432
\`\`\`

---

## 🏗️ Architecture

### API Versioning
```
/api/v1/          # Current stable version
/api/v2/          # Future version (avec breaking changes)
```

### Admin Workflows (Phase 12)
- Validation pharmacies
- Suspension/réactivation
- Journal d'audit complet
- Gestion des rôles admin (ADMIN, SUPER_ADMIN)

### Pharmacy Dashboard (Phase 13)
- Gestion profil interne
- Disponibilités des médicaments
- Indisponibilités temporaires
- Analytics & tendances

### Notifications (Phase 14)
- Système de notifications
- Alertes admin
- Audit logs complets
- Préférences utilisateur

### Scalabilité (Phase 15)
- API versioning strategy
- Feature flags system
- Microservices preparation
- Caching layers
- Database optimization guide

---

## 🔌 API Endpoints Summary

### Admin Endpoints
- POST `/api/v1/admin/validate` - Validate pharmacy
- POST `/api/v1/admin/suspend` - Suspend pharmacy
- POST `/api/v1/admin/reactivate` - Reactivate pharmacy
- GET `/api/v1/admin/stats` - Dashboard stats
- GET `/api/v1/admin/pharmacy/:id/audit` - Audit trail

### Pharmacy Dashboard Endpoints
- GET/PUT `/api/v1/pharmacy/dashboard/profile` - Profile management
- GET `/api/v1/pharmacy/dashboard/medications` - Medication list
- PUT `/api/v1/pharmacy/dashboard/medications/availability` - Update availability
- GET `/api/v1/pharmacy/dashboard/analytics` - Analytics

### Notification Endpoints
- GET `/api/v1/notifications` - Get notifications
- PUT `/api/v1/notifications/:id/read` - Mark as read
- GET/PUT `/api/v1/notifications/preferences` - Preferences
- GET `/api/v1/admin/alerts` - Admin alerts
- GET `/api/v1/admin/audit-logs` - Audit logs

---

## 📝 Code Quality Standards

### TypeScript
- ✅ Strict mode enabled
- ✅ No \`any\` types
- ✅ DTOs for all API data
- ✅ Centralized types in \`/types\`

### Architecture
- ✅ **SOLID Principles**
- ✅ **MVC Pattern** (API)
- ✅ **Repository Pattern** (Data)
- ✅ **Middleware Pattern** (Auth, errors)

---

## 🚦 Project Status

### ✅ Completed: Phases 0-6, 12-14
- Foundation & Architecture
- Backend Core (MVC)
- Search functionality
- Auth structure
- Admin workflows
- Pharmacy dashboard
- Notifications system

### 🔄 In Progress: Phase 15
- Scalability guide
- API versioning strategy
- Microservices preparation

### 📋 Pending: Phase 7-11, 16
- Dashboard UIs
- Security/compliance
- Tests & monitoring
- DevOps finalization
- Finalisation

---

## 📚 Documentation

- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Dev guide
- **[PHASE_15_SCALABILITY.ts](./docs/PHASE_15_SCALABILITY.ts)** - Scalability guide
- **[Cahier des Charges](./cahier_des_charges_logiciel_de_recherche_de_medicaments_en_ligne_medoc.md)** - Requirements

---

## 📞 Support

Pour toute question, veuillez ouvrir une issue.

**Last Updated**: 17 décembre 2025
**Status**: Alpha (Phases 12-14 complete, Phase 15 in progress)
