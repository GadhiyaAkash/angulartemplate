import { Component, OnInit } from '@angular/core';
import { faShoppingCart, faCreditCard, faLock, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  faShoppingBasket = faShoppingCart;
  faCreditCard = faCreditCard;
  faLock = faLock;
  faArrowAltCircleUp = faArrowAltCircleUp

  constructor() { }

  ngOnInit() {
  }

}
