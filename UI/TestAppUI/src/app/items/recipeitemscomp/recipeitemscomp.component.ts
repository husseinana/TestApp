import { Component, OnInit ,Input} from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDropdownSettings} from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-recipeitemscomp',
  templateUrl: './recipeitemscomp.component.html',
  styleUrls: ['./recipeitemscomp.component.css'],
  
})
export class RecipeitemscompComponent implements OnInit {

  constructor(private service:SharedService, private fb: FormBuilder) { }


  @Input() item:any;
  items: any[] = [];
  selectedItem?: any;

  dropdownList: any[] = [];
  dropdownSettings:IDropdownSettings={};
  dropDownForm: FormGroup;
  selectedItems:any[]=[];

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Item1' },
      { item_id: 2, item_text: 'Item2' },
      { item_id: 3, item_text: 'Item3' },
      { item_id: 4, item_text: 'Item4' },
      { item_id: 5, item_text: 'Item5' }
    ];
    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: true,
    selectAllText: "Select All Items From List",
    unSelectAllText: "UnSelect All Items From List",
    noDataAvailablePlaceholderText: "There is no item availabale to show",
    allowSearchFilter: true

    };
  

    

    this.selectedItems = [
      { item_id: 3, item_text: 'Item3'  },
      { item_id: 4,item_text: 'Item4' }
    ];
    this.dropDownForm = this.fb.group({
      myItems: [this.selectedItems]
  });


    this.refreshItemsList();
  }


  onItemSelect(item: any) {
    console.log('onItemSelect', item);
}
onItemDeSelect(item: any) {
    console.log('onItemDeSelect', item);
}
onSelectAll(items: any) {
    console.log('onSelectAll', items);
}
onUnSelectAll() {
    console.log('onUnSelectAll fires');
}


  refreshItemsList(){
    this.service.getItemsList().subscribe(
      data=> 
        {
        this.items = data;
        }
      );
  }
  
  onSelect(item: any): void {
    this.selectedItem = item;
  }


 

}





