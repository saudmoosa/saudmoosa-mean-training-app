import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  uri = 'http://localhost:3000/';  //Local URI
  //uri = 'http://localhost:8080/';  //Local Prod
  //uri = '';  //Prod/Heroku  URI 

  authToken: any;

  constructor(private http: Http) {}

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getIssues() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.uri}users/issues`, {headers: headers})
    .pipe(map(res => res.json()));
  };

  getIssueById(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.uri}users/issues/${id}`, {headers: headers})
    .pipe(map(res => res.json()));
  };

  addIssue(title, responsible, description, severity) {
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity
    };
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.uri}users/issues/add`, issue, {headers: headers});
  };

  updateIssue(id, title, responsible, description, severity, status) {
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity,
      status: status
    };
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.uri}users/issues/update/${id}`, issue, {headers: headers});
  };

  deleteIssue(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.uri}users/issues/delete/${id}`, {headers: headers});
  };

}
