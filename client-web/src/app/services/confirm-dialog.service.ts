import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
 
@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(private dialog:MatDialog) { }

  openConfirmDialog(msg){
    return this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      disableClose:true,
      data:{
        message:msg
      }
    });
  }
}
