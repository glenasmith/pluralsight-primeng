import {Component, OnInit, ViewChild, AfterViewInit, ElementRef} from '@angular/core';
import {Project} from "../project";
import { DataService } from "../data.service";
import {Observable} from "rxjs";
import { UIChart } from 'primeng/primeng';

// const DEFAULT_COLORS = [
//     '#6C76AF', '#EFA64C', '#00ACAC', '#2F8EE5',
//     '#F15B2A', '#A62E5C', '#2A9FBC', '#9BC850', '#404040', '#675BA7'
// ]

// https://github.com/chartjs/Chart.js/issues/815

 const DEFAULT_COLORS = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
 '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
 '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
 '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC']




@Component({
  selector: 'at-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild("mixedChart") mixedChart : UIChart;

  private configureDefaultColours(data: number[]): string[] {
    let customColours = []
    if (data.length) {

      customColours = data.map((element, idx) => {
        return DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
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
        'May': 67,
        'Jun': 73,
      }
    },
    {
      name: 'Ops Team',
      monthlyHours: {
        'Jan': 44,
        'Feb': 63,
        'Mar': 57,
        'Apr': 90,
        'May': 77,
        'Jun': 70,
      },
      }, {
      name: 'Management Team',
      monthlyHours: {
         'Jan': 8,
        'Feb': 12,
        'Mar': 31,
        'Apr': 20,
        'May': 16,
        'Jun': 11,
      }
    }


  ]


  // private hoursByTeamChartData = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  //   datasets: [
  //     {
  //       label: 'Dev Team',
  //       backgroundColor: DEFAULT_COLORS[0],
  //       data: [65, 59, 80, 55, 67, 73]
  //     },
  //     {
  //       label: 'Ops Team',
  //       backgroundColor: DEFAULT_COLORS[1],
  //       data: [44, 63, 57, 90, 77, 70]
  //     }
  //   ]
  // }

  private onMixedClick(event) {


    let labelClicked = this.hoursByTeamChartMixedData.datasets[event.element._datasetIndex].label;
    let valueClicked = this.hoursByTeamChartMixedData.datasets[event.element._datasetIndex].data[event.element._index];

    alert(`Looks like ${labelClicked} worked ${valueClicked} hours`);

    //event.dataset = Selected dataset
    //event.element = Selected element
    //event.element._datasetIndex = Which dataset series was clicked on - ie. which array was clicked (0 indexed)
    //event.element._index = Which element within that array was clicked (0 indexed)
  }

  private tranformHoursByTeamDataIntoChartData(hoursByTeamData) {

    let labels = Object.keys(hoursByTeamData[0].monthlyHours);
    let dataSets = hoursByTeamData.map( (nextTeam, idx) => {
        return {
          label: nextTeam.name,
          fill: false,
          backgroundColor: DEFAULT_COLORS[idx % DEFAULT_COLORS.length],
          data: Object.keys(nextTeam.monthlyHours).map(key => nextTeam.monthlyHours[key])
        }
    });

    return {
      labels: labels,
      datasets: dataSets
    }


  }

  private hoursByTeamChartData = this.tranformHoursByTeamDataIntoChartData(this.hoursByTeam);

  private hoursByTeamChartMixedData : any;
  // {
  //
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //   datasets: [
  //     {
  //       type: 'bar',
  //       label: 'My Bar dataset',
  //       backgroundColor: DEFAULT_COLORS[2],
  //       borderColor: DEFAULT_COLORS[2],
  //       data: [65, 59, 80, 81, 56, 55, 40]
  //     },
  //     {
  //       type: 'line',
  //       label: 'My Line dataset',
  //       backgroundColor: DEFAULT_COLORS[3],
  //       borderColor: DEFAULT_COLORS[3],
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
        backgroundColor: this.pieColors,
      }
    ]
  };

  private chartOptions = {
    title: {
      display: false,
      text: 'Hours By Team'
    },
    legend: {
      position: 'left'
    },
    responsive: true,


  }

  constructor() {

    let mixedData = this.tranformHoursByTeamDataIntoChartData(this.hoursByTeam);

    mixedData.datasets[0].type = 'bar';
    mixedData.datasets[1].type = 'line';
    mixedData.datasets[2].type = 'line';
    mixedData.datasets[2].fill = true;

    this.hoursByTeamChartMixedData = mixedData;
    console.log(mixedData);


  }

  ngOnInit() {}

  ngAfterViewInit() {

      Observable.interval(3000).timeInterval().subscribe(() => {

          var hoursByTeam = this.hoursByTeamChartMixedData.datasets;
          var randomised = hoursByTeam.map( (dataset) => {

            dataset.data = dataset.data.map( (hours) => hours * (Math.random() * 2) );

          });
          this.mixedChart.refresh();
      });


  }

  onDataSelect(event) {
    console.log(event);
    console.log(`Looks like you clicked ${event.element._index} of series ${event.element._datasetIndex}`)
    //event.dataset = Selected dataset
    //event.element = Selected element
    //event.element._datasetIndex = Which dataset series was clicked on - ie. which array was clicked (0 indexed)
    //event.element_index = Which element within that array was clicked (0 indexed)
  }


}
