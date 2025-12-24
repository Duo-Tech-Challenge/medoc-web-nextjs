## Extension du prompt – Analyse, réanalyse & plan de développement des pages

### Instruction prioritaire à l’agent IA

Avant toute implémentation, tu dois **analyser puis réanalyser** :

* la page principale existante (homepage)
* le design system déjà implicite (espacements, typographie, couleurs, composants)
* l’image de dashboard fournie par l’utilisateur

Cette phase est **obligatoire** et conditionne tout le reste.

---

## Phase A – Analyse & réanalyse du projet

### A.1 Analyse de la page principale

Identifier précisément :

* Layout global (grille, colonnes, espacements)
* Hiérarchie visuelle (titres, sous-titres, textes)
* Composants déjà utilisés (cards, boutons, sections)
* Ton visuel général (sobre, professionnel, sans dégradés)

⚠️ Interdiction d’introduire un nouveau style non présent sur la page principale.

---

### A.2 Analyse de l’image de dashboard fournie

À partir de l’image :

* Identifier chaque bloc fonctionnel
* Décomposer visuellement en composants UI
* Classer les composants par :

  * atomiques
  * moléculaires
  * organismes

Exemples :

* Sidebar
* Header dashboard
* Cards statistiques
* Table de données
* Badges d’état

---

## Phase B – Création des composants UI

### B.1 Règles

* Tous les composants doivent :

  * dériver du style de la homepage
  * être réutilisables
  * être typés strictement en TypeScript

* Aucun composant spécifique à une seule page si réutilisable ailleurs

---

### B.2 Liste minimale de composants dashboard

* DashboardLayout
* Sidebar
* TopBar
* StatCard
* DataTable
* StatusBadge
* EmptyState

⚠️ Pas de gradients
⚠️ Pas d’animations inutiles

---

## Phase C – Plan de développement des pages (basé sur la homepage)

### C.1 Principe directeur

La **homepage est la référence visuelle absolue**.

Toutes les pages doivent :

* conserver la même identité visuelle
* réutiliser les mêmes composants
* respecter la même logique d’espacement

---

### C.2 Ordre de développement des pages

1. Dashboard Admin

   * Layout
   * Sidebar
   * Pages internes

2. Dashboard Pharmacie

   * Reprise du layout admin
   * Simplification des vues

3. Pages Auth (login/register)

   * Inspirées des sections hero/cards

4. Pages utilisateur (account/favoris)

   * Version épurée du dashboard

---

## Phase D – Flux restants à implémenter

### D.1 Flux Admin

* Création pharmacie
* Validation / suspension
* Supervision globale

---

### D.2 Flux Pharmacie

* Connexion
* Gestion disponibilité
* Consultation statistiques internes

---

### D.3 Flux Utilisateur

* Recherche
* Consultation pharmacie
* Favoris

---

## Règle finale

Tout nouveau composant ou layout doit pouvoir répondre à cette question :

> « Est-ce cohérent avec la page principale et l’image de dashboard ? »

Si la réponse est non → **interdit**.

---

**FIN – EXTENSION DU PROMPT D’INTÉGRATION DES PAGES**
