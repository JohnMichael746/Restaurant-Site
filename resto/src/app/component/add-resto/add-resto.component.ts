import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { RestoService } from 'src/app/services/resto.service';
import { Resto } from 'src/app/resto';

@Component({
  selector: 'app-add-resto',
  templateUrl: './add-resto.component.html',
  styleUrls: ['./add-resto.component.scss']
})
export class AddRestoComponent implements OnInit {

  public addResto = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
  });

  public alert: boolean = false;

  constructor(private resto: RestoService) { }

  ngOnInit(): void {
  }

  public collectResto(){
    console.log(this.addResto.value);

    const data: Resto = {
      id: null,
      name: this.addResto.value.name,
      email: this.addResto.value.email,
      address: this.addResto.value.address,
    }

    this.resto.saveResto(data).subscribe((results:any)=>{
      console.log(results)
      this.alert = true;
      this.addResto.reset({});
    });

  }

  public closeAlert(){
    this.alert = false;
  }
}