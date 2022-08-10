import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { RestoService } from 'src/app/services/resto.service';
import { User } from 'src/app/user';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription = new Subscription();

  public user:User =  <User>{};

  public login = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  public alert: boolean = false;

  constructor(private resto: RestoService) { }

  ngOnInit(): void {

    this.subscription.add(
      this.resto.getUser().subscribe(data => {
        console.log("data.email = " +  data.email);
        if (data.email != undefined) {
          this.user = data;
          this.alert = true;
        }
      })
    );

  }


  collection(){
    console.log(this.login.value);

    this.resto.login(this.login.value.email,this.login.value.password);

  }


  public closeAlert(){
    this.alert = false;
  }
}
