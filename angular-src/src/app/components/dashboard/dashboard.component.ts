import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Issue } from '../../issue.model';
import { IssuestatsService } from '../../services/issuestats.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  allCount: Number;
  severityKey: String[] = [];
  severityValue: any[] = [];
  statusKey: String[] = [];
  statusValue: any[] = [];


  constructor(private issuestatsService: IssuestatsService, private router: Router) { }

  ngOnInit() {
    this.fetchAllIssuesCount();
    this.fetchIssuesCountBySeverity();   
    this.fetchIssuesCountByStatus(); 
  }

  fetchAllIssuesCount() {
    this.issuestatsService
      .getAllIssuesCount()
      .subscribe((data) => {
        this.allCount = data[0].total;
        //console.log(this.allCount);      
      });     
  };

  fetchIssuesCountBySeverity() {
    this.issuestatsService
      .getIssuesSeverityCount()
      .subscribe((data) => {
        for (var val in data) { 
          this.severityKey.push(data[val].severity);
          this.severityValue.push(data[val].total);
        }
        this.labels_bar = this.severityKey;
        this.chartData_bar[0].data = this.severityValue;
      });     
  };

  fetchIssuesCountByStatus() {
    this.issuestatsService
      .getIssuesStatusCount()
      .subscribe((data) => {
        for (var val in data) { 
          this.statusKey.push(data[val].status);
          this.statusValue.push(data[val].total);
        }
        this.labels_pie = this.statusKey;
        this.chartData_pie[0].data = this.statusValue;
      });     
  };

  ////////////////////////// Bar Chart for Issues grouped by Severity
    title_bar = 'Issues logged grouped by Severity';

    // ADD CHART OPTIONS. 
    chartOptions_bar = {
    responsive: true,    // TRUE WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
      scales: {             //Start chart from 0 on Y axis
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
      }
    }

  labels_bar =  [];


  // STATIC DATA FOR THE CHART IN JSON FORMAT.
  chartData_bar = [
    {
      label: 'Defect Count',
      data: []
    }
  ];

  // CHART COLOR.
  colors_bar = [
    { 
      backgroundColor: ["#FF6384","#FFCE56","#4BC0C0"]
    }
  ] 
  
  // CHART CLICK EVENT.
  onChartClick_bar(event) {
    //console.log(event);
  }


  ////////////////////////// Pie Chart for Issues grouped by Status
  title_pie = 'Issues logged grouped by Status';

   // ADD CHART OPTIONS. 
   chartOptions = {
    responsive: true    // TRUE WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
  }

  labels_pie = [];

  // STATIC DATA FOR THE CHART IN JSON FORMAT.
  chartData_pie = [
    {
      label: 'Defect Count',
      data: []
    }
  ];

  // CHART COLOR.
  colors_pie = [
    { 
      backgroundColor: ["#4BC0C0","#FFCE56","#FF6384"]
    }
  ]
  
  // CHART CLICK EVENT.
  onChartClick_pie(event) {
    //console.log(event);
  }

}

