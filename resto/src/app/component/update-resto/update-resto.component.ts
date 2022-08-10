import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { RestoService } from 'src/app/services/resto.service';
import { Resto } from 'src/app/resto';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-resto',
  templateUrl: './update-resto.component.html',
  styleUrls: ['./update-resto.component.scss']
})
export class UpdateRestoComponent implements OnInit {

  public editResto = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
  });
  public alert: boolean = false;

  private currentRestoId:number = 0;

  constructor(private router: ActivatedRoute, private resto: RestoService) { }

  ngOnInit(): void {
    this.currentRestoId = this.router.snapshot.params.id;
    console.log("id = " + this.currentRestoId)
    this.resto.getCurrentResto(this.currentRestoId).subscribe(result => {
      console.log(result);

      const currResto: Resto = JSON.parse(JSON.stringify(result));

      this.editResto = new FormGroup({
        name: new FormControl(currResto.name),
        email: new FormControl(currResto.email),
        address: new FormControl(currResto.address),
      });

    })
  }

  public collection(){
    console.log(this.editResto.value);
    const data: Resto = {
      id: null,
      name: this.editResto.value.name,
      email: this.editResto.value.email,
      address: this.editResto.value.address,
    }

    this.resto.updateResto(this.currentRestoId, data).subscribe(result => {
      console.log(result);
      this.alert = true;
    })

  }

  public closeAlert(){
    this.alert = false;
  }

}
