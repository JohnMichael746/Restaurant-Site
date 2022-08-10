import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';

import { Resto } from '../resto';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class RestoService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/restaurants';
  rootUrl = 'http://localhost:3000/';
  private user:User =  <User>{};
  private _userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(this.user ?? null);

  public getUser(): Observable<User>{
    return this._userSubject.asObservable();
  }


  getList(){
    console.log("test test");
    return this.http.get(this.url);
  }

  saveResto(data: Resto){
    console.log(data);
    return this.http.post(this.url,data);
  }

  deleteResto(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }

  getCurrentResto(id:number){
    return this.http.get(`${this.url}/${id}`);
  }

  updateResto(id:number, data:Resto){
    return this.http.put(`${this.url}/${id}`, data);
  }

  registerUser(data:User){
    return this.http.post(this.rootUrl + "users", data);
  }

  getAllUsers(){
    return this.http.get(this.rootUrl + "users");
  }

  login(email:string, password:string){
    var found: boolean = false;
     this.getAllUsers().subscribe((results =>{
      const stringJson = JSON.stringify(results);
      console.log("String json object :", stringJson);
      const allUsers: Array<User> = JSON.parse(stringJson);
      console.log(allUsers);
      const isFound = allUsers.find(element => (element.email == email && element.password == password));
      console.log("isFound =" + isFound);
      if (isFound != undefined){
        this.user = isFound
      }else{
        this.user =  <User>{};
      }
      this._userSubject.next(this.user)

    }))

  }
}
