import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customerui',
  templateUrl: './customerui.component.html',
  styleUrls: ['./customerui.component.css']
})
export class CustomeruiComponent implements OnInit {

  panelOpenState = false;
  constructor() { }

  ngOnInit(): void {
  }

}
