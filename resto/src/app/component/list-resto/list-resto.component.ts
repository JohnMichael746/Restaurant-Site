import { Component, OnInit } from '@angular/core';
import { Resto } from 'src/app/resto';
import { RestoService } from 'src/app/services/resto.service';

@Component({
  selector: 'app-list-resto',
  templateUrl: './list-resto.component.html',
  styleUrls: ['./list-resto.component.scss']
})
export class ListRestoComponent implements OnInit {

 
  constructor( private resto:RestoService) { }

  collection:Array<Resto> = [];
  
  ngOnInit(): void {
    this.resto.getList().subscribe((results) => {
      console.log(results);
      // for (let i = 0; i < results.length; i){
      //   let result = results[i];
      //   let collectionItem = new Resto();

      // }
      // this.collection = results;
      const stringJson = JSON.stringify(results);
      console.log("String json object :", stringJson);
      this.collection = JSON.parse(stringJson);



    });
  }

  public deleteResto(id:number | null):void {
    console.log("deleteResto " + id)
    if (id != null) {
      const idNumber = id || -1;
      this.resto.deleteResto(idNumber).subscribe((result:any) => {
        this.collection.splice(idNumber-1,1);
      });
    }
  }

}