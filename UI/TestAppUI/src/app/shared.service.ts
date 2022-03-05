import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = "http://localhost:5165/api/";
  readonly PhotoUrl = "http://localhost:5165/Photos";
  constructor(private http:HttpClient) {}

    getItemsList():Observable<any[]>{
      console.log("in");
      
      return this.http.get<any>(this.APIUrl + 'Items');
      //return this.http.get<any>("http://localhost:5165/api/Items");
    }

    addItem(val:any){
      return this.http.post<any>(this.APIUrl + 'Items',val);
    }

    updateItem(val:any){
      return this.http.put<any>(this.APIUrl + 'Items',val);
    }

    deleteItem(val:any){
      return this.http.delete<any>(this.APIUrl + 'Items/'+val);
    }



    getRecipesList():Observable<any[]>{
      return this.http.get<any>(this.APIUrl + 'Recipes');
    }

    addRecipe(val:any){
      return this.http.post<any>(this.APIUrl + 'Recipes',val);
    }

    updateRecipe(val:any){
      return this.http.put<any>(this.APIUrl + 'Recipes',val);
    }

    deleteRecipe(val:any){
      return this.http.delete<any>(this.APIUrl + 'Recipes/',val);
    }
   

    savePhoto(val:any){
      return this.http.post<any>(this.APIUrl + 'Items/SaveFile',val);
    }

  
    getAllItemsList():Observable<any[]>{
      return this.http.get<any>(this.APIUrl + 'Recipes/GetAllItems');
    }

}
