import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.css']
})
export class ShowItemComponent implements OnInit {

  items: any[] = [];
  ModelTitle:string="Add Item";
  ActivateAddEditItemComp:boolean=false;
  item:any;


  constructor(private service:SharedService) { }
  
  ngOnInit(): void {
    this.refreshItemsList();
  }

  refreshItemsList(){
    this.service.getItemsList().subscribe(data=> this.items = data);
  }
 

  addClick()
  {
 //   this.ActivateAddEditItemComp =false;
    this.item = {
      itemID  :0,
      itemName :""
    };
    this.ModelTitle = "Add Item";
    this.ActivateAddEditItemComp = true;
  }

  editClick(dataitem:any)
  {
//    this.ActivateAddEditItemComp =false;
    this.item = dataitem;
    this.ModelTitle = "Edit Item";
    this.ActivateAddEditItemComp = true;
  }

  deleteClick(dataitem:any){

 //   this.ActivateAddEditItemComp =false;
    if(confirm('Are you sure??')){
      this.service.deleteItem(dataitem.itemID).subscribe(data=>{
        alert(data.toString());
        this.refreshItemsList();
      })
    }
  }
  closeClick()
  {
   this.ActivateAddEditItemComp = false;
    this.refreshItemsList();
  }

  
}


