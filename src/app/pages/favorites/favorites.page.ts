import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PokemonService } from '../../services/pokemon/pokemon.service';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonImg,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  IonBackButton,
  IonIcon
} from '@ionic/angular/standalone';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonImg,
    IonText,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonButtons,
    IonBackButton,
    IonIcon
  ]
})
export class FavoritesPage implements OnInit {
  favoritePokemons: any[] = [];
  isLoading = true;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.loadFavoritePokemons();
  }

  ionViewWillEnter() {
    this.loadFavoritePokemons();
  }

  loadFavoritePokemons() {
    this.isLoading = true;
    this.favoritePokemons = [];
    const favoriteIds: string[] = JSON.parse(localStorage.getItem('favoritePokemons') || '[]');

    if (favoriteIds.length === 0) {
      this.isLoading = false;
      return;
    }

    const pokemonObservables = favoriteIds.map(id =>
      this.pokemonService.getPokemonDetails(id)
    );

    let loadedCount = 0;
    favoriteIds.forEach(id => {
      this.pokemonService.getPokemonDetails(id).subscribe({
        next: (pokemon) => {
          pokemon.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
          this.favoritePokemons.push(pokemon);
          loadedCount++;
          if (loadedCount === favoriteIds.length) {
            this.isLoading = false;
          }
        },
        error: (err) => {         
          loadedCount++;
          if (loadedCount === favoriteIds.length) {
            this.isLoading = false;
          }
          return throwError(() => new Error(`Não foi possível carregar os dados do pokemon. Tente novamente mais tarde`));
        }
      });
    });
  }


  removeFavorite(pokemonId: string) {
    let favorites: string[] = JSON.parse(localStorage.getItem('favoritePokemons') || '[]');
    favorites = favorites.filter(id => id !== pokemonId);
    localStorage.setItem('favoritePokemons', JSON.stringify(favorites));
    this.loadFavoritePokemons();
  }
}