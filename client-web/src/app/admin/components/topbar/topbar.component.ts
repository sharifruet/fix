import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  @Output() toggleNav:EventEmitter<any> = new EventEmitter();
  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  slideNav(){
    this.toggleNav.emit();
  }

  signout(): void{
    this.authService.logout();
    this.router.navigate(['admin/login']);
  }

}
