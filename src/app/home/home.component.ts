import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { UsersmanageService } from '../_services/usersmanage.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  currentUser: User;
  currentUserSubscription: Subscription;
  usersData = <any>[];
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UsersmanageService,
    private toastr: ToastrService,
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

  /**
   * GET all system users from Database
   */
  loadUsers() {
    this.userService.getAllUsers()
      .pipe(first())
      .subscribe(
        data => {
          this.usersData = data;
          this.dtTrigger.next();
        },
        error => {
          let errorMessage = (error && error.error) ? error.error : 'Sorry! something went wrong.'
          this.toastr.error(errorMessage);
        });
    
  }
}
