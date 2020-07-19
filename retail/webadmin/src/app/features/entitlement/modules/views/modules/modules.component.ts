import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModulesFormComponent } from '../../components/modules-form/modules-form.component';
import { Modules } from '../../../models/modules.model';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class ModulesComponent implements OnInit {

  dialogRef: any;
    constructor(public _matDialog: MatDialog) {}

    ngOnInit(): void {}

    onCreateDialog(): void {
        this.dialogRef = this._matDialog.open(ModulesFormComponent, {
            data: new Modules(),
            panelClass: "app-modules-form",
        });
    }

}
