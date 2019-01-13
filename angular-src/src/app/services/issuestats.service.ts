import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import uri_port from './../uri_port';

@Injectable({
  providedIn: 'root'
})
export class IssuestatsService {

  uri = uri_port;

  authToken: any;

  constructor(private http: Http) {}

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // Get the count of all issues logged
  getAllIssuesCount() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.uri}users/issues-count`, {headers: headers})
    .pipe(map(res => res.json()));
  };

  // Get the count of all issues grouped by Severity
  getIssuesSeverityCount() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.uri}users/issues-severity-count`, {headers: headers})
    .pipe(map(res => res.json()));
  };

  // Get the count of all issues grouped by Status
  getIssuesStatusCount() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.uri}users/issues-status-count`, {headers: headers})
    .pipe(map(res => res.json()));
  };


}