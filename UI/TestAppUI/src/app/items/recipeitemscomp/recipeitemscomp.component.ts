import { Component, OnInit ,Input} from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-recipeitemscomp',
  templateUrl: './recipeitemscomp.component.html',
  styleUrls: ['./recipeitemscomp.component.css']
})
export class RecipeitemscompComponent implements OnInit {

  @Input() item:any;

  constructor(private service:SharedService) { }

  ngOnInit(): void {
  }

}
