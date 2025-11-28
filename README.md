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
