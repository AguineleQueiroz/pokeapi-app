import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesPage } from './favorites.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { ActivatedRoute } from '@angular/router';

describe('FavoritesPage', () => { 
  let component: FavoritesPage; 
  let fixture: ComponentFixture<FavoritesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FavoritesPage,
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

    fixture = TestBed.createComponent(FavoritesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});