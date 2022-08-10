import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { RestoService } from 'src/app/services/resto.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public register = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  public alert: boolean = false;

  constructor(private resto: RestoService) { }

  
  ngOnInit(): void {
  }

  collection(){
    console.log(this.register.value);

    const data: User = {
      id: null,
      name: this.register.value.name,
      email: this.register.value.email,
      password: this.register.value.password,
    }

    this.resto.registerUser(data).subscribe((results) => {
      console.log(results);
      this.alert = true;
      this.register.reset({});
    })

  }


  public closeAlert(){
    this.alert = false;
  }
}
