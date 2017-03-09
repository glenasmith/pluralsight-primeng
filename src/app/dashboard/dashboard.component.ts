import {Component, OnInit} from '@angular/core';
import {Project} from "../project";

declare var jQuery: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // https://github.com/chartjs/Chart.js/issues/815
  /*
   private DEFAULT_COLORS = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
   '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
   '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
   '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC']
   */

  private DEFAULT_COLORS = [
    '#6C76AF', '#EFA64C', '#00ACAC', '#2F8EE5',
    '#F15B2A', '#A62E5C', '#2A9FBC', '#9BC850', '#404040', '#675BA7'
  ]

  private configureDefaultColours(data: number[]): string[] {
    let customColours = []
    if (data.length) {

      customColours = data.map((element, idx) => {
        return this.DEFAULT_COLORS[idx % this.DEFAULT_COLORS.length];
      });
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

  private hoursByTeam = [

    {
      name: 'Dev Team',
      monthlyHours: {
        'Jan': 65,
        'Feb': 59,
        'Mar': 80,
        'Apr': 55,
        'Jun': 67,
        'Jul': 73,
        'Aug': 66,
        'Sep': 55,
        'Oct': 44,
        'Nov': 33,
        'Dec': 66
      }
    },
    {
      name: 'Ops Team',
      monthlyHours: {
        'Jan': 44,
        'Feb': 63,
        'Mar': 57,
        'Apr': 90,
        'Jun': 70,
        'Jul': 73,
        'Aug': 76,
        'Sep': 45,
        'Oct': 64,
        'Nov': 73,
        'Dec': 86
      }
    }


  ]


  private hoursByTeamChartData = {
    labels: Object.keys(this.hoursByTeam[0].monthlyHours),
    datasets: [
      {
        label: this.hoursByTeam[0].name,
        backgroundColor: this.DEFAULT_COLORS[0],
        borderColor: this.DEFAULT_COLORS[0],
        data: Object.keys(this.hoursByTeam[0].monthlyHours).map(key => this.hoursByTeam[0].monthlyHours[key])
      },
      {
        label: this.hoursByTeam[1].name,
        backgroundColor: this.DEFAULT_COLORS[1],
        borderColor: this.DEFAULT_COLORS[1],
        data: Object.keys(this.hoursByTeam[1].monthlyHours).map(key => this.hoursByTeam[1].monthlyHours[key])
      }
    ]
  }

  private hoursByTeamChartMixedData = {};
  // {
  //
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //   datasets: [
  //     {
  //       type: 'bar',
  //       label: 'My Bar dataset',
  //       backgroundColor: this.DEFAULT_COLORS[2],
  //       borderColor: this.DEFAULT_COLORS[2],
  //       data: [65, 59, 80, 81, 56, 55, 40]
  //     },
  //     {
  //       type: 'line',
  //       label: 'My Line dataset',
  //       backgroundColor: this.DEFAULT_COLORS[3],
  //       borderColor: this.DEFAULT_COLORS[3],
  //       data: [28, 48, 40, 19, 86, 27, 90]
  //     }
  //   ]
  // }

  private hoursByProject = [
    {id: 1, name: 'Payroll App', hoursSpent: 8},
    {id: 2, name: 'Agile Times App', hoursSpent: 16},
    {id: 3, name: 'Point of Sale App', hoursSpent: 24},
  ]

  private pieData = this.hoursByProject.map((proj) => proj.hoursSpent);
  private pieLabels = this.hoursByProject.map((proj) => proj.name);
  private pieColors = this.configureDefaultColours(this.pieData);

  private hoursByProjectChartData = {
    labels: this.pieLabels,
    datasets: [
      {
        data: this.pieData,
        backgroundColor: this.pieColors
        //   [
        //   "red",
        //   "blue",
        //   "yellow"
        // ],

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
    let mixedData : any = Object.assign( {}, this.hoursByTeamChartData);
    mixedData.datasets[0].type = 'bar';
    mixedData.datasets[1].type = 'line';
    this.hoursByTeamChartMixedData = mixedData;
  }

  onDataSelect(event) {
    console.log(event);
    console.log(`Looks like your after element ${event.element._index} of series ${event.element._datasetIndex}`)
    //event.dataset = Selected dataset
    //event.element = Selected element
    //event.element._datasetIndex = Which dataset series was clicked on - ie. which array was clicked (0 indexed)
    //event.element_index = Which element within that array was clicked (0 indexed)
  }


}
