import { Component, HostListener } from '@angular/core';
import { faShoppingCart, faCreditCard, faLock, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  faShoppingBasket = faShoppingCart;
  faCreditCard = faCreditCard;
  faLock = faLock;
  faArrowAltCircleUp = faArrowAltCircleUp

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

  scrollToTop() {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
  }, 16);
  }
}
