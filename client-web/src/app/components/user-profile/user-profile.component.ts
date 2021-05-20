import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor( private _snackBar: MatSnackBar, private fb:FormBuilder, private route:ActivatedRoute, private userService:UserService) { }

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

}
