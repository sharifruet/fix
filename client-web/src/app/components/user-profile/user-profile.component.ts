import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profile : boolean = true;
  editProfile : boolean;

  constructor(private route:ActivatedRoute, private userService:UserService) { }

  openEditProfile() {
    this.editProfile = true;
    this.profile = false;
  }
  openProfile(){
    this.editProfile = false;
    this.profile = true;
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
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

}
