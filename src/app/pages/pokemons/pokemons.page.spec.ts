import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonsPage } from './pokemons.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { ActivatedRoute } from '@angular/router';

describe('PokemonsPage', () => { 
  let component: PokemonsPage; 
  let fixture: ComponentFixture<PokemonsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PokemonsPage,
        HttpClientTestingModule
      ],
      providers: [
        PokemonService,
   
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } },
          },
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});