import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PokemonService } from '../../services/pokemon/pokemon.service';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButtons,
  IonSearchbar,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.page.html',
  styleUrls: ['./pokemons.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonButtons,
    IonSearchbar,
  ]
})
export class PokemonsPage implements OnInit {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  offset = 0;
  private allPokemons: any[] = [];

  constructor(private pokemonService: PokemonService) {
    addIcons({ heart });
  }

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokemonService.getPokemons(this.offset).subscribe({
      next: (data) => {
        console.log('Pokémons loaded:', data);
        this.allPokemons = [...this.allPokemons, ...data];
        this.filteredPokemons = [...this.allPokemons]; 
        this.pokemons = this.filteredPokemons;
        this.offset += data.length;
      },
      error: (error) => {
        console.error('Error loading Pokémons:', error);
      }
    });
  }

  onSearchChange(event: any) {
    const searchTerm = event.detail.value.toLowerCase();

    if (searchTerm === '') {
      this.filteredPokemons = [...this.allPokemons];
    } else {
      this.filteredPokemons = this.allPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm)
      );
    }
    this.pokemons = this.filteredPokemons;
  }
}