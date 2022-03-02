import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import  {ItemsComponent} from './items/items.component';
import  {RecipesComponent} from './recipes/recipes.component';

const routes: Routes = [
    {path:'items',component:ItemsComponent},
    {path:'recipes',component:RecipesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
