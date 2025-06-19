import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  /**
   * Busca uma lista de Pokémons com limite e offset para paginação.
   * @param offset O número de Pokémons a pular.
   * @param limit O número máximo de Pokémons a retornar.
   * @returns Um Observable com a lista de Pokémons.
   */
  getPokemons(offset: number = 0, limit: number = 20): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`).pipe(
      map((response: any) => {
        return response.results.map((pokemon: any) => {
          const id = this.getPokemonIdFromUrl(pokemon.url);
          return {
            id: id,
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
          };
        });
      })
    );
  }

  /**
   * Busca detalhes de um Pokémon específico por ID ou nome.
   * @param idOrName O ID ou nome do Pokémon.
   * @returns Um Observable com os detalhes do Pokémon.
   */
  getPokemonDetails(idOrName: string | number): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon/${idOrName}`);
  }

  /**
   * Busca a descrição da espécie de um Pokémon.
   * @param idOrName O ID ou nome da espécie do Pokémon.
   * @returns Um Observable com os detalhes da espécie.
   */
  getPokemonSpecies(idOrName: string | number): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon-species/${idOrName}`);
  }

  /**
   * Extrai o ID do Pokémon da URL da API.
   * Ex: "https://pokeapi.co/api/v2/pokemon/1/" -> "1"
   * @param url A URL completa do Pokémon.
   * @returns O ID numérico do Pokémon como string.
   */
  private getPokemonIdFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }
}