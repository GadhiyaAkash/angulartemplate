import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events

  onScroll(event) {
    // console.log("event::", window.pageYOffset);
    // let element = document.getElementById('navbar');
    // if (window.pageYOffset >= 50) {
    //   element.classList.add('sticky');
    // } else {
    //   element.classList.remove('sticky');
    // }
  }

}
