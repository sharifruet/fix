import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../../services/role.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.css']
})
export class RoleAddComponent implements OnInit {

  role = {
    name: '',
    description: '',
    status: 0
  };

  constructor(private service: RoleService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  save(): void {
    const data = {
      title: this.role.name,
      description: this.role.description
    };

    this.service.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.openSnackBar('The service added successfully!');
          this.newService();
        },
        error => {
          console.log(error);
      });
  }

  newService(): void {
    this.role = {
      name: '',
      description: '',
      status: 0
    };
  }

}
