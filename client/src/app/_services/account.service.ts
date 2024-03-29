import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../_models/user';
import jwt_decode from "jwt-decode";
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private presence: PresenceService) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model)
    .pipe(map((response: User) => {
      const user = response;
      if (user) {
        this.setCurrentUser(user);
        this.presence.createHubConnection(user);
      }
    }));
  }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token);
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    console.log(user.roles)
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.presence.stopHubConnection();
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user)
        this.setCurrentUser(user);
        this.presence.createHubConnection(user);

      })
    )
  }

  getDecodedToken(token) {
    var roles = jwt_decode(token)['role']
    console.log(roles, typeof(roles))
    return roles;

  }
}
