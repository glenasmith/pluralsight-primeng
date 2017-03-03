import {Component, OnInit} from '@angular/core';

declare var jQuery: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // https://github.com/chartjs/Chart.js/issues/815
  private DEFAULT_COLORS = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
    '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
    '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
    '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC']

  private configureDefaultColours(data: number[]): string[] {
    let customColours = []
    if (data.length) {
      data.forEach((element, idx) => {
        customColours.push(this.DEFAULT_COLORS[idx % this.DEFAULT_COLORS.length])
      })
    }

    return customColours;
  }

  private chartData = [300, 50, 100, 70, 500,
    300, 50, 100, 70, 500,
    300, 50, 100, 70, 500,
    300, 50, 100, 70, 500,
    300, 50, 100, 70, 500
  ];

  private chartData2 = this.chartData.map((data) => data * Math.random());

  private hoursByTeamChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: this.DEFAULT_COLORS[0],
        borderColor: this.DEFAULT_COLORS[0],
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: 'My Second dataset',
        backgroundColor: this.DEFAULT_COLORS[1],
        borderColor: this.DEFAULT_COLORS[1],
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ]
  }

  private hoursByTeamChartMixedData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        type: 'bar',
        label: 'My Bar dataset',
        backgroundColor: this.DEFAULT_COLORS[3],
        borderColor: this.DEFAULT_COLORS[3],
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        type: 'line',
        label: 'My Line dataset',
        backgroundColor: this.DEFAULT_COLORS[4],
        borderColor: this.DEFAULT_COLORS[4],
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ]
  }

  private hoursByProjectChartData = {
    labels: ['Payroll', 'Timesheets', 'Point of Sale'],
    datasets: [
      {
        data: [8, 12, 16 ],
        backgroundColor: [
          "red",
          "blue",
          "yellow"
        ],

      }
    ]
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

  constructor() {
  }

  ngOnInit() {
  }

  onDataSelect(event) {
    console.log(event);
    console.log(`Looks like your after element ${event.element._index} of series ${event.element._datasetIndex}`)
    //event.dataset = Selected dataset
    //event.element = Selected element
    //event.element._datasetIndex = Which dataset series was clicked on - ie. which array was clicked (0 indexed)
    //event.element_index = Which element within that array was clicked (0 indexed)
  }

  title = 'jQuery works!';

  items = [
    {
      label: 'Toggle', icon: 'fa-refresh', command: () => {
      this.onToggle();
    }
    },
    {
      label: 'Toggle Again', icon: 'fa-close', command: () => {
      this.onToggle();
    }
    },
    {label: 'Angular.io', icon: 'fa-link', url: 'http://angular.io'},
    /*
     {label: 'Theming', icon: 'fa-paint-brush', routerLink: ['/theming']}
     */
  ]

  onToggle() {
    jQuery('.ui.sidebar').sidebar('setting', 'transition', 'push').sidebar('toggle');
  }

}
