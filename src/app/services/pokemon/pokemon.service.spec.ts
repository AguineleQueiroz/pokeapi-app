import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;
  const baseUrl = 'https://pokeapi.co/api/v2';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService] 
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  // --- Testes para getPokemons() ---
  it('deve retornar uma lista de Pokémons com ID e URL de imagem corretos', () => {
    const mockResponse = {
      count: 2,
      next: null,
      previous: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' }
      ]
    };

    service.getPokemons(0, 2).subscribe((pokemons: string | any[]) => {
      expect(pokemons.length).toBe(2);

      expect(pokemons[0].name).toBe('bulbasaur');
      expect(pokemons[0].id).toBe('1');
      expect(pokemons[0].image).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png');

      expect(pokemons[1].name).toBe('charmander');
      expect(pokemons[1].id).toBe('4');
      expect(pokemons[1].image).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png');
    });

    const req = httpMock.expectOne(`${baseUrl}/pokemon?offset=0&limit=2`);
    expect(req.request.method).toBe('GET'); 
    req.flush(mockResponse); 
  });

  // --- Testes para getPokemonDetails() ---
  it('deve retornar os detalhes de um Pokémon pelo ID', () => {
    const mockDetails = {
      id: 25,
      name: 'pikachu',
      height: 4,
      weight: 60,
      abilities: [{ ability: { name: 'static' } }],
      types: [{ type: { name: 'electric' } }]
    };

    service.getPokemonDetails(25).subscribe((pokemon: { name: any; }) => {
      expect(pokemon).toEqual(mockDetails);
      expect(pokemon.name).toBe('pikachu');
    });

    const req = httpMock.expectOne(`${baseUrl}/pokemon/25`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDetails);
  });

  it('deve retornar os detalhes de um Pokémon pelo nome', () => {
    const mockDetails = {
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      abilities: [{ ability: { name: 'overgrow' } }],
      types: [{ type: { name: 'grass' } }]
    };

    service.getPokemonDetails('bulbasaur').subscribe((pokemon: { id: any; }) => {
      expect(pokemon).toEqual(mockDetails);
      expect(pokemon.id).toBe(1);
    });

    const req = httpMock.expectOne(`${baseUrl}/pokemon/bulbasaur`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDetails);
  });

  // --- Testes para getPokemonSpecies() ---
  it('deve retornar os detalhes da espécie de um Pokémon', () => {
    const mockSpecies = {
      id: 1,
      name: 'bulbasaur',
      flavor_text_entries: [
        { flavor_text: 'A strange seed was planted on its back at birth.', language: { name: 'en' } },
        { flavor_text: 'Uma estranha semente foi plantada em suas costas ao nascer.', language: { name: 'pt-BR' } }
      ]
    };

    service.getPokemonSpecies(1).subscribe((species: { name: any; flavor_text_entries: string | any[]; }) => {
      expect(species).toEqual(mockSpecies);
      expect(species.name).toBe('bulbasaur');
      expect(species.flavor_text_entries.length).toBeGreaterThan(0);
      expect(species.flavor_text_entries[0].flavor_text).toContain('seed');
    });

    const req = httpMock.expectOne(`${baseUrl}/pokemon-species/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSpecies);
  });

  // --- Teste para o tratamento de erro (exemplo) ---
  it('deve retornar um erro quando a requisição falha', () => {
    const errorMessage = 'Erro de rede';

    service.getPokemons().subscribe({
      next: () => fail('Deveria ter ocorrido um erro'), 
      error: (error: { status: any; statusText: any; }) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    });

    const req = httpMock.expectOne(`${baseUrl}/pokemon?offset=0&limit=20`);
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });

});