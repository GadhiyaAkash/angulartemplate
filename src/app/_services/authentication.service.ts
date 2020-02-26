import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /**
   * APIS URL
   */
  configUrl = 'https://int.api.opcentral.com.au/login';

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * login successful if there's a jwt token in the response
   * store user details and jwt token 
   * in local storage to keep user logged in between page refreshes
   * @param param 
   */
  login(param) {
    return this.http.post<any>(this.configUrl, param)
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  /**
   * remove user from local storage to log user out
   */
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  /**
   * return current login entity
   */
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
}
