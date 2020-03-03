import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import {AuthenticationService} from '../_services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: User;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    console.log("this.currentUser::", this.currentUser.user);
  }

}
