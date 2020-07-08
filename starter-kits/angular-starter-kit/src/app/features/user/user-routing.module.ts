import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './views/user/user.component';
import { UserService } from './services/user.service';


const routes: Routes = [
 
  {
      path: "",
      component: UserComponent,
      resolve  : {
        files: UserService
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
