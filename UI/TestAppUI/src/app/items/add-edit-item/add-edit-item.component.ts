import { Component, OnInit ,Input} from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.component.html',
  styleUrls: ['./add-edit-item.component.css']
})
export class AddEditItemComponent implements OnInit {

  @Input() item:any;
  ItemID:number=0;
  ItemName:string="";

  constructor(private service:SharedService) { }

  ngOnInit(): void {
    this.ItemID = this.item.itemID;
    this.ItemName = this.item.itemName;
  }


  addItem()
  {

    var val = {ItemID:this.ItemID,
              ItemName:this.ItemName}
    this.service.addItem(val).subscribe(res => {alert(res.toString())});

  }

  updateItem()
  {

      var val = {ItemID:this.ItemID,
      ItemName:this.ItemName}
      this.service.updateItem(val).subscribe(res => {alert(res.toString())});

  }
}
