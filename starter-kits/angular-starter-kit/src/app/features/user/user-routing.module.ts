import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './views/user/user.component';
import { FileManagerService } from './file-manager.service';


const routes: Routes = [
 
  {
      path: "",
      component: UserComponent,
      resolve  : {
        files: FileManagerService
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
