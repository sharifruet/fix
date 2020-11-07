import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profile : boolean = true;
  editProfile : boolean;

  constructor() { }

  openEditProfile() {

    this.editProfile = true;
    this.profile = false;

  }
  openProfile(){
    this.editProfile = false;
    this.profile = true;
  }

  ngOnInit(): void {
  }

}
