import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeitemscompComponent } from './recipeitemscomp.component';

describe('RecipeitemscompComponent', () => {
  let component: RecipeitemscompComponent;
  let fixture: ComponentFixture<RecipeitemscompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeitemscompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeitemscompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
