import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  //uri = 'http://localhost:3000/';  //Local URI
  //uri = 'http://localhost:8080/';  //Local Prod
  uri = '';  //Prod/Heroku  URI 

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //return this.http.post('http://localhost:3000/users/register', user, {headers: headers})   //For Local
    return this.http.post(`${this.uri}users/register`, user, {headers: headers})
      //.map(res => res.json());
      .pipe(map(res => res.json()));
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.uri}users/authenticate`, user, {headers: headers})
      //.map(res => res.json());
      .pipe(map(res => res.json()));
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.uri}users/profile`, {headers: headers})
      //.map(res => res.json());
      .pipe(map(res => res.json()));
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    if (localStorage.id_token == undefined ){
      return false;
     } else {
       const helper = new JwtHelperService();
       return !helper.isTokenExpired(localStorage.id_token);
    }
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
