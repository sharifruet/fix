import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators'

export interface User {
  name: string;
}


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

  filteredOptions: Observable<any[]>;
  myControl = new FormControl;

  options: string[] = ['One', 'Two', 'Three'];


  constructor( private _snackBar: MatSnackBar, private fb:FormBuilder, private route:ActivatedRoute, private userService:UserService) { }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

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

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
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

}
