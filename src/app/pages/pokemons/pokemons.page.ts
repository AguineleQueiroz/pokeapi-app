import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon/pokemon.service'; // Seu serviço
import { RouterModule } from '@angular/router';

// Importe os componentes Ionic específicos que você usará no template
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
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.page.html',
  styleUrls: ['./pokemons.page.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
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
  ]
})
export class PokemonsPage implements OnInit {
  pokemons: any[] = [];
  offset = 0; 

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokemonService.getPokemons(this.offset).subscribe({
      next: (data: string | any[]) => {
        console.log('Pokémons carregados:', data);
        this.pokemons = [...this.pokemons, ...data];
        this.offset += data.length;
      },
      error: (error: any) => {
        console.error('Erro ao carregar Pokémons:', error);
        // Implementar tratamento de erro (ex: exibir mensagem para o usuário)
      }
    });
  }
}