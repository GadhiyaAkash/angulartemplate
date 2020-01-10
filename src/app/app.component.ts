import { Component, HostListener } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  faShoppingBasket = faShoppingCart;

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
