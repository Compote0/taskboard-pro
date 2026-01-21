# Taskboard

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.7.

## Features Implemented

### Routing Setup

- **Routes Configuration** (`app.routes.ts`): Configured routes for `/home` and `/about` pages
- **Router Provider**: Configured `provideRouter(routes)` in `app.config.ts`
- **Base Route**: Set base href to `/` in `index.html`

### Components

- **Header Component** (`header/`): Navigation bar with router links
  - Uses `RouterLink` directive for navigation
  - Uses `RouterLinkActive` directive to highlight active route
  - Links to `/home` and `/about` pages
- **Home Component** (`home/`): Home page component
- **About Component** (`about/`): About page component

### App Structure

- **App Component** (`app.component.html`):
  - Contains `<app-header>` component
  - Contains `<router-outlet>` for displaying routed components

### Commands used

`ng generate component <component>`
`ng serve`

### Sequence 2 - Reactive Data Flow with BehaviorSubject

#### Task Service (`services/task.service.ts`)

- **BehaviorSubject**: Utilise un `BehaviorSubject<Task[]>` pour stocker et diffuser la liste des tâches
- **Observable public**: Expose `tasks$` comme Observable pour les abonnements
- **Méthodes**:
  - `getTasks()`: Retourne l'Observable `tasks$`
  - `addTask(task)`: Ajoute une tâche et émet la nouvelle liste via `next()`
  - `removeTask(id)`: Supprime une tâche et émet la liste mise à jour via `next()`

#### Task Component (`task/task.component.ts`)

- **Abonnement réactif**: Utilise directement `tasks$` depuis le service
- **Pipe async**: Utilise le pipe `| async` dans le template pour gérer automatiquement l'abonnement
- **Pas de subscription manuelle**: Plus besoin de `subscribe()` ou `ngOnInit` pour charger les données
- **Mise à jour automatique**: La vue se met à jour automatiquement quand le BehaviorSubject émet de nouvelles valeurs

#### Structure du flux

```
TaskService (BehaviorSubject)
    ↓
tasks$ (Observable)
    ↓
Task Component (tasks$ | async)
    ↓
Template (affichage automatique)
```

#### Mise à jour des données

- **addTask()**: Ajoute une tâche au tableau, puis appelle `next()` pour émettre la nouvelle liste
- **removeTask()**: Filtre le tableau pour supprimer une tâche, puis appelle `next()` pour émettre la liste mise à jour
- **Réactivité**: Tous les composants abonnés reçoivent automatiquement les mises à jour

#### Points clés

- **Pas besoin d'appeler `getTasks()` à chaque fois** : La donnée est vivante via `tasks$`
- **Le pipe `| async` gère l'abonnement et le désabonnement automatiquement** : Plus besoin de gérer manuellement les subscriptions
- **Le flux reste cohérent** : Le service et la vue sont toujours synchronisés grâce au BehaviorSubject
- **Mise à jour automatique** : La vue se réactualise sans rechargement quand les données changent

### Sequence 3 - Lazy Loading (Chargement Paresseux)

Au lieu d'importer directement un composant dans les routes :

```typescript
import { AboutComponent } from './about/about.component';
{ path: 'about', component: AboutComponent }
```

On utilise `loadComponent` avec une fonction d'import dynamique :

```typescript
{
  path: 'about',
  loadComponent: () =>
    import('./about/about.component').then((m) => m.AboutComponent),
}
```

#### Avantages

- **Bundle initial plus léger** : Seuls les composants nécessaires sont chargés au démarrage
- **Performance améliorée** : Temps de chargement initial réduit
- **Chargement à la demande** : Les composants sont chargés uniquement quand l'utilisateur navigue vers la route

#### Routes avec Lazy Loading

- **`/about`** : Charge `AboutComponent` en lazy loading
- **`/tasks`** : Charge `TasksPageComponent` en lazy loading avec routes enfants

### Lighthouse - Audit de Performance

Lighthouse est intégré au projet pour analyser les performances, l'accessibilité, les bonnes pratiques et le SEO de l'application.

#### Installation

Lighthouse est déjà installé comme dépendance de développement.

#### Utilisation

1. **Démarrer l'application** :

   ```bash
   npm start
   ```

2. **Lancer un audit Lighthouse** (dans un autre terminal) :

   ```bash
   # Rapport HTML
   npm run lighthouse

   # Rapport JSON
   npm run lighthouse:json

   # Les deux formats
   npm run lighthouse:all
   ```

3. **Consulter les rapports** :
   - Le rapport HTML sera généré dans `lighthouse-report.html`
   - Le rapport JSON sera généré dans `lighthouse-report.json`

#### Configuration

Le fichier `.lighthouserc.json` contient la configuration pour les audits CI/CD avec des seuils minimum :

- Performance : 80%
- Accessibilité : 90%
- Bonnes pratiques : 80%
- SEO : 80%

#### Notes

- Assurez-vous que l'application tourne sur `http://localhost:4200` avant de lancer Lighthouse
- Les rapports sont automatiquement ignorés par Git (voir `.gitignore`)
