import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.css']
})
export class ShowItemComponent implements OnInit {

  items: any[] = [];
  itemsall: any[] = [];
  ModelTitle:string="Add Item";
  ActivateAddEditItemComp:boolean=false;
  item:any;
  ItemIdFilter:string = "";
  ItemNameFilter:string="";

  constructor(private service:SharedService) { }
  
  ngOnInit(): void {
    this.refreshItemsList();
  }

  refreshItemsList(){
    this.service.getItemsList().subscribe(
      data=> 
        {
        this.items = data;
        this.itemsall=data;
        }
      );
  }
 
  FilterFn()
  {
    var IdFilter = this.ItemIdFilter;
    var NameFilter = this.ItemNameFilter;

    this.items = this.itemsall.filter(function (el){
        return el.itemID.toString().toLowerCase().includes(
          IdFilter.toString().trim().toLowerCase()
        )&&
        el.itemName.toString().toLowerCase().includes(
          NameFilter.toString().trim().toLowerCase()
        )
    });
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


  sortResult(prop:any,asc:boolean){
    this.items = this.itemsall.sort(function(a,b){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }


  
}


