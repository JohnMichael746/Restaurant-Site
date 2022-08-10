import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRestoComponent} from './component//add-resto/add-resto.component'
import { ListRestoComponent} from './component/list-resto/list-resto.component'
import { UpdateRestoComponent} from './component/update-resto/update-resto.component'
import { LoginComponent} from './component/login/login.component'
import { RegisterComponent} from './component/register/register.component'




const routes: Routes = [
  
    {
      component: AddRestoComponent,
      path: 'add'
    },
    {
      component: UpdateRestoComponent,
      path: 'update/:id'
    },
    {
      component: LoginComponent,
      path: 'login'
    },
    {
      component: RegisterComponent,
      path: 'register'
    },
    {
      component: ListRestoComponent,
      path: ''
    }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
