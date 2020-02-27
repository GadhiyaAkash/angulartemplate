import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersmanageService {

  apiUrl = 'https://int.api.opcentral.com.au/';

  constructor(private http: HttpClient) {
    
  }

  /**
   * Get all users
   * Active/Inactive
   */
  getAllUsers() {
    return this.http.get(this.apiUrl + 'users');
  }
}
