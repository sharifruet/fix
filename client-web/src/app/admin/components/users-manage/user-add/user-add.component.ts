import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  user = {
    name: '',
	username:'',
	password:'',
    email: '',
	phone: '',
	address:'',
	district:'',
	upazila:'',
    status: ''
  };

  constructor(private service: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  save(): void {
    console.log(this.service);
    const data = {
      name: this.user.name,
	  username: this.user.username,
	  password: this.user.password,
      email: this.user.email,
	  phone: this.user.phone,
	  address: this.user.address,
	  district: this.user.district,
	  upazila: this.user.upazila,
	  status: this.user.status
    };

    this.service.create(data)
      .subscribe(
        response => {
			console.log("1");
          console.log(response);
          this.openSnackBar('The service added successfully!');
          this.newService();
        },
        error => {
				console.log("2");
          console.log(error);
      });
  }

  newService(): void {
    this.user = {
      name: '',
	  username:'',
	  password:'',
      email: '',
	  phone:'',
	  address:'',
	  district:'',
	  upazila:'',
      status: ''
    }
  }

}
