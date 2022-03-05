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
  PhotoFileName:string="";
  PhotoFilePath:string="";

  constructor(private service:SharedService) { }

  ngOnInit(): void {
    this.ItemID = this.item.itemID;
    this.ItemName = this.item.itemName;
    this.PhotoFileName=this.item.photopath;
    this.PhotoFilePath=this.service.PhotoUrl+'/'+this.PhotoFileName;
  }


  addItem()
  {

    var val = {ItemID:this.ItemID,
              ItemName:this.ItemName,
              photopath:this.PhotoFileName
            }
    this.service.addItem(val).subscribe(res => {alert(res.toString())});

  }

  updateItem()
  {

      var val = {ItemID:this.ItemID,
      ItemName:this.ItemName,
      photopath:this.PhotoFileName}
      this.service.updateItem(val).subscribe(res => {alert(res.toString())});

  }


  
  uploadPhoto(event:any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.savePhoto(formData).subscribe((data:any)=>{
      this.PhotoFileName=data.toString();
      this.PhotoFilePath=this.service.PhotoUrl+'/'+this.PhotoFileName;
    })
  }
}
