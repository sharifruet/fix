import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  @Output() toggleNav:EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  slideNav(){
    this.toggleNav.emit();
  }

}
