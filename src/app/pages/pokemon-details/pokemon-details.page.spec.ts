import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonDetailsPage } from './pokemon-details.page';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { of } from 'rxjs';

describe('PokemonDetailsPage', () => {
  let component: PokemonDetailsPage;
  let fixture: ComponentFixture<PokemonDetailsPage>;
  let pokemonServiceMock: any;

  beforeEach(async () => {
    const activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: (key: string) => {
            if (key === 'id') {
              return '25';
            }
            return null;
          },
        },
      },
    };

    pokemonServiceMock = {
      getPokemonDetails: jasmine.createSpy('getPokemonDetails').and.returnValue(of({
        id: 25,
        name: 'pikachu',
        height: 4,
        weight: 60,
        abilities: [{ ability: { name: 'static' } }],
        types: [{ type: { name: 'electric' } }],
        sprites: { front_default: 'some-url' }
      })),
      getPokemonSpecies: jasmine.createSpy('getPokemonSpecies').and.returnValue(of({
        flavor_text_entries: [{ flavor_text: 'Test description.', language: { name: 'en' } }],
      }))
    };


    await TestBed.configureTestingModule({
      imports: [
        PokemonDetailsPage,
        HttpClientTestingModule 
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: PokemonService, useValue: pokemonServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokemon details on ngOnInit', () => {
    expect(pokemonServiceMock.getPokemonDetails).toHaveBeenCalledWith('25');
    expect(pokemonServiceMock.getPokemonSpecies).toHaveBeenCalledWith('25');
    expect(component.pokemonDetails.name).toBe('pikachu');
  });
});