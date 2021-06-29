import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog'
import { FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators'
import { ElementsPopupComponent } from '../elements-popup/elements-popup.component'

export interface User {
  name: string;
}

// demo order table data
const ELEMENT_DATA = [
  {sn: 1, title: 'Service1', price: 500, quantity: 1, subtotal: 500},
  {sn: 2, title: 'Service2', price: 800, quantity: 2, subtotal: 1600},
  {sn: 3, title: 'Service3', price: 600, quantity: 2, subtotal: 600},
  {sn: 4, title: 'Service4', price: 900, quantity: 3, subtotal: 900}
];


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public form:FormGroup;
  profile : boolean = true;
  editProfile : boolean;
  userDetails;

  // demo order table data
  displayedColumns: string[] = ['sn', 'title', 'price', 'quantity', 'subtotal'];
  dataSource = ELEMENT_DATA;


  constructor( private dialog:MatDialog, private _snackBar: MatSnackBar, private fb:FormBuilder, private route:ActivatedRoute, private userService:UserService) { }


  openEditProfile() {
    this.editProfile = true;
    this.profile = false;
  }
  openProfile(){
    this.editProfile = false;
    this.profile = true;
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.getUserDetail(id);
    })
  }

  getUserDetail(id){
    console.log(id);
    this.userService.get(id).subscribe(
      result => {
        this.userDetails = result.data;
        this.form = this.fb.group({
          name: [this.userDetails['name'], Validators.required],
          phone: [this.userDetails['phone'], Validators.pattern('[0-9]{11}')],
          email: [this.userDetails['email'], Validators.email],
          dob: [new Date(this.userDetails['dob'])],
          gender: [this.userDetails['gender'], Validators.required],
        })
      },
      error => {
        console.log(error);
      }
    )
  }

  updateProfile(){
    const data = {
      name : this.form.get('name').value,
      phone : this.form.get('phone').value,
      email : this.form.get('email').value,
      dob : this.form.get('dob').value,
      gender : this.form.get('gender').value
    }
    this.userService.update(this.userDetails.id, data)
    .subscribe(
      result => {
        console.log(result);
        this.getUserDetail(this.userDetails.id);
        this.openSnackBar('Profile updated successfully');
      },
      error => {
        console.log(error);
      }
    )

  }
  
  openElements(){
    const dialogRef = this.dialog.open(ElementsPopupComponent, {
      width:'800px',
      disableClose: false
    });
  }


  

}
