import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  
  isSticky: boolean = false;

  @HostListener('window:scroll')
  checkScroll() {
    this.isSticky = window.pageYOffset >= 64;
  }



  showCommercial:boolean = true;
  showHousehold:boolean = false;

  toggleCommercial(){
    this.showHousehold=false;
    this.showCommercial=true;
  }
  toggleHousehold(){
    this.showCommercial=false;
    this.showHousehold=true;
  }

}
