import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { PokemonService } from '../../services/pokemon/pokemon.service';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonImg,
  IonChip,
  IonIcon,
  IonButton,
  IonListHeader,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonImg,
    IonChip,
    IonIcon,
    IonButton,
    IonListHeader,
    IonGrid,
    IonRow,
    IonCol
  ]
})
export class PokemonDetailsPage implements OnInit {
  pokemonId: string | null = null;
  pokemonDetails: any = null;
  pokemonSpecies: any = null;
  isFavorite: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonService
  ) {
    addIcons({ heart, heartOutline });
  }

  ngOnInit() {
    this.pokemonId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.pokemonId) {
      this.loadPokemonDetails(this.pokemonId);
      this.checkIfFavorite(this.pokemonId);
    }
  }

  loadPokemonDetails(idOrName: string) {
    this.pokemonService.getPokemonDetails(idOrName).subscribe({
      next: (data: any) => {
        this.pokemonDetails = data;
        this.pokemonService.getPokemonSpecies(idOrName).subscribe({
          next: (speciesData: any) => {
            this.pokemonSpecies = speciesData;
          },
          error: (speciesError: any) => {
            return throwError(() => new Error(`Não foi possível carregar os dados do pokemon da espécie ${speciesError}. Tente novamente mais tarde`));
          }
        });
      },
      error: (error: any) => {
        return throwError(() => new Error(`Não foi possível carregar os dados do pokemon. Tente novamente mais tarde`));
      }
    });
  }

  checkIfFavorite(pokemonId: string) {
    const favorites = JSON.parse(localStorage.getItem('favoritePokemons') || '[]');
    this.isFavorite = favorites.includes(pokemonId);
  }

  toggleFavorite() {
    let favorites = JSON.parse(localStorage.getItem('favoritePokemons') || '[]');
    if (this.isFavorite) {
      favorites = favorites.filter((id: string) => id !== this.pokemonId);
    } else {
      if (this.pokemonId) {
        favorites.push(this.pokemonId);
      }
    }
    localStorage.setItem('favoritePokemons', JSON.stringify(favorites));
    this.isFavorite = !this.isFavorite;
  }

  getFlavorText(language: string = 'en'): string {
    if (!this.pokemonSpecies || !this.pokemonSpecies.flavor_text_entries) {
      return 'N/A';
    }
    const entry = this.pokemonSpecies.flavor_text_entries.find(
      (e: any) => e.language.name === language
    );
    return entry ? entry.flavor_text.replace(/\n|\f/g, ' ') : 'N/A';
  }

  getPokemonImage(id: string | number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  getSpriteImage(pokemon: any, spriteType: string = 'front_default'): string | null {
    if (pokemon && pokemon.sprites && pokemon.sprites[spriteType]) {
      return pokemon.sprites[spriteType];
    }
    return null;
  }
}