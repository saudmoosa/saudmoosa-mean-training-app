import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Issue } from '../../issue.model';
import { IssueService } from '../../services/issue.service';
import {MatSort, MatTableDataSource} from '@angular/material';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { stringify } from 'querystring';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues: Issue[];
  displayedColumns = ['title', 'responsible', 'severity', 'status', 'actions'];
  dataSource: any;


  constructor(private issueService: IssueService, private router: Router) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.fetchIssues();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  fetchIssues() {
    this.issueService
      .getIssues()
      .subscribe((data: Issue[]) => {
        this.issues = data;
        this.dataSource = new MatTableDataSource(this.issues);
        this.dataSource.sort = this.sort;
      });  
  };

  editIssue(id) {
    this.router.navigate([`/edit/${id}`]);
  };

  deleteIssue(id) {
    this.issueService.deleteIssue(id).subscribe(() => {
      this.fetchIssues();
    });
  };

}
