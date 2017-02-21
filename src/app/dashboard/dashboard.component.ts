import { Component, OnInit } from '@angular/core';

declare var jQuery: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private hoursByProjectChartData = {
    labels: ['One','Two','Three'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
          "red",
          "blue",
          "yellow"
        ],

      }],
  };

  private chartOptions = {
    title: {
      display: true,
      text: 'Custom Chart Title'
    },
    legend: {
      position: 'left'
    },
      responsive: true
  }

  constructor() { }

  ngOnInit() {
  }

  title = 'jQuery works!';

  items = [
    {label: 'Toggle', icon: 'fa-refresh', command: () => {
      this.onToggle();
    }},
    {label: 'Toggle Again', icon: 'fa-close', command: () => {
      this.onToggle();
    }},
    {label: 'Angular.io', icon: 'fa-link', url: 'http://angular.io'},
    /*
     {label: 'Theming', icon: 'fa-paint-brush', routerLink: ['/theming']}
     */
  ]

  onToggle() {
    jQuery('.ui.sidebar').sidebar('setting', 'transition', 'push').sidebar('toggle');
  }

}
