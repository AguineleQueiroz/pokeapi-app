import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokemons',
    pathMatch: 'full'
  },
  {
    path: 'pokemons',
    loadComponent: () => import('./pages/pokemons/pokemons.page').then(m => m.PokemonsPage)
  },
  {
    path: 'pokemon-details/:id',
    loadComponent: () => import('./pages/pokemon-details/pokemon-details.page').then(m => m.PokemonDetailsPage)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites.page').then( m => m.FavoritesPage)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites.page').then(m => m.FavoritesPage)
  },
];