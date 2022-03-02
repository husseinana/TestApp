import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { ShowItemComponent } from './items/show-item/show-item.component';
import { AddEditItemComponent } from './items/add-edit-item/add-edit-item.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShowRecipeComponent } from './recipes/show-recipe/show-recipe.component';
import { AddEditRecipeComponent } from './recipes/add-edit-recipe/add-edit-recipe.component';
import {SharedService} from './shared.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ShowItemComponent,
    AddEditItemComponent,
    RecipesComponent,
    ShowRecipeComponent,
    AddEditRecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }